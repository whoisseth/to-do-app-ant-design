/** @format */

import { Table, Modal, Input, Tag } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import AddTodo from "./AddTodo";

interface TodoType {
  id: string;
  createdDate: string;
  title: string;
  description: string;
  address: string;
  dueDate: string;
  tags: string[];
  status: "OPEN" | "WORKING" | "DONE" | "OVERDUE";
}

export default function TaskTable({}) {
  const uniId = `${Math.random() * 1000}`;

  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState<TodoType | null>(null);
  const [Todo, SetTodo] = useState<TodoType[]>([
    {
      id: uniId,
      createdDate: "createdDate",
      title: "This is the Title of the Task",
      description: "description",
      address: "address",
      dueDate: "dueDate",
      tags: ["nice", "developer"],
      status: "OPEN"
    },
    {
      id: uniId,
      createdDate: "createdDate",
      title: "This is the Title of the Task",
      description: "description",
      address: "address",
      dueDate: "dueDate",
      tags: ["loser"],
      status: "OPEN"
    },
    {
      id: uniId,
      createdDate: "createdDate",
      title: "This is the Title of the Task",
      description: "description",
      address: "address",
      dueDate: "dueDate",
      tags: ["cool", "teacher"],
      status: "OPEN"
    },
    {
      id: uniId,
      createdDate: "createdDate",
      title: "This is the Title of the Task",
      description: "description",
      address: "address",
      dueDate: "dueDate",
      tags: ["nice", "developer"],
      status: "OPEN"
    }
  ]);
  const columns: ColumnsType<TodoType> = [
    {
      key: "1",
      title: "Created Date",
      dataIndex: "createdDate"
    },
    {
      key: "2",
      title: "Title",
      dataIndex: "title"
    },
    {
      key: "3",
      title: "Description",
      dataIndex: "description"
    },
    {
      key: "4",
      title: "Due Date",
      dataIndex: "dueDate"
    },
    {
      key: "5",
      title: "Tag",
      dataIndex: "tag",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )
    },
    {
      key: "6",
      title: "Status",
      dataIndex: "status"
    },
    {
      key: "7",
      title: "Actions",
      render: (record: any) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      }
    }
  ];

  const onAddStudent = () => {
    // const randomString = crypto.randomUUID();
    // setEditingStudent
    const newTodo: TodoType = {
      id: uniId,
      createdDate: "createdDate" + uniId,
      title: "This is the Title of the Task " + uniId,
      description: "description" + uniId,
      address: "address" + uniId,
      dueDate: "dueDate" + uniId,
      tags: [`${uniId.slice(0, 10)}`],
      status: "OPEN"
    };
    SetTodo((pre) => {
      return [...pre, newTodo];
    });
  };
  const onDeleteStudent = (record: { id: string }) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        SetTodo((pre) => {
          return pre.filter((d) => d.id !== record.id);
        });
      }
    });
  };
  const onEditStudent = (record: any) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };

  return (
    <div className="">
      <h1 className="text-3xl mb-4">Todo-app</h1>
      <AddTodo handleSubmit={onAddStudent} />
      <Table
        sticky
        showHeader
        tableLayout="fixed"
        rootClassName="border rounded-lg overflow-hidden border-gray-200"
        scroll={{
          x: 0,
          y: "400px"
        }}
        columns={columns}
        dataSource={Todo}
      />
      <Modal
        title="Edit Student"
        visible={isEditing}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          SetTodo((pre) => {
            return pre.map((d) => {
              if (d.id === editingStudent?.id) {
                return editingStudent;
              } else {
                return d;
              }
            });
          });
          resetEditing();
        }}
      >
        <Input
          value={editingStudent?.title}
          onChange={(e) => {
            setEditingStudent((pre: any) => {
              return { ...pre, name: e.target.value };
            });
          }}
        />
        <Input
          value={editingStudent?.description}
          onChange={(e) => {
            setEditingStudent((pre: any) => {
              return { ...pre, email: e.target.value };
            });
          }}
        />
        <Input
          value={editingStudent?.address}
          onChange={(e) => {
            setEditingStudent((pre: any) => {
              return { ...pre, address: e.target.value };
            });
          }}
        />
      </Modal>
    </div>
  );
}
