'use client'

import React, { useEffect, useState } from 'react'
import { Task } from '@/types/tasks'
import { fetchAssignee } from '@/lib/tasks'
import { Badge } from '../ui/badge'

interface TaskAssigneeProps {
  task: Task
}

const TaskAssignee: React.FC<TaskAssigneeProps> = ({ task }) => {
  const [updatedTask, setUpdatedTask] = useState<Task | null>(null)

  useEffect(() => {
    const getAssignee = async () => {
      const result = await fetchAssignee(task)
      setUpdatedTask(result)
    }

    getAssignee()
  }, [task])

  if (!updatedTask) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Badge>
        {updatedTask.assignee || 'No assignee'}
      </Badge>
    </div>
  )
}

export default TaskAssignee
