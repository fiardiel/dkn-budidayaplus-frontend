import { screen, render, waitFor } from '@testing-library/react'
import SortedTasksTable from '@/components/tasks/SortedTasksTable'
import { fetchTasksSorted } from '@/lib/tasks'
import { TaskSorted } from '@/types/tasks'

jest.mock('@/lib/tasks', () => ({
  fetchTasksSorted: jest.fn()
}))

jest.mock('@/components/tasks', () => ({
  Tasks: () => <div data-testid='tasks'>Tasks</div>
}))

describe('SortedTasksTable', () => {
  it('should render the tasks component', async () => {
    const mockTasks = { upcoming: [{ id: '1' }, { id: '2' }], past: [{ id: '3' }, { id: '4' }] };
    (fetchTasksSorted as jest.Mock).mockResolvedValue(mockTasks)

    render(<SortedTasksTable tasks={mockTasks as TaskSorted} />)

    await waitFor(() => {
      expect(screen.getByText('Tugas Mendatang')).toBeInTheDocument()
      expect(screen.getByText('Tugas Lalu')).toBeInTheDocument()
      expect(screen.getAllByTestId('tasks')).toHaveLength(2)
    })
  })
})
