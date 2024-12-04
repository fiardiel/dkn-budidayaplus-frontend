import { TaskAssignee } from '@/components/tasks'
import { render, screen, waitFor } from '@testing-library/react'
import * as tasksLib from '@/lib/tasks' 

jest.mock('@/lib/tasks', () => ({
  fetchAssignee: jest.fn() 
}))

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

    ;(tasksLib.fetchAssignee as jest.Mock).mockResolvedValue(mockTask)

    render(<TaskAssignee task={mockTask} />)

    await waitFor(() => {
      expect(screen.getByText('Rafi')).toBeInTheDocument()
    })
  })

  it('should render "No assignee" when there is no assignee', async () => {
    const mockTask = {
      id: '2',
      task_type: 'Task 2',
      date: new Date(),
      assignee: '',
      status: 'TODO',
      cycle_id: '2'
    }

    ;(tasksLib.fetchAssignee as jest.Mock).mockResolvedValue(mockTask)

    render(<TaskAssignee task={mockTask} />)

    await waitFor(() => {
      expect(screen.getByText('No assignee')).toBeInTheDocument()
    })
  })
})
