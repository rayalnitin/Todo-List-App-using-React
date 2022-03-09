import React , { useState } from 'react';
import './TodoList.css';


const TodoList = () => {
    const [inputData , setInputData] = useState('');
    const [items , setItems] = useState([]);
    const [toggle , setToggle] = useState(true);
    const [isEditing , setIsEditing] = useState('');

    const changeInputData = (event) => {
        setInputData(event.target.value);
    };
    const addItem = () => {
        const allInputData = {id: new Date().getTime().toString() , name: inputData};
        if(!inputData){
            alert('Please enter a new Task');
        }
        else if(inputData && !toggle){
          setItems( 
              items.map((element) => {
                   if(element.id === isEditing){
                       return {...element , name: inputData};
                   }
                   return element;
              }))
              setToggle(true);
              setInputData('');
              setIsEditing(null);
            }
        else{
            setItems([...items , allInputData]);
            setInputData('');
          }
    }

    const deleteItem = (ind) => {
           console.log(ind);
           const updatedItems = items.filter((element) => {
               return element.id !== ind;
           })
           setItems(updatedItems);
    }
    
    const removeAll = () => {
            setItems([]);
    }

    const editItem = (index) => {
          let newEditItem = items.find((elem)=> {
              return elem.id === index;
          })
          setToggle(false);
          setInputData(newEditItem.name);
          setIsEditing(index);
    }

    return (
        <>
            <div className="header">
              <h1>Todo List</h1>
              <input type="text" placeholder='Add Item...' value={inputData} onChange={changeInputData} />
              {
                  toggle ? <button className='first btns' onClick={addItem}>Create Task</button> :
                           <button className='first btns' onClick={addItem}>Edit task</button> 
              } 
            </div>
            <div className="show-items">
                {
                    items.map((values) => {
                           return (
                            <div className='data-slab' key={values.id}>
                               <p>{values.name}</p>
                               <div className='icons'>
                                    <ion-icon name="create" onClick={() => editItem(values.id)}></ion-icon>
                                    <ion-icon  name="trash" onClick={() =>deleteItem(values.id)}></ion-icon>   
                               </div>            
                           </div>
                           );
                    })
                }
               
            </div>  
            <div className='show-items'>
               <button className='second btns' onClick={removeAll}><span>Check List</span></button>
            </div>
        </>
     
    );
};

export default TodoList;