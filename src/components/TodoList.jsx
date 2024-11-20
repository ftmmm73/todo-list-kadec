import React, { useContext, useState, useRef } from "react";
import DraggableList from "react-draggable-list";
import { Button, Empty, Typography } from "antd";
import TodoFormModal from "./TodoFormModal";
import { TodoContext } from "../store/TodoContext";
import TodoItem from "./TodoItem";

const { Text } = Typography;

const TodoList = () => {
  const { todos, addTodo, updateTodos } = useContext(TodoContext);
  const containerRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);

  const dragHandler = (i) => updateTodos(i);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setModalVisible(true)}
        className="add-button">
        Add New Task
      </Button>

      <div className="todo-list-container">
        {todos?.length ? (
          <div ref={containerRef}>
            <DraggableList
              itemKey="id"
              template={TodoItem}
              list={todos}
              onMoveEnd={dragHandler}
              container={() => containerRef.current}
            />
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
      <Text type="secondary">Number of tasks: {todos?.length || 0}</Text>

      <TodoFormModal
        visible={modalVisible}
        onSubmit={addTodo}
        onCancel={() => setModalVisible(false)}
      />
    </div>
  );
};

export default TodoList;
