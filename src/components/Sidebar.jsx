import React, { useContext, useEffect, useState } from "react";
import { ChevronRight, ChevronLeft, Plus, X } from "react-feather";
import { Popover } from "react-tiny-popover";
import axios from "axios";
import { BoardContext } from "../context/BoardContext";
import { useAuth } from "../context/auth";
import { createBoard, updateBoard, deleteBoard } from "../utils/api";

const Sidebar = () => {
  const blankBoard = {
    title: "",
    color: "#f60000",
    list: [],
  };

  const [boardData, setBoardData] = useState(blankBoard);
  const [collapsed, setCollapsed] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const { allboard, setAllBoard } = useContext(BoardContext);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedTitle, setEditedTitle] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/boards", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setAllBoard({
          boards: response.data,
          active: 0,
        });
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    fetchBoards();
  }, [setAllBoard, user.token]);

  const setActiveBoard = (i) => {
    setAllBoard((prevState) => ({
      ...prevState,
      active: i,
    }));
  };

  const addBoard = async () => {
    try {
      const newBoard = await createBoard(
        boardData,
        user.token,
        user.userData._id
      );
      setAllBoard((prevState) => ({
        ...prevState,
        boards: [...prevState.boards, newBoard.data],
        active: prevState.boards.length,
      }));
      setBoardData(blankBoard);
      setShowPop(false);
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  const editBoardItem = async (index, newTitle) => {
    try {
      const updatedData = { title: newTitle }; // Prepare updated data
      await updateBoard(allboard.boards[index]._id, updatedData, user.token); // Update board
      const updatedBoards = [...allboard.boards];
      updatedBoards[index].title = newTitle; // Update the title in the local state
      setAllBoard(prevState => ({
        ...prevState,
        boards: updatedBoards
      }));
      setEditIndex(-1); // Reset editIndex
    } catch (error) {
      console.error('Error editing board:', error);
    }
  };

  const deleteBoardItem = async (index) => {
    try {
      await deleteBoard(allboard.boards[index]._id, user.token);
      const updatedBoards = allboard.boards.filter((_, i) => i !== index);
      setAllBoard(prevState => ({
        ...prevState,
        boards: updatedBoards
      }));
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  const handleUpdateBoard = (index) => {
    if (editedTitle.trim() !== '') {
      editBoardItem(index, editedTitle);
    } else {
      // Reset editIndex and editedTitle if the title is empty
      setEditIndex(-1);
      setEditedTitle('');
    }
  };

  return (
    <div
      className={`bg-[#121417] h-[calc(100vh-3rem)] border-r border-r-[#9fadbc29] transition-all linear duration-500 flex-shrink-0 ${
        collapsed ? "w-[42px]" : "w-[280px]"
      }`}
    >
      {collapsed ? (
        <div className="p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-slate-600 rounded-sm"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      ) : (
        <div>
          <div className="workspace p-3 flex justify-between border-b border-b-[#9fadbc29]">
            <h6>Workspace</h6>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hover:bg-slate-600 rounded-sm p-1"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
          <div className="boardlist">
            <div className="flex justify-between px-3 py-2">
              <h6>Your Boards</h6>
              <Popover
                isOpen={showPop}
                align="start"
                positions={["right", "top", "bottom", "left"]}
                content={
                  <div className="ml-2 p-2 w-60 flex flex-col justify-center items-center bg-slate-600 text-white rounded">
                    <button
                      onClick={() => setShowPop(false)}
                      className="absolute right-2 top-2 hover:bg-gray-500 p-1 rounded"
                    >
                      <X size={16} />
                    </button>
                    <h4 className="py-3">Create Board</h4>
                    <img
                      src="https://placehold.co/200x120/png"
                      alt="Placeholder"
                    />
                    <div className="mt-3 flex flex-col items-start w-full">
                      <label htmlFor="title">
                        Board Title <span>*</span>
                      </label>
                      <input
                        value={boardData.title}
                        onChange={(e) =>
                          setBoardData({ ...boardData, title: e.target.value })
                        }
                        type="text"
                        className="mb-2 h-8 px-2 w-full bg-gray-700"
                      />
                      <label htmlFor="color">Board Color</label>
                      <input
                        value={boardData.color}
                        onChange={(e) =>
                          setBoardData({ ...boardData, color: e.target.value })
                        }
                        type="color"
                        className="mb-2 h-8 px-2 w-full bg-gray-700"
                      />
                      <button
                        onClick={addBoard}
                        className="w-full rounded h-8 bg-slate-700 mt-2 hover:bg-gray-500"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                }
              >
                <button
                  onClick={() => setShowPop(!showPop)}
                  className="hover:bg-slate-600 p-1 rounded-sm"
                >
                  <Plus size={16} />
                </button>
              </Popover>
            </div>
          </div>
          <ul>
            {allboard.boards &&
              allboard.boards.map((board, index) => (
                <li key={index}>
                  <div className="flex items-center justify-between px-3 py-2">
                    <button
                      onClick={() => setActiveBoard(index)}
                      className={`w-full text-sm flex justify-start align-baseline ${
                        allboard.active === index
                          ? "bg-gray-700"
                          : "hover:bg-gray-500"
                      }`}
                    >
                      <span
                        className="w-6 h-max rounded-sm mr-2"
                        style={{ backgroundColor: board.color }}
                      >
                        &nbsp;
                      </span>
                      {/* Editable Title */}
                      {index === editIndex ? (
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          onBlur={() => handleUpdateBoard(index)}
                          autoFocus
                        />
                      ) : (
                        <span>{board.title}</span>
                      )}
                    </button>
                    <div className="flex items-center">
                      {/* Edit Button */}
                      {index === editIndex ? (
                        <button disabled className="p-1 rounded-sm mr-2">
                          Editing...
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditIndex(index)}
                          className="hover:bg-slate-600 p-1 rounded-sm mr-2"
                        >
                          Edit
                        </button>
                      )}
                      {/* Delete Button */}
                      <button
                        onClick={() => deleteBoardItem(index)}
                        className="hover:bg-slate-600 p-1 rounded-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
