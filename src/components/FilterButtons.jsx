import { useContext, useState } from "react";
import { Radio } from "antd";
import { TodoContext } from "../store/TodoContext";
import {
  FILTERED_TYPE_KEY,
  TODO_LIST_KEY,
  getStorage,
  setStorage,
} from "../utilities/storageManager";

export const ALL_ITEMS = "All";

const FilterButtons = () => {
  const [value, setValue] = useState(ALL_ITEMS);
  const { updateTodos } = useContext(TodoContext);
  const getTodoListFromStorage = getStorage(TODO_LIST_KEY) || [];

  const handleFilterItem = (e) => {
    const selectedValue = e.target.value;
    setStorage(selectedValue, FILTERED_TYPE_KEY);
    setValue(selectedValue);
    if (getTodoListFromStorage.length) {
      if (selectedValue === ALL_ITEMS) {
        updateTodos(getTodoListFromStorage, false);
      } else {
        updateTodos(
          getTodoListFromStorage.filter(
            (item) => item.status === selectedValue
          ),
          false
        );
      }
    }
  };

  return (
    <Radio.Group value={value} onChange={handleFilterItem}>
      <Radio.Button value={ALL_ITEMS}>All</Radio.Button>
      <Radio.Button value="todo">Todo</Radio.Button>
      <Radio.Button value="done">Done</Radio.Button>
    </Radio.Group>
  );
};
export default FilterButtons;
