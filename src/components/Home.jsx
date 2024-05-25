import React from 'react'
import { useState } from 'react';
import '../Styles/Home.css'
import '../App.css'
import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar';
import ListView from './ListView';

import { BoardContext } from '../context/BoardContext';


const Home = () => {

    const boardData = {
        active:0,
        boards:[
          {
            name:'Trello Board',
            bgcolor:'#FFE0B2',
            list:[
              {id:"1",title:"To do",items:[{id:"cdrFt",title:"Project Description 1"}]},
              {id:"2",title:"In Progress",items:[{id:"cdrFv",title:"Project Description 2"}]},
              {id:"3",title:"Done",items:[{id:"cdrFb",title:"Project Description 3"}]}
            ]
          }
        ]
      }
      const [allboard,setAllBoard] = useState(boardData); 

    
      

  return (
    <div>
      
     <Header></Header>

     <BoardContext.Provider value={{allboard,setAllBoard}}>
       <div className='content flex bg-gray-900 text-gray-400 custom-sm'>
         <Sidebar></Sidebar>
         <Main></Main>
       </div>
     </BoardContext.Provider> 
    </div>
  )
}

export default Home
