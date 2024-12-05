import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Task } from "@/types/tasks"
import { Column } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { Profile } from '@/types/profile'
import { cn } from '@/lib/utils'

interface TaskAssigneeHeaderProps {
  column: Column<Task, unknown>
  workers: Profile[]
}

const TaskAssigneeHeader: React.FC<TaskAssigneeHeaderProps> = ({ column, workers }) => {
  const isFiltered = column.getIsFiltered()

  return (
    <div className="my-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'ghost'} className="flex items-center gap-2">
            Petugas <Filter className={cn("h-4 w-4", isFiltered && 'fill-current')} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <div className="flex flex-col gap-y-2">
            <Button variant={'ghost'} className="w-full flex justify-start" onClick={() => column.setFilterValue(undefined)}>
              Clear
            </Button>
            {workers.map(worker => (
              <Button
                key={worker.id}
                variant={'ghost'}
                className={cn("w-full flex justify-start", column.getFilterValue() === worker.user.phone_number && 'bg-primary-100')}
                onClick={() => column.setFilterValue(worker.user.phone_number)}
              >
                {worker.user.first_name} {worker.user.last_name}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default TaskAssigneeHeader
