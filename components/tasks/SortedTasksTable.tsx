import React from 'react'
import { TaskSorted } from '@/types/tasks'
import { Tasks } from '@/components/tasks'

interface SortedTasksTableProps extends React.HTMLAttributes<HTMLDivElement> {
  tasks: TaskSorted
}

const SortedTasksTable: React.FC<SortedTasksTableProps> = ({ tasks }) => {
  return (
    <div>
      <div>
        <p className='text-2xl font-medium'>Tugas Mendatang</p>
        <Tasks className='mt-5' tasks={tasks.upcoming} />
      </div>
      <div className='mt-8'>
        <p className='text-2xl font-medium'>Tugas Lalu</p>
        <Tasks className='mt-5' tasks={tasks.past} />
      </div>
    </div>
  )
}

export default SortedTasksTable
