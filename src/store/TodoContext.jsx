import React, { createContext, useEffect, useState } from "react";
import { getStorage, setStorage } from "../utilities/storageManager";
import { initialTodoList } from "../utilities/mockData";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const getTodoListFromStorage = getStorage("todoList") || [];
  const initialTodos = getTodoListFromStorage.length
    ? getTodoListFromStorage
    : initialTodoList;
  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    setStorage(todos);
  }, []);

  const updateTodos = (items, updateLocalStorage = true) => {
    setTodos(items);
    if (updateLocalStorage) {
      setStorage(items);
    }
  };

  const addTodo = (newTodo) => {
    if (newTodo.trim()) {
      updateTodos([
        ...todos,
        { id: Date.now(), text: newTodo, status: "todo" },
      ]);
    }
  };

  const editTodo = (id, newText) => {
    updateTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const removeTodo = (id) => {
    updateTodos(todos.filter((todo) => todo.id !== id));
  };

  const changeStatus = (id, newStatus) => {
    updateTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        editTodo,
        removeTodo,
        updateTodos,
        changeStatus,
      }}>
      {children}
    </TodoContext.Provider>
  );
};
