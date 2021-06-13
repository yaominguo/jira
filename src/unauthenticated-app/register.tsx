import { useAuth } from "context/auth-context";
import React from "react";
import { Form, Input, Button } from "antd";

export const RegisterScreen = () => {
  const { register } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) =>
    register(values);

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" />
      </Form.Item>
      <Form.Item>
        <Button htmlType={"submit"} block={true} type={"primary"}>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};
