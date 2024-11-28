import { columns } from '@/components/tasks'
import { DataTable } from '@/components/ui/data-table'
import { fetchTasks } from '@/lib/tasks'
import React from 'react'

const TasksPage = async () => {
  const tasks = await fetchTasks()
  return (
    <div className='flex mt-20 justify-center'>
      <div className='w-[80%] py-10'>
        <p className='text-3xl font-semibold'>Daftar Tugas</p>
        <div className='mt-5'>
          <DataTable columns={columns} data={tasks} />
        </div>
      </div>
    </div>
  )
}

export default TasksPage
