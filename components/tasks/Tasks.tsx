'use client'

import { Profile } from '@/types/profile'
import { Task } from '@/types/tasks'
import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './TaskColumns'
import TaskAssigneeHeader from './TaskAssigneeHeader'
import TaskAssignee from './TaskAssignee'

interface TasksProps extends React.HTMLAttributes<HTMLDivElement> {
  tasks: Task[]
  workers: Profile[]
}

const Tasks: React.FC<TasksProps> = ({ tasks, workers, ...props }) => {
  return (
    <div {...props}>
      <DataTable columns={
        [
          ...columns, {
            accessorKey: "assignee",
            header: ({ column }) => <TaskAssigneeHeader workers={workers} column={column} />,
            cell: ({ row }) => {
              const task = row.original
              return (
                <div className='flex justify-center'>
                  <TaskAssignee workers={workers} task={task} />
                </div>
              )
            }
          },
        ]
      }
        data={tasks} />
    </div>
  )
}

export default Tasks
