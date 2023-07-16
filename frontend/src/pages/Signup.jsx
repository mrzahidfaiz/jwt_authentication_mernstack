import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useFormik } from "formik";
import { register } from "../api/internal";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const { values, handleChange } = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const registerHandler = async () => {
    const data = {
      email: values.email,
      name: values.name,
      password: values.password,
    };
    const response = await register(data);
    if (response.status === 201) {
      const user = {
        _id: response.data.user._id,
        name: response.data.user.name,
        email: response.data.user.email,
        auth: response.data.auth,
      };
      toast.success(response.data.message);
      dispatch(setUser(user));
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else if (response.code === "ERR_BAD_REQUEST") {
      toast.error(response.response.data.message);
      setError(response.response.data.message);
    }
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 800,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
        <h3 className="text-3xl text-center mb-12 text-red-500">Signup Here</h3>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your Name!",
          },
        ]}
      >
        <Input name="name" value={values.name} onChange={handleChange} />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input name="email" value={values.email} onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          name="password"
          value={values.password}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        {error != "" ? (
          <p className="text-sm text-red-600 hover:to-pink-700">{error}</p>
        ) : (
          ""
        )}
        <Button onClick={registerHandler}>Signup</Button>
      </Form.Item>
    </Form>
  );
};
export default Signup;
