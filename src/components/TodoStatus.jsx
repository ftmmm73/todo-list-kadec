import { useContext, useState } from "react";
import { Select } from "antd";
import { TodoContext } from "../store/TodoContext";

const TodoItemStatus = ({ item }) => {
  const { changeStatus } = useContext(TodoContext);
  const [loading, setLoading] = useState(false);
  const options = [
    { value: "todo", label: "Todo" },
    { value: "done", label: "Done" },
  ];

  const handleChange = (value) => {
    setLoading(true);
    setTimeout(() => {
      changeStatus(item.id, value);
      setLoading(false);
    }, 1000);
  };

  return (
    <Select
      defaultValue={item.status || "Todo"}
      style={{ width: 75 }}
      loading={loading}
      options={options}
      onChange={handleChange}
    />
  );
};
export default TodoItemStatus;
