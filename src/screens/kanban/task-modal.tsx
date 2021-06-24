import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { TaskTypeSelect } from "components/task-type-select";
import { UserSelect } from "components/user-select";
import React, { useEffect } from "react";
import { useDeleteTask, useEditTask } from "utils/task";
import { useTaskModal, useTasksQueryKey } from "./util";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const [form] = useForm();
  const { editingTaskId, editingTask, close } = useTaskModal();

  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );

  const onCancel = () => {
    form.resetFields();
    close();
  };
  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    onCancel();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey());
  const startDelete = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除任务吗？",
      onOk: async () => {
        await deleteTask({ id: Number(editingTaskId) });
        close();
      },
    });
  };

  return (
    <Modal
      onCancel={onCancel}
      onOk={onOk}
      forceRender
      okText={"确认"}
      cancelText={"取消"}
      confirmLoading={editLoading}
      title={"编辑任务"}
      visible={!!editingTaskId}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"经办人"} name={"processorId"}>
          <UserSelect defaultOptionName={"经办人"} />
        </Form.Item>
        <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypeSelect defaultOptionName={"类型"} />
        </Form.Item>
        <div style={{ textAlign: "right" }}>
          <Button
            type={"dashed"}
            onClick={startDelete}
            style={{ fontSize: "14px" }}
            size={"small"}
          >
            删除
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
