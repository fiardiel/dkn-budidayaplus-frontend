'use client'

import React, { useState } from 'react'
import { Task } from '@/types/tasks'
import { Button } from '@/components/ui/button'
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog'
import { Profile } from '@/types/profile'
import { useToast } from '@/hooks/use-toast'
import { assignTask } from '@/lib/tasks/assignTask'
import { unassignTask } from '@/lib/tasks/unassignTask'

interface TaskAssigneeProps {
  task: Task
  workers: Profile[]
}

const TaskAssignee: React.FC<TaskAssigneeProps> = ({ task, workers }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [_, setUpdatedTask] = useState(task)
  const [loading, setLoading] = useState(false)
  const [assigneeUser, setAssigneeUser] = useState<Profile | undefined>(workers.find(worker => worker.user.phone_number === task.assignee))

  const { toast } = useToast()

  const handleAssigneeChange = async (assigneeUsername?: string) => {
    try {
      setLoading(true)
      if (assigneeUsername) {
        const latestTask = await assignTask(task.id, assigneeUsername)
        toast({
          description: 'Petugas berhasil ditetapkan',
          variant: 'success'
        })
        setUpdatedTask(latestTask)
        setAssigneeUser(workers.find(worker => worker.user.phone_number === latestTask.assignee))
      } else {
        const latestTask = await unassignTask(task.id)
        toast({
          description: 'Petugas berhasil dikosongkan',
          variant: 'success'
        })
        setUpdatedTask(latestTask)
        setAssigneeUser(undefined)
      }
    } catch (error) {
      toast({
        title: 'Gagal menetapkan petugas',
        description: (error as Error).message,
        variant: 'destructive',
      })
    } finally {
      setModalOpen(false)
      setLoading(false)
    }
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'} size={assigneeUser ? undefined : 'icon'} className='rounded-full'>
          {assigneeUser?.user.first_name} {assigneeUser?.user.last_name}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Pilih petugas
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div>
          {workers.length > 0 && workers.map((worker) => (
            <div key={worker.id} className='w-full'>
              <Button disabled={loading} className='w-full text-start justify-start border-b' onClick={() => handleAssigneeChange(worker.user.phone_number)} variant={'ghost'} >
                {worker.user.first_name} {worker.user.last_name}
              </Button>
            </div>
          ))
          }
          <div className='w-full'>
            <Button disabled={loading} className='w-full text-start justify-start border-b' onClick={() => handleAssigneeChange(undefined)} variant={'ghost'} >
              Clear
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TaskAssignee
