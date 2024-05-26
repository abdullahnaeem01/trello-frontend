import React, { useState } from 'react';
import { X, Plus } from 'react-feather';
import axios from 'axios';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';

const CardAdd = (props) => {
    console.log(props);
  const [card, setCard] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [show, setShow] = useState(false);

  const saveCard = async () => {
    if (!card) {
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/tasks', {
                title: card,
                description: description,
                due_date: dueDate ? dueDate.toISOString() : null,
                list: props.listId,
            },
            {
                headers: {
                  Authorization: props.token,
                },
              }
        );
      const newCard = response.data;
      props.getcard(newCard);
      setCard('');
      setDescription('');
      setDueDate(null);
      setShow(!show);
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  const closeBtn = () => {
    setCard('');
    setDescription('');
    setDueDate(null);
    setShow(!show);
  };

  return (
    <div>
      <div className="flex flex-col">
        {show && (
          <div>
            <textarea
              value={card}
              onChange={(e) => setCard(e.target.value)}
              className="p-1 w-full rounded-md border-2 bg-zinc-700 border-zinc-900"
              placeholder="Enter Card Title..."
            ></textarea>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-1 w-full rounded-md border-2 bg-zinc-700 border-zinc-900 mt-2"
              placeholder="Enter Description..."
            ></textarea>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dueDate}
                onChange={(newValue) => setDueDate(newValue)}
                renderInput={(params) => (
                  <input
                    {...params.inputProps}
                    className="p-1 w-full rounded-md border-2 bg-zinc-700 border-zinc-900 mt-2 text-white"
                    placeholder="Select Due Date"
                  />
                )}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'grey',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                    '& input': {
                      color: 'white',
                    },
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'white',
                  },
                }}
              />
            </LocalizationProvider>
            <div className="flex p-1 mt-2">
              <button onClick={() => saveCard()} className="p-1 rounded bg-sky-600 text-white mr-2">
                Add Card
              </button>
              <button onClick={() => closeBtn()} className="p-1 rounded hover:bg-gray-600">
                <X size={16}></X>
              </button>
            </div>
          </div>
        )}
        {!show && (
          <button
            onClick={() => setShow(!show)}
            className="flex p-1 w-full justify-start rounded items-center mt-1 hover:bg-gray-500 h-8"
          >
            <Plus size={16}></Plus> Add a card
          </button>
        )}
      </div>
    </div>
  );
};

export default CardAdd;
