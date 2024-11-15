import { TaskAssignee } from '@/components/tasks';
import { render, screen, waitFor } from '@testing-library/react';

describe('TaskAssignee', () => {
  it('should render the assignee', async () => {
    const mockTask = {
      id: '1',
      task_type: 'Task 1',
      date: new Date(),
      assignee: 'Rafi',
      status: 'DONE',
      cycle_id: '1'
    }
    render(<TaskAssignee task={mockTask} />)

    await waitFor(() => {
      expect(screen.getByText('Rafi')).toBeInTheDocument()
    })
  })
})