import axios from 'axios';

export const createBoard = async (data, token) => {
    console.log(data);
    const response = await axios.post('http://localhost:5000/api/boards/',
    {
        title: data.title,
        color: data.color,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  
    return response;
  };

  export const updateBoard = async (boardId, newData, token) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/boards/${boardId}`,
        newData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
  
  export const deleteBoard = async (boardId, token) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/boards/${boardId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
  