import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Task } from "@/types/tasks"
import { Column } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Filter } from "lucide-react"

interface TaskDateHeaderProps {
  column: Column<Task, unknown>
}

const TaskDateHeader: React.FC<TaskDateHeaderProps> = ({ column }) => {
  return (
    <div className="flex items-center">
      <p>Tanggal</p>
      <Button
        variant={'ghost'}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        size={'icon'}
        aria-label="Sort by date"
      >
        <ArrowUpDown className="h-4 w-4" />
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'ghost'} size={'icon'} aria-label='Filter' className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <div className="flex flex-col gap-y-2">
            <Button variant={'ghost'} className='flex w-full justify-start' onClick={() => column.setFilterValue(undefined)}>
              Clear
            </Button>
            <Button variant={'ghost'} className="flex w-full justify-start" onClick={() => column.setFilterValue('past')}>
              Past
            </Button>
            <Button variant={'ghost'} className="flex w-full justify-start" onClick={() => column.setFilterValue('upcoming')}>
              Upcoming
            </Button>
            <Button variant={'ghost'} className="flex w-full justify-start" onClick={() => column.setFilterValue('today')}>
              Today
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default TaskDateHeader
