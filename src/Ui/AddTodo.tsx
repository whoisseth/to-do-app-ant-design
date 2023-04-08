/** @format */

import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import FormItemLabel from "antd/es/form/FormItemLabel";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React, { useState } from "react";

interface AddTodo {
  handleSubmit?: React.FormEventHandler<HTMLFormElement> | undefined;
}

export default function AddTodo(props: AddTodo) {
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
  };

  //

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  //

  const dateFormat = "YYYY/MM/DD";
  const statusOptions = [
    { value: "OPEN", label: "OPEN" },
    { value: "WORKING", label: "WORKING" },
    { value: "DONE", label: "DONE" },
    { value: "OVERDUE", label: "OVERDUE" }
  ];

  return (
    <div>
      <Button
        onClick={showModal}
        type="primary"
        className="bg-blue-500 flex items-center mb-4"
      >
        <PlusOutlined />
        <span>Add todo</span>
      </Button>

      <Modal
        title="Add todo"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        {/* <p>{modalText}</p> */}

        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          onSubmitCapture={props.handleSubmit}
        >
          <Form.Item
            label="Title "
            name="title"
            rules={[{ required: true, message: "Please input title!" }]}
          >
            <Input className="w-[200px]" />
          </Form.Item>

          <Form.Item
            label="Description "
            name="description"
            rules={[{ required: true, message: "Please input Description!" }]}
          >
            <TextArea maxLength={1000} className="w-[200px]" />
          </Form.Item>
          <Form.Item
            label="Due Date "
            name="dueDate"
          >
            <DatePicker
        
            format={dateFormat}
          />
          </Form.Item>

          <Form.Item
            label="Description "
            name="description"
            rules={[{ required: true, message: "Please input Description!" }]}
          >
             <Select
            defaultValue="OPEN"
            className="w-[120px]"
            options={statusOptions}
          />
          </Form.Item>
         
          <Form.Item
            label="Tag "
            name="tag"
          >
            <Input className="w-[200px]"/>
          </Form.Item>

          {/* <Button type="primary" className=" bg-blue-500">
            Add
          </Button> */}
        </Form>
      </Modal>
    </div>
  );
}
