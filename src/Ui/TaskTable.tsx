/** @format */

import {
  Table,
  Modal,
  Input,
  Tag,
  Select,
  InputNumber,
  Form,
  Typography,
  Popconfirm,
  DatePicker
} from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ColumnGroupType, ColumnProps, ColumnsType } from "antd/es/table";
// import type { ColumnsType } from "antd/es/table";
// import { ColumnProps } from 'antd/lib/table';
import AddTodo, { StatusOptions } from "./AddTodo";
import moment from "moment";
import { useAtom } from "jotai";
// import { ColumnType } from "antd/es/list";
import { tagsAtom } from "./../store/store";
import Tags from "./Tags";
import { ColumnType } from "antd/es/list";
const { TextArea } = Input;

const Search = Input.Search;
const Option = Select.Option;

// type ColumnType<T> = {
//   key: string;
//   title: string;
//   dataIndex: keyof T;
//   sorter?: (a: T, b: T) => number;
//   render?: (value: any, record: T, index: number) => React.ReactNode;
// };

// type ColumnsType<T> = Array<ColumnType<T>>;
interface EditableColumnProps<T> extends ColumnProps<T> {
  editable?: boolean;
}

export interface TodoType {
  id: string;
  createdDate: string;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  status: "OPEN" | "WORKING" | "DONE" | "OVERDUE";
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: TodoType;
  index: number;
  children: React.ReactNode;
  // renderCell: (dataIndex: keyof TodoType, record: TodoType) => React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  className,
  ...restProps
}) => {
  const [tags] = useAtom(tagsAtom);
  const tagOptions = tags.map((e) => {
    return { value: e, label: e };
  });
  // const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  // else if (dataIndex == "dueDate") {
  //   inputNode = <DatePicker format={"YYYY/MM/DD"} />;
  // }
  let inputNode;
  if (dataIndex == "title") {
    inputNode = <Input />;
  } else if (dataIndex == "description") {
    inputNode = <TextArea maxLength={1000} className="w-[200px]" />;
  } else if (dataIndex == "status") {
    inputNode = <Select options={StatusOptions} />;
  } else inputNode = <Input />;

  // =  === "number" ?  : ;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function TaskTable({}) {
  const [tags] = useAtom(tagsAtom);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string>("");
  // console.log("editingKey-", editingKey);

  const isEditing = (record: TodoType) => record.id === editingKey;

  const [filterTable, setFilterTable] = useState<TodoType[] | null>(null);
  const tagOptions =
    tags.length > 0
      ? tags.map((e) => {
          return { value: e, text: e };
        })
      : [];

  // const uniId = `${Math.random() * 1000}`;

  const [todo, setTodo] = useState<TodoType[]>([
    {
      id: "0",
      createdDate: "2021/04/09",
      title: "Title",
      description: "This is the Discription",
      dueDate: "2023/04/09",
      tags: ["Tag 2", "newTAg"],
      status: "OPEN"
    },
    {
      id: "1",
      createdDate: "2023/04/09",
      title: "Medium Title ",
      description: "Medium  Discription 2",
      dueDate: "2023/10/09",
      tags: ["NewTag"],
      status: "DONE"
    },
    {
      id: "2",
      createdDate: "2020/03/10",
      title: "Long Title ",
      description: "Long  Discription 3",
      dueDate: "2023/10/09",
      tags: ["Tag 2"],
      status: "OVERDUE"
    }
  ]);
  //  editing ###

  const edit = (record: Partial<TodoType> & { id: React.Key }) => {
    form.setFieldsValue({
      title: "",
      description: "",
      tag: "",
      dueDate: "",
      status: "",
      ...record
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as TodoType;

      console.log("row", row);
      const newData = [...todo];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        setTodo(newData);
        console.log("newData", newData);
        setEditingKey("");

        // console.log("saveData",new)
      } else {
        newData.push(row);
        setTodo(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  //  editing ***

  // const columns: ColumnsType<TodoType> = [
  const columns: EditableColumnProps<TodoType>[] = [
    {
      key: "1",
      title: "Created Date",
      dataIndex: "createdDate",
      // fixed: "left",
      sorter: (a: TodoType, b: TodoType) =>
        moment(a.createdDate).unix() - moment(b.createdDate).unix()
    },
    {
      key: "2",
      fixed: "left",
      title: "Title",
      dataIndex: "title",
      editable: true,
      sorter: (a: TodoType, b: TodoType) => a.title.length - b.title.length,
      sortDirections: ["descend", "ascend"]
    },
    {
      key: "3",
      title: "Description",
      dataIndex: "description",
      sorter: (a: TodoType, b: TodoType) =>
        a.description.length - b.description.length,
      sortDirections: ["descend", "ascend"],

      editable: true
    },
    {
      key: "4",
      title: "Due Date",
      dataIndex: "dueDate",
      editable: true,
      sorter: (a: TodoType, b: TodoType) =>
        moment(a.dueDate).unix() - moment(b.dueDate).unix()
    },
    {
      key: "5",
      title: "Tag",
      dataIndex: "tag",
      editable: true,
      filters: tagOptions,
      onFilter: (value: string | number | boolean, record: TodoType) => {
        return record.tags.indexOf(String(value)) === 0;
      },

      render: (_: any, record: TodoType) => (
        <>
          {record.tags.map((tag) => {
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
      editable: true,
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
      onFilter: (value: string | number | boolean, record: TodoType) => {
        return record.status.indexOf(String(value)) === 0;
      }
    },
    {
      key: "7",
      fixed: "right",
      title: "Actions",
      render: (_: any, record: TodoType) => {
        const editable = isEditing(record);
        // console.log(edit, "record");
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            {/* <EditOutlined
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            /> */}
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
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

  // handle search
  function onSearch(e: string) {
    const filterTable = todo.filter((o: any) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(e.toLowerCase())
      )
    );
    setFilterTable(filterTable);
  }
  // edit

  const mergedColumns: Array<
    ColumnProps<TodoType> & EditableColumnProps<TodoType>
  > = columns.map((col) => {
    if (!col.editable) {
      return col as ColumnProps<TodoType> & EditableColumnProps<TodoType>;
    }

    return {
      ...col,
      onCell: (record: TodoType) => ({
        record,
        inputType: col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    } as ColumnProps<TodoType> & EditableColumnProps<TodoType>;
  });

  return (
    <div className="">
      <h1 className="text-3xl mb-4">Todo-app</h1>
      <section className="flex  mb-4 items-center justify-between gap-3">
        <AddTodo {...{ todo, setTodo }} />
        <Search
          className="max-w-[300px]"
          size="large"
          placeholder="Search Todo..."
          onSearch={onSearch}
          onChange={(e) => onSearch(e.target.value)}
        />
      </section>
      <Form form={form} component={false}>
        <Table
          // scroll={{ x: 1500, y: 300 }}
          rowClassName="editable-row"
          components={{
            body: {
              cell: EditableCell
            }
          }}
          sticky
          bordered
          tableLayout="auto"
          columns={mergedColumns}
          dataSource={filterTable == null ? todo : filterTable}
        />
      </Form>
    </div>
  );
}
