import React, { useContext, useEffect, useState } from "react";
import { MoreHorizontal, UserPlus, Edit2, Trash2, Search } from "react-feather";
import CardAdd from "./CardAdd";
import { BoardContext } from "../context/BoardContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddList from "./AddList";
import axios from "axios";
import { useAuth } from "../context/auth";
import dayjs from "dayjs"; 
import TaskEditForm from "./TaskEditForm";
import ListView from "./ListView";

const Main = () => {
  const { allboard, setAllBoard } = useContext(BoardContext);
  const [lists, setLists] = useState([]);
  const { user } = useAuth();

  // Extracting current board data
  const bdata = allboard?.boards[allboard.active];
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const toggleSearch = () => {
    setIsSearching(!isSearching);
  };

  const showEditForm = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
  };

  const closeEditForm = () => {
    setIsEditing(false);
    setCurrentTask(null);
  };
  useEffect(() => {
    const fetchLists = async () => {
      if (!bdata?.lists) {
        setLists([]);
        return;
      }
      try {
        const fetchedLists = await Promise.all(
          bdata.lists.map((list) =>
            axios
              .get(`http://127.0.0.1:5000/api/lists/${list._id}`, {
                headers: { Authorization: user.token },
              })
              .then((response) => response.data)
          )
        );

        setLists(fetchedLists);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchLists();
  }, [bdata, user.token]);

  const onDragEnd = async (result) => {
    const { source, destination } = result;
  
    if (!destination) return;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceList = lists.find(list => list._id === source.droppableId);
      const destList = lists.find(list => list._id === destination.droppableId);
      const task = sourceList.tasks[source.index];
  
      // Perform the local changes first (optimistic update)
      const newSourceTasks = Array.from(sourceList.tasks);
      newSourceTasks.splice(source.index, 1);
      const newDestTasks = Array.from(destList.tasks);
      newDestTasks.splice(destination.index, 0, task);
  
      const newLists = lists.map(list => {
        if (list._id === source.droppableId) {
          return { ...list, tasks: newSourceTasks };
        } else if (list._id === destination.droppableId) {
          return { ...list, tasks: newDestTasks };
        } else {
          return list;
        }
      });
  
      setLists(newLists);
  
      // Make API call to update on the server
      try {
        await axios.post(`http://127.0.0.1:5000/api/lists/updateTaskList`, {
          taskId: task._id,
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          newIndex: destination.index
        }, {
          headers: { Authorization: user.token }
        });
      } catch (error) {
        console.error("Error moving task:", error);
      }
    }
  };
  

  const addCardToList = (newCard, listIndex) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].tasks = [...updatedLists[listIndex].tasks, newCard];
    setLists(updatedLists);
  };

  const addNewList = async (listName) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/lists",
        {
          name: listName,
          board: allboard.boards[allboard.active]._id,
        },
        {
          headers: { Authorization: user.token },
        }
      );
      setLists((prevLists) => [...prevLists, response.data]);
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  const deleteList = async (listId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/lists/${listId}`, {
        headers: { Authorization: user.token },
      });
      setLists((lists) => lists.filter((list) => list._id !== listId));
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  const updateTask = async (listId, taskId, updatedTask) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/api/tasks/${taskId}`,
        updatedTask,
        {
          headers: { Authorization: user.token },
        }
      );
      const newList = lists.map((list) => {
        if (list._id === listId) {
          return {
            ...list,
            tasks: list.tasks.map((task) =>
              task._id === taskId ? response.data : task
            ),
          };
        }
        return list;
      });
      setLists(newList);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (listId, taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/tasks/${taskId}`, {
        headers: { Authorization: user.token },
      });
      const newList = lists.map((list) => {
        if (list._id === listId) {
          return {
            ...list,
            tasks: list.tasks.filter((task) => task._id !== taskId),
          };
        }
        return list;
      });
      setLists(newList);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div
      className="flex flex-col w-full"
      style={{ backgroundColor: bdata?.color }}
    >
      <div className="p-3 bg-black flex justify-between w-full bg-opacity-50">
        <h2 className="text-lg">{bdata?.name}</h2>
        <div className="flex items-center justify-center">
          <button className="bg-gray-200 h-8 text-gray-800 px-2 py-1 mr-2 rounded flex justify-center items-center" onClick={toggleSearch}>
            <Search size={16} className="mr-2"></Search> Search
          </button>
          <button className="bg-gray-200 h-8 text-gray-800 px-2 py-1 mr-2 rounded flex justify-center items-center">
            <UserPlus size={16} className="mr-2"></UserPlus> Share
          </button>
          <button className="hover:bg-gray-500 px-2 py-1 h-8 rounded">
            <MoreHorizontal size={16}></MoreHorizontal>
          </button>
        </div>
      </div>
      { isSearching ? (
        <ListView user={user} />
      ) :
      <div className="flex flex-col w-full flex-grow relative">
        <div className="absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-scroll">
          <DragDropContext onDragEnd={onDragEnd}>
            {lists.map((list, index) => (
              <Droppable key={list._id} droppableId={list._id.toString()}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0"
                  >
                    <div className="flex justify-between p-1">
                      <span>{list.name}</span>
                      <div>
                        <button
                          onClick={() => deleteList(list._id)}
                          className="hover:bg-gray-500 p-1 rounded-sm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    {list.tasks && (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="overflow-y-auto max-h-100">
                        {list.tasks.map((task, idx) => (
                          <Draggable
                            key={task._id}
                            draggableId={task._id.toString()}
                            index={idx}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="item flex flex-col justify-between items-center bg-zinc-700 p-1 cursor-pointer rounded-md border-2 border-zinc-900 hover:border-gray-500"
                              >
                                <div className="w-full text-white">
                                  <p className="font-bold">{task.title}</p>
                                  <p className="text-base font-light">{task.description.length > 100 ? task.description.substring(0,100) + '...' : task.description || "No description"}</p>
                                </div>
                                <div className="w-full text-sm">
                                  {task.due_date
                                    ? dayjs(task.due_date).format("DD/MM/YYYY")
                                    : "No due date"}
                                </div>
                                <div className="flex space-x-2 justify-end items-center">
                                  <button
                                    onClick={() => showEditForm(task)}
                                    className="hover:bg-gray-600 p-1 rounded-sm"
                                  >
                                    <Edit2 size={16}></Edit2>
                                  </button>
                                  <button
                                    onClick={() =>
                                      deleteTask(list._id, task._id)
                                    }
                                    className="hover:bg-red-500 p-1 rounded-sm"
                                  >
                                    <Trash2 size={16}></Trash2>
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                    {isEditing && (
                      
                      <TaskEditForm
                        task={currentTask}
                        updateTask={(updatedTask) =>
                          updateTask(list._id, currentTask._id, updatedTask)
                        }
                        closeForm={closeEditForm}
                      />
                    )}
                    <CardAdd
                      getcard={(newCard) => addCardToList(newCard, index)}
                      listId={list._id}
                      token={user.token}
                    />
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
          <AddList getlist={addNewList} />
        </div>
      </div>
}
    </div>
  );
};

export default Main;
