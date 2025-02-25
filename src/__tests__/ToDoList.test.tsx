import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToDoList from '../components/ToDoList';

import { Task } from '../components/ToDoList';

// https://youtu.be/8Xwq35cPwYg?si=3yJdpiJ4Iw27OlP5
// https://testing-library.com/docs/queries/about/
// https://github.com/testing-library/jest-dom

describe('ToDoList', () => {
    test('Renders ToDoList component', () => {
        render(<ToDoList />);

        screen.debug();
        const heading = screen.getByRole('heading');
        const input = screen.getByPlaceholderText(/enter a task/i);
        const addButton = screen.getByText(/add task/i);

        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(/to-do list/i); // case-insensitive regex

        expect(input).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
    });

    test('Adding a new task', () => {
        render(<ToDoList />);
        
        const input = screen.getByPlaceholderText(/enter a task/i);
        const addButton = screen.getByText(/add task/i);

        fireEvent.change(input, { target: { value: 'Task 1' } });
        fireEvent.click(addButton);

        const task = screen.getByText(/Task 1/i);
        expect(task).toBeInTheDocument();
    });

    test('Marking a task as completed', () => {
        render(<ToDoList />);

        // adding a task
        const input = screen.getByPlaceholderText(/enter a task/i);
        const addButton = screen.getByText(/add task/i);
        fireEvent.change(input, { target: { value: 'Task 1' } });
        fireEvent.click(addButton);
        const task = screen.getByText(/Task 1/i);
        expect(task).toBeInTheDocument();

        const checkbox = screen.getByRole('checkbox');

        fireEvent.click(checkbox);

        expect(checkbox).toBeChecked();

        // this commented code fails
        // usually would not test styles (visuals) in unit tests, only functionality
        // expect(task.textContent).toHaveStyle('text-decoration: line-through');
        
        expect(task).toHaveClass('completed');
    });

    test('Deleting a task', () => {
        render(<ToDoList />);

        // adding a task
        const input = screen.getByPlaceholderText(/enter a task/i);
        const addButton = screen.getByText(/add task/i);
        fireEvent.change(input, { target: { value: 'Task 1' } });
        fireEvent.click(addButton);
        const task = screen.getByText(/Task 1/i);
        expect(task).toBeInTheDocument();

        const deleteButton = screen.getByText('X');

        fireEvent.click(deleteButton);

        // task should NOT be in the document
        expect(task).not.toBeInTheDocument();
    });

});