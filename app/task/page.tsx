import { SortedTasksTable } from '@/components/tasks'
import { fetchTasksSorted } from '@/lib/tasks'
import React from 'react'

const TasksPage = async () => {
  const tasks = await fetchTasksSorted()
  return (
    <div className='flex mt-20 justify-center'>
      <div className='w-[80%] py-10'>
        <SortedTasksTable tasks={tasks} />
      </div>
    </div>
  )
}

export default TasksPage
