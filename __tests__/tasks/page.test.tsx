import TasksPage from '@/app/task/page';
import { fetchTasks, fetchTasksSorted } from '@/lib/tasks';
import { render, screen, waitFor } from '@testing-library/react';

jest.mock('@/lib/tasks', () => ({
  fetchTasksSorted: jest.fn()
}))

jest.mock('@/components/tasks', () => ({
  SortedTasksTable: () => <div data-testid='tasks'>Tasks</div>
}))

describe('Tasks Page', () => {
  it('should render the tasks component', async () => {
    const mockTasks = { upcoming: [{ id: '1' }, { id: '2' }], past: [{ id: '3' }, { id: '4' }] };
    (fetchTasksSorted as jest.Mock).mockResolvedValue(mockTasks)

    const ui = await TasksPage()
    render(ui)

    await waitFor(() => {
      expect(screen.getByTestId('tasks')).toBeInTheDocument()
    })
  })

  it('should render an empty tasks component', async () => {
    (fetchTasksSorted as jest.Mock).mockResolvedValue({ upcoming: [], past: [] })

    const ui = await TasksPage()
    render(ui)

    await waitFor(() => {
      expect(screen.getByTestId('tasks')).toBeInTheDocument()
    })
  })
})
