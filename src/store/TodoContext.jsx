import React, { createContext, useEffect, useState } from "react";
import {
  FILTERED_TYPE_KEY,
  TODO_LIST_KEY,
  getStorage,
  setStorage,
} from "../utilities/storageManager";
import { initialTodoList } from "../utilities/mockData";
import { ALL_ITEMS } from "../components/FilterButtons";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const getTodoListFromStorage = getStorage(TODO_LIST_KEY) || [];
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
    const getTypeFromStorage = getStorage(FILTERED_TYPE_KEY);
    const arr = initialTodos.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    updateTodos(arr);
    if (getTypeFromStorage !== ALL_ITEMS) {
      console.log(todos);
      setTodos(arr.filter((todo) => todo.status === getTypeFromStorage));
    }
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
