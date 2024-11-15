import React from 'react'
import { Task } from '@/types/tasks'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatDate } from 'date-fns'
import { id } from 'date-fns/locale'
import { TaskStatus, TaskAssignee } from '@/components/tasks'

interface TasksProps extends React.HTMLAttributes<HTMLDivElement> {
  tasks: Task[]
}

const Tasks: React.FC<TasksProps> = ({ tasks }) => {
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
                <TaskStatus task={task} />
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
