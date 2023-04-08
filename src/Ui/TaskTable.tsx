/** @format */

import { Table, Modal, Input, Tag } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import AddTodo from "./AddTodo";
import moment from "moment";
import { useAtom } from "jotai";
import { tagsAtom } from "@/store/store";

export interface TodoType {
  createdDate: string;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  status: "OPEN" | "WORKING" | "DONE" | "OVERDUE";
}

export default function TaskTable({}) {
  const [tags] = useAtom(tagsAtom);
  const tagOptions =
    tags.length > 0
      ? tags.map((e) => {
          return { value: e, text: e };
        })
      : [];
  // const tagOptions = tags.map((e) => {
  //   return { value: e, text: e };
  // });

  const uniId = `${Math.random() * 1000}`;

  // const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState<TodoType | null>(null);
  const [todo, setTodo] = useState<TodoType[]>([
    {
      createdDate: "2021/04/09",
      title: "Title",
      description: "This is the Discription",
      dueDate: "2023/04/09",
      tags: ["Tag 2", "newTAg"],
      status: "OPEN"
    },
    {
      createdDate: "2023/04/09",
      title: "Medium Title ",
      description: "Medium  Discription 2",
      dueDate: "2023/10/09",
      tags: ["NewTag"],
      status: "DONE"
    },
    {
      createdDate: "2020/03/10",
      title: "Long Title ",
      description: "Long  Discription 3",
      dueDate: "2023/10/09",
      tags: ["Tag 2"],
      status: "OVERDUE"
    }
  ]);
  const columns: ColumnsType<TodoType> = [
    {
      key: "1",
      title: "Created Date",
      dataIndex: "createdDate",
      sorter: (a, b) =>
        moment(a.createdDate).unix() - moment(b.createdDate).unix()
      // sortDirections: ["descend", "ascend"]
    },
    {
      key: "2",
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend", "ascend"]
    },
    {
      key: "3",
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ["descend", "ascend"]
    },
    {
      key: "4",
      title: "Due Date",
      dataIndex: "dueDate",
      sorter: (a, b) => moment(a.dueDate).unix() - moment(b.dueDate).unix()
    },
    {
      key: "5",
      title: "Tag",
      dataIndex: "tag",
      filters: tagOptions,
      onFilter: (value: string | number | boolean, record) => {
        return record.tags.indexOf(String(value)) === 0;
      },

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
      dataIndex: "status",
      filters: [
        {
          text: "OPEN",
          value: "OPEN"
        },
        {
          text: "WORKING",
          value: "WORKING"
        },
        {
          text: "DONE",
          value: "DONE"
        },
        {
          text: "OVERDUE",
          value: "OVERDUE"
        }
      ],
      // onFilter: (value: string, record) => record.status.indexOf(value) === 0
      onFilter: (value: string | number | boolean, record: TodoType) => {
        return record.status.indexOf(String(value)) === 0;
      }
    },
    {
      key: "7",
      title: "Actions",
      render: (record: any) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                // onEditStudent(record);
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

  const onDeleteStudent = (record: TodoType) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setTodo((pre) => {
          return pre.filter((d) => d !== record);
        });
      }
    });
  };
  // const onEditStudent = (record: any) => {
  //   setIsEditing(true);
  //   setEditingStudent({ ...record });
  // };
  // const resetEditing = () => {
  //   setIsEditing(false);
  //   setEditingStudent(null);
  // };

  return (
    <div className="">
      <h1 className="text-3xl mb-4">Todo-app</h1>
      {/* <AddTodo {...{ todo, setTodo }} handleSubmit={onAddStudent} /> */}
      <AddTodo {...{ todo, setTodo }} />
      <Table
        sticky
        bordered
        tableLayout="fixed"
        scroll={{
          x: 0,
          y: "400px"
        }}
        columns={columns}
        dataSource={todo}
      />
    </div>
  );
}
