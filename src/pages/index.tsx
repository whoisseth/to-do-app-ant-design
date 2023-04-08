/** @format */

import TaskTable from "@/Ui/TaskTable";
// import dynamic from "next/dynamic";

// const TaskTable = dynamic(() => import("@/Ui/TaskTable"), {
//   loading: () => <p>Loading...</p>
// });

export default function Home() {
  return (
    <main className="p-4">
      <TaskTable />
    </main>
  );
}
