import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskTypeHeader from '@/components/tasks/TaskTypeHeader';
import { Column } from '@tanstack/react-table';

const mockSetFilterValue = jest.fn();
const mockColumn: Column<any, any> = {
  id: 'taskType',
  header: 'Task Type',
  setFilterValue: mockSetFilterValue,
} as unknown as Column<any, any>;

describe('TaskTypeHeader', () => {
  it('renders correctly', () => {
    render(<TaskTypeHeader column={mockColumn} />);
    expect(screen.getByRole('button', { name: /tugas/i })).toBeInTheDocument();
  });

  it('opens the popover when the filter button is clicked', async () => {
    render(<TaskTypeHeader column={mockColumn} />);
    fireEvent.click(screen.getByRole('button', { name: /tugas/i }));
    await waitFor(() => expect(screen.getByText('Clear')).toBeInTheDocument());
    expect(screen.getByText('Pond Quality')).toBeInTheDocument();
    expect(screen.getByText('Fish Sampling')).toBeInTheDocument();
    expect(screen.getByText('Food Sampling')).toBeInTheDocument();
  });

  it('calls setFilterValue with "Pond Quality" when the Pond Quality button is clicked', async () => {
    render(<TaskTypeHeader column={mockColumn} />);
    fireEvent.click(screen.getByRole('button', { name: /tugas/i }));
    fireEvent.click(screen.getByText('Pond Quality'));
    expect(mockSetFilterValue).toHaveBeenCalledWith('Pond Quality');
  });

  it('calls setFilterValue with "Fish Sampling" when the Fish Sampling button is clicked', async () => {
    render(<TaskTypeHeader column={mockColumn} />);
    fireEvent.click(screen.getByRole('button', { name: /tugas/i }));
    fireEvent.click(screen.getByText('Fish Sampling'));
    expect(mockSetFilterValue).toHaveBeenCalledWith('Fish Sampling');
  });

  it('calls setFilterValue with "Food Sampling" when the Food Sampling button is clicked', async () => {
    render(<TaskTypeHeader column={mockColumn} />);
    fireEvent.click(screen.getByRole('button', { name: /tugas/i }));
    fireEvent.click(screen.getByText('Food Sampling'));
    expect(mockSetFilterValue).toHaveBeenCalledWith('Food Sampling');
  });

  it('calls setFilterValue with undefined when the Clear button is clicked', async () => {
    render(<TaskTypeHeader column={mockColumn} />);
    fireEvent.click(screen.getByRole('button', { name: /tugas/i }));
    fireEvent.click(screen.getByText('Clear'));
    expect(mockSetFilterValue).toHaveBeenCalledWith(undefined);
  });
});
