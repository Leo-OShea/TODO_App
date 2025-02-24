import React, { useState } from 'react';  
import '../styles/ToDoList.css';  

// Event Handling in React:
// When you pass handleDeleteTask(index) directly, it will execute the function immediately when the component renders, 
// rather than when the event occurs (e.g., a button click).

// Arrow Function:
// Using () => handleDeleteTask(index) creates a new function that calls handleDeleteTask(index) when the event occurs. 
// This ensures that the function is called only when the event is triggered.
type Task = { id: number, text: string, completed: boolean };

var length = 0;

function ToDoList(){

    const [tasks, setTasks] = useState<Task[]>([]);
    // const [tasks, setTasks] = useState<{ text: string, completed: boolean }[]>([
    //     { text: 'Thing 1', completed: false },
    //     { text: 'Thing 2', completed: false },
    //     { text: 'Thing 3', completed: false }
    // ]);
    // when completed is true, add a 'strikethrough' to the text 
    // e.g., in css .task.completed { text-decoration: line-through; }
    const [newTask, setNewTask] = useState(''); 

    // We used the useState hook to track the boolean state of the checkbox.
    // The initial state of the checkbox is false (unchecked))
    // const [isChecked, setIsChecked] = useState(false);

    // Update the newTask state with the input value
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
        setNewTask(event.target.value);
    }

    // Add a new task to the tasks array
    function handleAddTask(){
        console.log('id assigned:' + length);
        if(newTask.trim() !== ""){
            // The spread operator (...) copies the tasks array and adds the new task to it
            setTasks(t => [...t, { id: length, text: newTask, completed: false }]);
        }
        length++;
        console.log('new length:' + length);
        console.log(newTask);
        console.log(tasks);
    }                       

    // '_': The underscore is a convention to indicate that the parameter is not being used.
    // The 'filter' method iterates over each element in the 'tasks' array and applies a 
    // specified condition to determine which elements should be included in the new array.
    // (The task is removed from the use state
    function handleDeleteTask(id: number){
        const updatedTasks = tasks.filter((_, i) => i !== id);
        setTasks(updatedTasks);
        console.log(updatedTasks);
    }

    // if checkbox is checked, add a 'strikethrough' to the text
    // if checkbox is unchecked, remove the 'strikethrough' on the text
    // right now this checks all the checkboxes at once
    // use index maybe?
    // const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.checked) {
    //         console.log('✅ Checkbox is checked');
    //       } else {
    //         console.log('⛔️ Checkbox is NOT checked');
    //       }
    //     //   setIsChecked(current => !current);
    // }

    // if checkbox is checked, add a 'strikethrough' to the text
    // if checkbox is unchecked, remove the 'strikethrough' on the text
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
            </div>

            <ol>
                {tasks.map((task, index) =>
                    <li key ={index}>
                        
                        <span className={task.completed ? 'completed' : 'text'}>{task.text}</span>
                        {/* might want to change 'input' to 'label' ? 
                        W3Schools: "Always add the <label> tag for best accessibility practices!"*/}
                        <input type="checkbox" onChange={() => handleCheckboxClick(task.id)} checked={task.completed} ></input> 
                        <button className='delete-button' onClick={() => handleDeleteTask(index)}>X</button>
                    </li>
                )}
            </ol>

        </div>
    )
}

export default ToDoList;