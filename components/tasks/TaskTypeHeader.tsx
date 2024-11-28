import React from 'react'
import { Task } from "@/types/tasks"
import { Column } from "@tanstack/react-table"

interface TaskTypeHeaderProps {
  column: Column<Task, unknown>
}

const TaskTypeHeader: React.FC<TaskTypeHeaderProps> = ({ column }) => {
  return (
    <div>
    </div>
  )
}

export default TaskTypeHeader
