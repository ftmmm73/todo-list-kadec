import React, { useEffect, useRef, useState } from "react";
import { Modal, Input, Button } from "antd";

const TodoFormModal = ({ visible, onSubmit, onCancel, initialValue = "" }) => {
  const inputRef = useRef(null);
  const [taskValue, setTaskValue] = useState(initialValue);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus({
        cursor: "end",
      });
    });
    return () => clearTimeout(timer);
  }, [visible]);

  const handleSubmit = () => {
    if (taskValue.trim()) {
      onSubmit(taskValue);
      setTaskValue("");
      onCancel?.();
    } else setHasError(true);
  };

  const handleCancel = () => {
    onCancel?.();
    setHasError(false);
    setTaskValue(initialValue);
  };

  return (
    <Modal
      title={initialValue ? "Edit Selected Task" : "Add New Task"}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}>
      <Input
        ref={inputRef}
        placeholder="Enter new task"
        status={hasError ? "error" : null}
        value={taskValue}
        onPressEnter={handleSubmit}
        onChange={(e) => {
          setTaskValue(e.target.value);
          setHasError(false);
        }}
      />
    </Modal>
  );
};

export default TodoFormModal;
