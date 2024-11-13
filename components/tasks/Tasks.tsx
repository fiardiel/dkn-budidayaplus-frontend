import React from 'react'
import { Task } from '@/types/tasks'

interface TasksProps extends React.HTMLAttributes<HTMLDivElement> {
  tasks: Task[]
}

const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  return (
    <div>
    </div>
  )
}

export default Tasks 
