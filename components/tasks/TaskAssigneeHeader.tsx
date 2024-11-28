import React from 'react'
import { Task } from "@/types/tasks"
import { Column } from "@tanstack/react-table"

interface TaskAssigneeHeaderProps {
  column: Column<Task, unknown>
}

const TaskAssigneeHeader: React.FC<TaskAssigneeHeaderProps> = ({ column }) => {
  return (
    <div className="my-3">
    </div>
  )
}

export default TaskAssigneeHeader
