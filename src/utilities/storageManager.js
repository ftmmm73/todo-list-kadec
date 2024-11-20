export const getStorage = (key = "todoList") => {
  const values = localStorage.getItem(key);
  return JSON.parse(values);
};

export const setStorage = (values, key = "todoList") => {
  localStorage.setItem(key, JSON.stringify(values));
};
