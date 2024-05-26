import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { MaterialReactTable } from 'material-react-table';

const ListView = ({ user }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/users/userData', {
          headers: {
            Authorization: user.token,
          },
        });
        setData(response.data.tasks); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]);

  const columns = useMemo(() => [
    {
      accessorKey: 'title',  
      header: 'Task Title',
      size: 200,
    },
    {
      accessorKey: 'description',
      header: 'Description',
      size: 300,
      Cell: ({ cell }) => {
        const description = cell.getValue();
        return description.length > 100 ? description.substring(0, 100) + '...' : description;
      },
    },
    {
      accessorKey: 'due_date',
      header: 'Due Date',
      Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),  // Formatting date
      size: 150,
    },
    {
      accessorKey: 'list.name',
      header: 'List Name',
      size: 150,
    },
    {
      accessorKey: 'list.board.title',
      header: 'Board Title',
      size: 150,
    },
    {
      accessorKey: 'list.board.color',
      header: 'Board Color',
      Cell: ({ cell }) => <div style={{ backgroundColor: cell.getValue(), color: '#fff', padding: '5px', textAlign: 'center' }}>Color</div>,  // Display color in a styled div
      size: 150,
    },
  ], []);

  return (
    <div style={{ padding: '80px 20px' }}>  
      <MaterialReactTable
        columns={columns}
        data={data}
        muiTablePaperProps={{
          elevation: 0,
          sx: {
            '& tr:nth-of-type(odd) > td': {
              backgroundColor: '#f5f5f5',
            },
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            width: '100%', 
            margin: 'auto',
          },
        }}
      />
    </div>
  );
};

export default ListView;
