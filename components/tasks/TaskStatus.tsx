import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Task } from '@/types/tasks'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '@/components/ui/button'
import { setStatus } from '@/lib/tasks/setStatus'
import { useToast } from '@/hooks/use-toast'

interface TaskStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  task: Task
}
const TaskStatus: React.FC<TaskStatusProps> = ({ task }) => {
  const [updatedTask, setUpdatedTask] = useState<Task>(task)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { toast } = useToast()
  const handleSetStatus = async (status: string) => {
    try {
      setLoading(true)
      const latestTask = await setStatus(task.id, status)
      setUpdatedTask(latestTask)
      toast({
        title: 'Status berhasil diubah',
        description: 'Anda dapat melihat perubahan status di tab task',
        variant: 'success',
      })
    } catch (error) {
      toast({
        title: 'Terjadi kesalahan',
        description: 'Coba refresh halaman ini',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger >
        <Badge className={`${updatedTask.status === 'DONE' ? 'bg-green-200 hover:bg-green-300 text-green-700' : 'bg-yellow-200 hover:bg-yellow-300 text-yellow-700'}`}>
          {updatedTask.status}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col gap-2 w-auto'>
        <Button disabled={loading} onClick={() => handleSetStatus('TODO')} className='bg-transparent hover:bg-yellow-200 text-black hover:text-yellow-700'>
          TODO
        </Button>
        <Button disabled={loading} onClick={() => handleSetStatus('DONE')} className='bg-transparent hover:bg-green-200 text-black hover:text-green-700'>
          DONE
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default TaskStatus
