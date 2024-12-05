import Tasks from '@/components/tasks/Tasks'
import { fetchWorkerList } from '@/lib/profile'
import { fetchTasks } from '@/lib/tasks'
import React from 'react'

const TasksPage = async () => {
  const tasks = await fetchTasks()
  const workers = await fetchWorkerList()

  return (
    <div className='flex mt-20 justify-center'>
      <div className='w-[80%] py-10'>
        <p className='text-3xl font-semibold'>Daftar Tugas</p>
        <Tasks className='mt-5' tasks={tasks} workers={workers} />
      </div>
    </div>
  )
}

export default TasksPage
