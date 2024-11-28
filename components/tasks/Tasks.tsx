"use client"

import React, { useState } from 'react'
import { Task } from '@/types/tasks'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatDate } from 'date-fns'
import { id } from 'date-fns/locale'
import { TaskStatus, TaskAssignee } from '@/components/tasks'
import { updateTaskStatus } from "@/lib/tasks";

interface TasksProps extends React.HTMLAttributes<HTMLDivElement> {
  tasks: Task[]
}

const Tasks: React.FC<TasksProps> = ({ tasks: initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    const result = await updateTaskStatus(taskId, newStatus);

    if (result.success) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } else {
      console.error(result.message);
    }
  };

  return (
    <div>
      <Table className='mt-5'>
        <TableHeader>
          <TableRow>
            <TableHead>
              Tugas
            </TableHead>
            <TableHead>
              Tenggat
            </TableHead>
            <TableHead>
              Status
            </TableHead>
            <TableHead>
              Petugas
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length > 0 ? tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                {task.task_type}
              </TableCell>
              <TableCell>
                {formatDate(task.date, 'EEEE, dd MMMM yyyy', { locale: id })}
              </TableCell>
              <TableCell>
                  <TaskStatus task={task} onStatusChange={handleStatusChange} />
                </TableCell>
              <TableCell>
                <TaskAssignee task={task} />
              </TableCell>
            </TableRow>
          )) :
            <TableRow>
              <TableCell colSpan={4}>
                Tidak ada tugas
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default Tasks 
