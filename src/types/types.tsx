/** @format */

export type Task = {
  key: string | number;
  title: string;
  dataIndex: string | number;
};
// export type Task = {
//     id: string;
//     created: string;
//     title: string;
//     description?: string;
//     dueDate?: string;
//     tags?: string[];
//     status?: TaskStatus;
//   };

export enum TaskStatus {
  OPEN = "OPEN",
  WORKING = "WORKING",
  DONE = "DONE",
  OVERDUE = "OVERDUE"
}
