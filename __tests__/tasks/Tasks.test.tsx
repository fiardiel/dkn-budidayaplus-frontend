import Tasks from '@/components/tasks/Tasks'
import { Task } from '@/types/tasks'
import { render, screen, waitFor } from '@testing-library/react'
import { addDays, formatDate } from 'date-fns'
import { id } from 'date-fns/locale'

jest.mock('@/components/tasks', () => ({
  TaskStatus: ({ task }: { task: Task }) => <div data-testid={`task-status-${task.id}`}>TaskStatus</div>,
  TaskAssignee: ({ task }: { task: Task }) => <div data-testid={`task-assignee-${task.id}`}>TaskAssignee</div>
}))


describe('Tasks', () => {
  const mockTasks: Task[] = [
    {
      id: '1',
      task_type: 'Task 1',
      date: new Date(),
      assignee: 'Rafi',
      status: 'DONE',
      cycle_id: '1'
    },
    {
      id: '2',
      task_type: 'Task 2',
      date: addDays(new Date(), 1),
      assignee: 'Rafi',
      status: 'DONE',
      cycle_id: '1'
    },
  ]
  it('should render tasks', async () => {
    render(<Tasks tasks={mockTasks} />)

    await waitFor(() => {
      mockTasks.forEach((task) => {
        expect(screen.getByText(task.task_type)).toBeInTheDocument()
        expect(screen.getByTestId(`task-status-${task.id}`)).toBeInTheDocument()
        expect(screen.getByTestId(`task-assignee-${task.id}`)).toBeInTheDocument()
        expect(screen.getByText(formatDate(task.date, 'EEEE, dd MMMM yyyy', { locale: id }))).toBeInTheDocument()
      })
    })
  })

  it('should render when given an empty task array', async () => {
    render(<Tasks tasks={[]} />)

    await waitFor(() => {
      expect(screen.getByText('Tidak ada tugas')).toBeInTheDocument()
    })
  })
})
