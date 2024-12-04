import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Task } from "@/types/tasks"
import { Column } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

interface TaskAssigneeHeaderProps {
  column: Column<Task, unknown>
}

const TaskAssigneeHeader: React.FC<TaskAssigneeHeaderProps> = ({ column }) => {
  return (
    <div className="my-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'ghost'} className="flex items-center gap-2">
            Petugas <Filter className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <div className="flex flex-col gap-y-2">
            <Button variant={'ghost'} className="w-full flex justify-start" onClick={() => column.setFilterValue(undefined)}>
              Clear
            </Button>
            <Button variant={'ghost'} className="w-full flex justify-start" onClick={() => column.setFilterValue('Random User')}>
              Random User
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default TaskAssigneeHeader
