import React, { useState } from 'react';  
import '../styles/ToDoList.css';  

// Event Handling in React:
// When you pass handleDeleteTask(index) directly, it will execute the function immediately when the component renders, 
// rather than when the event occurs (e.g., a button click).

// Arrow Function:
// Using () => handleDeleteTask(index) creates a new function that calls handleDeleteTask(index) when the event occurs. 
// This ensures that the function is called only when the event is triggered.


function ToDoList(){
    
    const [tasks, setTasks] = useState<string[]>(['Thing 1', 'Thing 2', 'Thing 3']);
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

    // '_': The underscore is a convention to indicate that the parameter is not being used.
    // The 'filter' method iterates over each element in the 'tasks' array and applies a 
    // specified condition to determine which elements should be included in the new array.
    function handleDeleteTask(index: number){
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    // if checkbox is checked, add a 'strikethrough' to the text
    // if checkbox is unchecked, remove the 'strikethrough' on the text
    function handleCheckboxClick(index: number){
        // #TO_DO
    }        
    
    return (
        <div className='to-do-list'>

            <h1>To-Do List</h1>

            <div>
                <input type='text' placeholder='Enter a task' value={newTask} onChange={handleInputChange} />
                <button className='add-button' onClick={handleAddTask}>Add Task</button>
            </div>

            <ol>
                {tasks.map((task, index) =>
                    <li key ={index}>
                        <span className='text'>{task}</span>
                        {/* might want to change 'input' to 'label' ? 
                        W3Schools: "Always add the <label> tag for best accessibility practices!"*/}
                        <input type="checkbox" onClick={() => handleCheckboxClick(index)}></input> 
                        <button className='delete-button' onClick={() => handleDeleteTask(index)}>X</button>
                    </li>
                
                )}
            </ol>

        </div>
    )
}

export default ToDoList;