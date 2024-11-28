import React from 'react'
import { Task } from "@/types/tasks"
import { Column } from "@tanstack/react-table"

interface TaskDateHeaderProps {
  column: Column<Task, unknown>
}

const TaskDateHeader: React.FC<TaskDateHeaderProps> = ({ column }) => {
  return (
    <div className="flex items-center">
    </div>
  )
}

export default TaskDateHeader
