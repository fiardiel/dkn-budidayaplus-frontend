import { TaskStatus } from '@/components/tasks';
import { render, screen, waitFor } from '@testing-library/react';

describe('TaskStatus', () => {
  it('should render the done status', async () => {
    const mockTask = {
      id: '1',
      task_type: 'Task 1',
      date: new Date(),
      assignee: 'Rafi',
      status: 'DONE',
      cycle_id: '1'
    }
    render(<TaskStatus task={mockTask} />)

    await waitFor(() => {
      expect(screen.getByText('DONE')).toBeInTheDocument()
    })
  })

  it('should render the todo status', async () => {
    const mockTask = {
      id: '1',
      task_type: 'Task 1',
      date: new Date(),
      assignee: 'Rafi',
      status: 'TODO',
      cycle_id: '1'
    }
    render(<TaskStatus task={mockTask} />)

    await waitFor(() => {
      expect(screen.getByText('TODO')).toBeInTheDocument()
    })
  })
})