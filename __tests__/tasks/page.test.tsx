import TasksPage from '@/app/task/page';
import { fetchTasks } from '@/lib/tasks';
import { render, screen, waitFor } from '@testing-library/react';

jest.mock('@/lib/tasks', () => ({
  fetchTasks: jest.fn()
}))

jest.mock('@/components/tasks', () => ({
  Tasks: () => <div data-testid='tasks'>Tasks</div>
}))

describe('Tasks Page', () => {
  it('should render the tasks component', async () => {
    const mockTasks = [{ id: '1' }, { id: '2' }];
    (fetchTasks as jest.Mock).mockResolvedValue(mockTasks)

    const ui = await TasksPage()
    render(ui)

    await waitFor(() => {
      expect(screen.getByTestId('tasks')).toBeInTheDocument()
    })
  })

  it('should render an empty tasks component', async () => {
    (fetchTasks as jest.Mock).mockResolvedValue([])

    const ui = await TasksPage()
    render(ui)

    await waitFor(() => {
      expect(screen.getByTestId('tasks')).toBeInTheDocument()
    })
  })
})
