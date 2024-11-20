import React, { useContext, useState } from "react";
import { TodoContext } from "../store/TodoContext";
import { Button, Card, Space } from "antd";
import TodoFormModal from "./TodoFormModal";
import TodoItemStatus from "./TodoStatus";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TodoItem = ({ item, dragHandleProps }) => {
  const { onMouseDown } = dragHandleProps;
  const { editTodo, removeTodo } = useContext(TodoContext);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Card
        className="todo-item"
        hoverable
        onMouseDown={(e) => {
          document.body.style.overflow = "hidden";
          onMouseDown(e);
        }}
        onMouseUp={() => (document.body.style.overflow = "visible")}>
        <h4>{item.text}</h4>
        <Space>
          <Button onClick={() => setModalVisible(true)}>
            <EditOutlined />
          </Button>
          <Space.Compact direction="vertical">
            <Button onClick={() => removeTodo(item.id)}>
              <DeleteOutlined />
            </Button>
          </Space.Compact>
          <TodoItemStatus item={item} />
        </Space>
      </Card>

      <TodoFormModal
        visible={modalVisible}
        onSubmit={(newText) => editTodo(item.id, newText)}
        onCancel={() => setModalVisible(false)}
        initialValue={item.text}
      />
    </>
  );
};

export default TodoItem;
