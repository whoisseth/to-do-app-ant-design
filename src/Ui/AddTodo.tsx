/** @format */

import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Modal,
  Select
} from "antd";
import React, { Dispatch, SetStateAction, useState, useRef } from "react";
import { TodoType } from "./TaskTable";
import Tags from "./Tags";
import { useAtom } from "jotai";
import { tagsAtom } from "@/store/store";
import { format } from "date-fns";
const { TextArea } = Input;
interface AddTodo {
  handleSubmit?: React.FormEventHandler<HTMLFormElement> | undefined;
  todo: TodoType[];
  setTodo: Dispatch<SetStateAction<TodoType[]>>;
}

export default function AddTodo(props: AddTodo) {
  const [tags] = useAtom(tagsAtom);
  const tagOptions = tags.map((e) => {
    return { value: e, label: e };
  });

  const formRef = useRef<FormInstance>(null);
  const [open, setOpen] = useState(false);
  //   const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleOk = () => {
    // setModalText("The modal will be closed after two seconds");
    setOpen(false);
  };

  //
  //    handle form
  const onFinish = (values: TodoType) => {
    const dueDate = format(new Date(values.dueDate), "yyyy/MM/dd");
    // const currentDate = format(new Date(), "yyyy/MM/dd a, p");
    const currentDate = format(new Date(), "yyyy/MM/dd");
    console.log("Success:", values);
    console.log("values.dueDate:", values.dueDate);

    // const currentDate = new Date();
    props.setTodo(() => [
      ...props.todo,
      {
        ...values,
        createdDate: currentDate,
        dueDate: dueDate
      }
    ]);

    formRef.current?.resetFields();
    setOpen(false);
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
        className="bg-blue-500 flex items-center "
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
        footer={false}
      >
        {/* <p>{modalText}</p> */}

        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          ref={formRef}
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
            rules={[{ required: true, message: "Please input Description!" }]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>

          <Form.Item label="Create tag " name="tag">
            {/* <Input className="w-[200px]" /> */}
            <Tags />
          </Form.Item>

          <Form.Item
            label="Tag "
            name="tags"
            rules={[{ required: true, message: "Please Select Status!" }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              //   defaultValue={["tag1"]}
              //   onChange={handleChange}
              options={tagOptions}
            />
          </Form.Item>

          <Form.Item
            label="Status "
            name="status"
            rules={[{ required: true, message: "Please Select Status!" }]}
          >
            <Select className="w-[120px]" options={statusOptions} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
