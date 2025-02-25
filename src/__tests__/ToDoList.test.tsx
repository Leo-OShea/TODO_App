import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'

import ToDoList from '../components/ToDoList';
import { Task } from '../components/ToDoList';

describe('ToDoList', () => {

    beforeEach(() => {
        render(<ToDoList />);
    });
    
    test('Renders ToDoList component', () => {
        const heading = screen.getByRole('heading');
        const input = screen.getByPlaceholderText(/enter a task/i);
        const addButton = screen.getByText(/add task/i);

        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(/to-do list/i); 

        expect(input).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
    });

    test('Adding a new task', async () => {
        const user = userEvent.setup()
        
        const input = screen.getByPlaceholderText(/enter a task/i);
        const addButton = screen.getByRole('button', { name: /add task/i });
        await user.type(input, 'Task 1');
        await user.click(addButton);
        const task = screen.getByText(/Task 1/i);

        expect(task).toBeInTheDocument();
    });

    test('Marking a task as completed', async () => {
        const user = userEvent.setup()

        // adding a task
        const input = screen.getByPlaceholderText(/enter a task/i);
        const addButton = screen.getByRole('button', { name: /add task/i });
        await user.type(input, 'Task 1' );
        await user.click(addButton);
        const task = screen.getByText(/Task 1/i);
        expect(task).toBeInTheDocument();

        const checkbox = screen.getByRole('checkbox');

        await user.click(checkbox);

        expect(checkbox).toBeChecked();
        
        expect(task).toHaveClass('completed');
    });

    test('Deleting a task', async () => {
        const user = userEvent.setup()

        // adding a task
        const input = screen.getByPlaceholderText(/enter a task/i);
        const addButton = screen.getByRole('button', { name: /add task/i });
        await user.type(input, 'Task 1');
        await user.click(addButton);
        const task = screen.getByText(/Task 1/i);
        expect(task).toBeInTheDocument();

        const deleteButton = screen.getByRole('button', { name: /X/ });

        await user.click(deleteButton);

        expect(screen.queryByText(/Task 1/i)).not.toBeInTheDocument();
    });

    test('Deleting all tasks', async () => {
        const user = userEvent.setup()

        // adding tasks
        const input = screen.getByPlaceholderText(/enter a task/i);
        const addButton = screen.getByRole('button', { name: /add task/i });
        await user.type(input, 'Task 1');
        await user.click(addButton);
        await user.type(input, 'Task 2');
        await user.click(addButton);
        const task1 = screen.getByText(/Task 1/i);
        const task2 = screen.getByText(/Task 1/i);
        expect(task1).toBeInTheDocument();
        expect(task2).toBeInTheDocument();

        const deleteAllButton = screen.getByRole('button', { name: /💣/ });

        await user.click(deleteAllButton);

        expect(screen.queryByText(/Task 1/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Task 2/i)).not.toBeInTheDocument();
    });

});