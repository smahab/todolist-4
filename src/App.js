import './App.css';
import { TodoWrapper } from './components/TodoWrapper';

import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const addTodo = () => {
    if (newTitle.trim() !== '') {
      setTodos([...todos, { title: newTitle, description: newDescription }]);
      setNewTitle('');
      setNewDescription('');
    }
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setNewTitle(todos[index].title);
    setNewDescription(todos[index].description);
  };

  const cancelEdit = () => {
    setEditIndex(-1);
    setNewTitle('');
    setNewDescription('');
  };

  const saveEdit = () => {
    const newTodos = [...todos];
    newTodos[editIndex] = { title: newTitle, description: newDescription };
    setTodos(newTodos);
    cancelEdit();
  };

  return (
    <div>
      <h2>Att göra</h2>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <strong>{todo.title}</strong> - {editIndex === index ? (
              <>
                <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                <button onClick={saveEdit}>Spara</button>
                <button onClick={cancelEdit}>Avbryt</button>
              </>
            ) : (
              <>
                {todo.description}
                <button onClick={() => startEdit(index)}>Redigera</button>
                <button onClick={() => removeTodo(index)}>Ta bort</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <h3>Lägg till ny post</h3>
        <label>
          Titel:
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Beskrivning:
          <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        </label>
        <br />
        <button onClick={addTodo}>Lägg till</button>
      </div>
    </div>
  );
};

export default TodoList;
