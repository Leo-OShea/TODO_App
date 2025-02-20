import React, { useState } from 'react';  
import '../styles/ToDoList.css';  

// Event Handling in React:
// When you pass handleDeleteTask(index) directly, it will execute the function immediately when the component renders, 
// rather than when the event occurs (e.g., a button click).

// Arrow Function:
// Using () => handleDeleteTask(index) creates a new function that calls handleDeleteTask(index) when the event occurs. 
// This ensures that the function is called only when the event is triggered.


function ToDoList(){
    
    const [tasks, setTasks] = useState<string[]>([]);
    const [newTask, setNewTask] = useState(''); 

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
        setNewTask(event.target.value);
    }

    function handleAddTask(){
        if(newTask.trim() !== ""){
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function handleDeleteTask(index: number){
        // #TO-DO: Implement task deletion
    }
    
    return (
        <div className='tDoList'>

            <h1>To-Do List</h1>

            <div>
                <input type='text' placeholder='Enter a task' value={newTask} onChange={handleInputChange} />
                <button className='add-button' onClick={handleAddTask}>Add Task</button>
            </div>

            <ol>
                {tasks.map((task, index) =>
                    <li key ={index}>
                        <span className='text'>{task}</span>
                        <button className='delete-button' onClick={() => handleDeleteTask(index)}>X</button>
                        {/* <button className='complete-button' onClick={() => handleDeleteTask(index)}>X</button> */}
                    </li>
                
                )}
            </ol>

        </div>
    )
}

export default ToDoList;