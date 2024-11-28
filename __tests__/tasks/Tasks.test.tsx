import Tasks from '@/components/tasks/Tasks';
import { Task } from '@/types/tasks';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { addDays, format } from 'date-fns';
import { id } from 'date-fns/locale';

jest.mock('@/components/tasks', () => ({
  TaskStatus: ({ task, onStatusChange }: { task: Task; onStatusChange: (taskId: string, newStatus: string) => void }) => (
    <div data-testid={`task-status-${task.id}`} onClick={() => onStatusChange(task.id, task.status === 'DONE' ? 'TODO' : 'DONE')}>
      {task.status}
    </div>
  ),
  TaskAssignee: ({ task }: { task: Task }) => <div data-testid={`task-assignee-${task.id}`}>TaskAssignee</div>,
}));

jest.mock('@/lib/tasks', () => ({
  updateTaskStatus: jest.fn((taskId: string, newStatus: string) => Promise.resolve({ success: true })),
}));

describe('Tasks', () => {
  const mockTasks: Task[] = [
    {
      id: '1',
      task_type: 'Task 1',
      date: new Date(),
      assignee: 'Rafi',
      status: 'DONE',
      cycle_id: '1',
    },
    {
      id: '2',
      task_type: 'Task 2',
      date: addDays(new Date(), 1),
      assignee: 'Rafi',
      status: 'TODO',
      cycle_id: '1',
    },
  ];

  it('should render tasks with correct data', async () => {
    render(<Tasks tasks={mockTasks} />);

    await waitFor(() => {
      mockTasks.forEach((task) => {
        expect(screen.getByText(task.task_type)).toBeInTheDocument();
        expect(screen.getByTestId(`task-status-${task.id}`)).toBeInTheDocument();
        expect(screen.getByTestId(`task-assignee-${task.id}`)).toBeInTheDocument();
        expect(screen.getByText(format(new Date(task.date), 'EEEE, dd MMMM yyyy', { locale: id }))).toBeInTheDocument();
      });
    });
  });

  it('should render when given an empty task array', async () => {
    render(<Tasks tasks={[]} />);

    await waitFor(() => {
      expect(screen.getByText('Tidak ada tugas')).toBeInTheDocument();
    });
  });

  it('should handle status change correctly', async () => {
    const { updateTaskStatus } = require('@/lib/tasks');
    render(<Tasks tasks={mockTasks} />);

    const firstTaskStatus = screen.getByTestId('task-status-1');

    fireEvent.click(firstTaskStatus);

    await waitFor(() => {
      expect(updateTaskStatus).toHaveBeenCalledWith('1', 'TODO');
      expect(firstTaskStatus.textContent).toBe('TODO');
    });
  });

  it('should not update tasks if updateTaskStatus fails', async () => {
    const { updateTaskStatus } = require('@/lib/tasks');
    updateTaskStatus.mockImplementationOnce(() =>
      Promise.resolve({ success: false, message: 'Failed to update' })
    );
  
    render(<Tasks tasks={mockTasks} />);
  
    const secondTaskStatus = screen.getByTestId('task-status-2');
  
    fireEvent.click(secondTaskStatus);
  
    await waitFor(() => {
      expect(updateTaskStatus).toHaveBeenCalledWith('2', 'DONE');
  
      expect(secondTaskStatus.textContent).toBe('TODO');
    });
  });
});