import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Task } from "@/types/tasks"
import { Column } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { cn } from '@/lib/utils'

interface TaskTypeHeaderProps {
  column: Column<Task, unknown>
}

const TaskTypeHeader: React.FC<TaskTypeHeaderProps> = ({ column }) => {
  const filterButtons = [
    { label: 'Clear', value: undefined },
    { label: 'Pond Quality', value: 'Pond Quality' },
    { label: 'Fish Sampling', value: 'Fish Sampling' },
    { label: 'Food Sampling', value: 'Food Sampling' },
  ]
  const isFiltered = column.getIsFiltered()
  const filterValue = column.getFilterValue()

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'ghost'} className="flex items-center gap-2">
            <div className='flex items-center gap-1'>
              Tugas <Filter className={cn("h-4 w-4", isFiltered && 'fill-current')} />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <div className="flex flex-col gap-y-2">
            {filterButtons.map(button => (
              <Button
                key={button.label}
                variant={'ghost'}
                className={cn('flex w-full justify-start', button.value === filterValue && button.label !== 'Clear' && 'bg-primary-100')}
                onClick={() => column.setFilterValue(button.value)}
              >
                {button.label}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default TaskTypeHeader
