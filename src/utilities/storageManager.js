export const TODO_LIST_KEY = "todoList";
export const FILTERED_TYPE_KEY = "filteredType";

export const getStorage = (key = TODO_LIST_KEY) => {
  const values = localStorage.getItem(key);
  return JSON.parse(values);
};

export const setStorage = (values, key = TODO_LIST_KEY) => {
  localStorage.setItem(key, JSON.stringify(values));
};
