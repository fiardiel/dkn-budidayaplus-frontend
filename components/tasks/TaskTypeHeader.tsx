import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Task } from "@/types/tasks"
import { Column } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

interface TaskTypeHeaderProps {
  column: Column<Task, unknown>
}

const TaskTypeHeader: React.FC<TaskTypeHeaderProps> = ({ column }) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'ghost'} className="flex items-center gap-2">
            Tugas <Filter className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <div className="flex flex-col gap-y-2">
            <Button variant={'ghost'} className='flex w-full justify-start' onClick={() => column.setFilterValue(undefined)}>
              Clear
            </Button>
            <Button variant={'ghost'} className='flex w-full justify-start' onClick={() => column.setFilterValue('Pond Quality')}>
              Pond Quality
            </Button>
            <Button variant={'ghost'} className='flex w-full justify-start' onClick={() => column.setFilterValue('Fish Sampling')}>
              Fish Sampling
            </Button>
            <Button variant={'ghost'} className='flex w-full justify-start' onClick={() => column.setFilterValue('Food Sampling')}>
              Food Sampling
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default TaskTypeHeader
