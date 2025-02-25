import React, { useState } from 'react';  
import '../styles/ToDoList.css';  

type Task = { id: number, text: string, completed: boolean };

var assignID = 0;

export default function ToDoList(){

    const [tasks, setTasks] = useState<Task[]>([]);
    
    const [newTask, setNewTask] = useState(''); 

    // Update the newTask state with the input value
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
        setNewTask(event.target.value);
    }

    // Add a new task to the tasks array
    function handleAddTask(){
        if(newTask.trim() !== ""){
            // The spread operator (...) copies the tasks array and adds the new task to it
            setTasks(t => [...t, { id: assignID, text: newTask, completed: false }]);
            setNewTask(''); // Clear the input field
        }
        assignID++;
    }                       

   // New array without deleted tasks
    function handleDeleteTask(id: number){
        const updatedTasks = tasks.filter((_, i) => i !== id);
        setTasks(updatedTasks);
    }

    // Toggle the completed status of a task
    function handleCheckboxClick(id: number){
        setTasks(tasks =>
            tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    }
    
    return (
        <div className='to-do-list'>

            <h1>To-Do List</h1>

            <div>
                <input type='text' placeholder='Enter a task' value={newTask} onChange={handleInputChange} />
                <button className='add-button' onClick={handleAddTask}>Add Task</button>
                <button className='delete-all-button' onClick={() => setTasks([])}>💣</button>
            </div>

            <ol>
                {tasks.map((task, index) =>
                    <li key ={index}>
                        
                        <span className={task.completed ? 'completed' : 'text'} data-testid='task-test-id'>{task.text}</span>
                        <input type="checkbox" onChange={() => handleCheckboxClick(task.id)} checked={task.completed} ></input> 
                        <button className='delete-button' onClick={() => handleDeleteTask(index)}>X</button>
                        
                    </li>
                )}
            </ol>

        </div>
    )
}

export type { Task }; // Export the Task type for testing purposes