"use client"

import { Task } from "@/types/tasks"
import { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "date-fns"
import { id } from "date-fns/locale"
import { TaskTypeHeader, TaskDateHeader, TaskAssigneeHeader, TaskStatus, TaskAssignee } from "@/components/tasks"

export const determinePeriod = (date: Date, period: 'past' | 'upcoming' | 'today') => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const taskDate = new Date(date);
  taskDate.setHours(0, 0, 0, 0);

  if (period === 'today') {
    return taskDate.getTime() === today.getTime();
  } else if (period === 'past') {
    return taskDate.getTime() < today.getTime();
  } else if (period === 'upcoming') {
    return taskDate.getTime() > today.getTime();
  }
  return false;
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "task_type",
    header: ({ column }) => <TaskTypeHeader column={column} />,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <TaskDateHeader column={column} />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      const formattedDate = formatDate(date, "dd-MM-yyyy", { locale: id })
      return <div>{formattedDate}</div>
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      return determinePeriod(row.getValue(columnId), filterValue);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const task = row.original
      return <TaskStatus task={task} />
    }
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => <TaskAssigneeHeader column={column} />,
    cell: ({ row }) => {
      const task = row.original
      return <TaskAssignee task={task} />
    }
  },
]
