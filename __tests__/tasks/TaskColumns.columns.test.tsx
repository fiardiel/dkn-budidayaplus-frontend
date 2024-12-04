import { render, act, screen, fireEvent } from '@testing-library/react'
import { DataTable } from '@/components/ui/data-table'
import { columns, determinePeriod } from '@/components/tasks/TaskColumns'
import { Task } from '@/types/tasks'
import { ColumnDef } from '@tanstack/react-table'

jest.mock('@/components/tasks', () => ({
  TaskStatus: () => <div data-testid="task-status">Status</div>,
  TaskTypeHeader: () => <div data-testid="task-type-header">Type</div>,
  TaskDateHeader: () => <div data-testid="task-date-header">Date</div>,
  TaskAssigneeHeader: () => <div data-testid="task-assignee-header">Assignee</div>,
  TaskAssignee: () => <div data-testid="task-assignee">Assignee</div>,
}))


const mockData: Task[] = [
  {
    id: '1',
    task_type: 'Pond Quality',
    status: "TODO",
    date: new Date('2024-10-03'),
    assignee: 'John Pork',
    cycle_id: '1'
  },
  {
    id: '2',
    task_type: 'Fish Sampling',
    status: "TODO",
    date: new Date('2024-10-03'),
    assignee: 'John Pork',
    cycle_id: '1'
  },
  {
    id: '3',
    task_type: 'Food Sampling',
    status: "TODO",
    date: new Date('2024-10-03'),
    assignee: 'John Pork',
    cycle_id: '1'
  },
]

describe('Task Table', () => {
  it('should render the cells properly', () => {
    render(<DataTable columns={columns} data={mockData} />);

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(mockData.length + 1);

    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(columns.length * mockData.length);

    expect(screen.getAllByTestId('task-status').length).toBe(mockData.length);
    expect(screen.getByTestId('task-type-header')).toHaveTextContent('Type');
    expect(screen.getByTestId('task-date-header')).toHaveTextContent('Date');
    expect(screen.getByTestId('task-assignee-header')).toHaveTextContent('Assignee');
    expect(screen.getAllByTestId('task-assignee').length).toBe(mockData.length);
  })

  it('should filter using filterFn correctly', async () => {
    const dateColumn = columns[1]
    const dateFilterFn = (dateColumn.filterFn as Function)

    const mockRow = {
      getValue: jest.fn(() => new Date()),
    }
    const result = dateFilterFn(mockRow, 'date', 'today')
    expect(result).toBe(true)
  })

  it('should not filter anything when filter value for date is not defined', () => {
    const dateColumn = columns[1]
    const dateFilterFn = (dateColumn.filterFn as Function)

    const mockRow = {
      getValue: jest.fn(() => new Date()),
    }
    const result = dateFilterFn(mockRow, 'date', undefined)
    expect(result).toBe(true)
  })
})
