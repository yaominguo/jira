import { useAuth } from "context/auth-context";
import React from "react";
import { Form, Input, Button } from "antd";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) =>
    login(values).catch(onError);

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
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
