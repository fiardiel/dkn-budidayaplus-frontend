import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Task } from '@/types/tasks'

interface TaskStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  task: Task
}
const TaskStatus: React.FC<TaskStatusProps> = ({ task }) => {
  return (
    <div>
      <Badge className={`${task.status === 'DONE' ? 'bg-green-500' : 'bg-gray-500'}`}>
        {task.status}
      </Badge>
    </div>
  )
}

export default TaskStatus
