import { render, screen, fireEvent } from '@testing-library/react';
import TaskByDateCard from '@/components/tasks/TaskByDateCard';  
import { Task } from "@/types/tasks";
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('TaskByDateCard', () => {
  let task: Task;
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    task = {
      id: '1',
      task_type: 'Food Sampling',
      date: new Date(),
      status: 'In Progress',
      cycle_id: 'cycle_1',
      assignee: 'John Doe',
      pond: {
        pond_id: 'pond_1',
        name: 'Pond 1',
      },
    };
  });

  test('renders task details correctly', () => {
    render(<TaskByDateCard task={task} />);

    expect(screen.getByText('Sampling Makanan')).toBeInTheDocument();

    expect(screen.getByText('Status: In Progress')).toBeInTheDocument();
    expect(screen.getByText('Assigned to: John Doe')).toBeInTheDocument();
    expect(screen.getByText(`Date: ${task.date.toLocaleDateString()}`)).toBeInTheDocument();
    expect(screen.getByText('Pond: Pond 1')).toBeInTheDocument();
  });

  test('displays correct icon based on task type', () => {
    render(<TaskByDateCard task={{ ...task, task_type: 'Food Sampling' }} />);
    expect(screen.getByTestId('Utensils')).toBeInTheDocument();
    
    render(<TaskByDateCard task={{ ...task, task_type: 'Fish Sampling' }} />);
    expect(screen.getByTestId('FishSymbol')).toBeInTheDocument();

    render(<TaskByDateCard task={{ ...task, task_type: 'Pond Quality' }} />);
    expect(screen.getByTestId('WavesIcon')).toBeInTheDocument();
  });

  test('clicking on ChevronRight navigates to pond page', () => {
    render(<TaskByDateCard task={task} />);

    fireEvent.click(screen.getByLabelText('Navigate to pond'));

    expect(mockPush).toHaveBeenCalledWith('/pond/pond_1');
  });
});

