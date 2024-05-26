import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const TaskEditForm = ({ task, updateTask, closeForm }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [due_date, setdue_date] = useState(task.due_date ? dayjs(task.due_date) : null);

  const handleUpdate = () => {
    updateTask({
      ...task,
      title,
      description,
      due_date: due_date ? due_date.toISOString() : null
    });
    closeForm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="p-2 border rounded mb-2 w-full"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="p-2 border rounded mb-2 w-full"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Due Date"
            value={due_date}
            onChange={setdue_date}
            renderInput={(params) => <input className="p-2 border rounded mb-2 w-full" {...params} />}
          />
        </LocalizationProvider>
        <div className="flex justify-between">
          <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update
          </button>
          <button onClick={closeForm} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskEditForm;
