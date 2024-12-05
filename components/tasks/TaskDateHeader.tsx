import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Task } from "@/types/tasks"
import { Column } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Filter } from "lucide-react"
import { cn } from '@/lib/utils'

interface TaskDateHeaderProps {
  column: Column<Task, unknown>
}

const TaskDateHeader: React.FC<TaskDateHeaderProps> = ({ column }) => {
  const isFiltered = column.getIsFiltered()
  const filterValue = column.getFilterValue()
  const filterButtons = [
    { label: 'Clear', value: undefined },
    { label: 'Past', value: 'past' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Today', value: 'today' },
  ]
  return (
    <div className="flex items-center">
      <p>Tanggal</p>
      <Button
        variant={'ghost'}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        size={'icon'}
        aria-label="Sort by date"
      >
        <ArrowUpDown className='h-4 w-4' />
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'ghost'} size={'icon'} aria-label='Filter' className="flex items-center gap-2">
            <div>
              <Filter className={cn("h-4 w-4", isFiltered && 'fill-current')} />
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

export default TaskDateHeader
