import React, { useState } from "react";
import { Modal, Input, Button } from "antd";

const TodoFormModal = ({ visible, onSubmit, onCancel, initialValue = "" }) => {
  const [taskValue, setTaskValue] = useState(initialValue);

  const handleSubmit = () => {
    if (taskValue.trim()) {
      onSubmit(taskValue);
      setTaskValue("");
      onCancel?.();
    }
  };

  return (
    <Modal
      title={initialValue ? "Edit Current Task" : "Add New Task"}
      visible={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}>
      <Input
        placeholder="Enter new task"
        value={taskValue}
        onChange={(e) => setTaskValue(e.target.value)}
      />
    </Modal>
  );
};

export default TodoFormModal;
