import { Task } from '@/types/tasks'
import React from 'react'

interface TaskAssigneeProps extends React.HTMLAttributes<HTMLDivElement> {
  task: Task
}

const TaskAssignee: React.FC<TaskAssigneeProps> = ({ task }) => {
  return (
    <div>
      {task.assignee}
    </div>
  )
}

export default TaskAssignee
