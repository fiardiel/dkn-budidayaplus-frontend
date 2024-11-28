import TasksPage from '@/app/task/page';
import { fetchTasks } from '@/lib/tasks';
import { Task } from '@/types/tasks';
import { render, screen, waitFor } from '@testing-library/react';

jest.mock('@/lib/tasks', () => ({
  fetchTasks: jest.fn()
}))

jest.mock('@/components/ui/data-table', () => ({
  DataTable: () => <div data-testid='dataTable'>Data table</div >
}))

describe('Tasks Page', () => {
  it('should render the tasks component', async () => {
    const mockTasks = [{ id: 1 }, { id: 2 }, { id: 3 }];
    (fetchTasks as jest.Mock).mockResolvedValue(mockTasks)

    const ui = await TasksPage()
    render(ui)

    await waitFor(() => {
      expect(screen.getByText(/daftar tugas/i)).toBeInTheDocument()
      expect(screen.getByTestId('dataTable')).toBeInTheDocument()
    })
  })

  it('should render an empty tasks component', async () => {
    const mockTasks: Task[] = [];
    (fetchTasks as jest.Mock).mockResolvedValue(mockTasks)

    const ui = await TasksPage()
    render(ui)

    await waitFor(() => {
      expect(screen.getByText(/daftar tugas/i)).toBeInTheDocument()
      expect(screen.getByTestId('dataTable')).toBeInTheDocument()
    })
  })
})
