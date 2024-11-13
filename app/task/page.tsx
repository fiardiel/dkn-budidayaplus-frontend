import { Tasks } from '@/components/tasks'
import { fetchTasks } from '@/lib/tasks'
import React from 'react'

const TasksPage = async () => {
  const tasks = await fetchTasks()
  return (
    <div className='flex mt-20 justify-center'>
      <div className='w-[80%] py-10'>
        <Tasks tasks={tasks} />
      </div>
    </div>
  )
}

export default TasksPage
