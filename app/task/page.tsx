import Tasks from '@/components/tasks/Tasks'
import { fetchWorkerList, getProfile } from '@/lib/profile'
import { fetchTasks } from '@/lib/tasks'
import { Profile } from '@/types/profile'
import React from 'react'

const TasksPage = async () => {
  const tasks = await fetchTasks()
  const workers = await fetchWorkerList()
  const user = await getProfile() as Profile

  return (
    <div className='flex w-full mb-20 justify-center py-8'>
      <div className='w-full'>
        <div className='px-8'>
          <p className='text-3xl font-semibold'>Daftar Tugas</p>
        </div>
        <div className='overflow-scroll'>
          <Tasks className='mt-5' user={user} tasks={tasks} workers={workers} />
        </div>
      </div>
    </div>
  )
}

export default TasksPage
