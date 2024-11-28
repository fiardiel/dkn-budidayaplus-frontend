import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskAssigneeHeader from '@/components/tasks/TaskAssigneeHeader';
import { Column } from '@tanstack/react-table';

const mockSetFilterValue = jest.fn();
const mockColumn: Column<any, any> = {
  id: 'assignee',
  header: 'Assignee',
  getCanFilter: () => true,
  setFilterValue: mockSetFilterValue,
} as unknown as Column<any, any>;

describe('TaskAssigneeHeader', () => {
  it('renders correctly', () => {
    render(<TaskAssigneeHeader column={mockColumn} />);

    expect(screen.getByText('Petugas')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('flex items-center gap-2');
  });

  it('opens the popover when the button is clicked', async () => {
    render(<TaskAssigneeHeader column={mockColumn} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => expect(screen.getByText('Clear')).toBeInTheDocument());
    expect(screen.getByText('Random User')).toBeInTheDocument();
  });

  it('calls setFilterValue when "Clear" is clicked', async () => {
    render(<TaskAssigneeHeader column={mockColumn} />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Clear'));

    // Check if the filter value is cleared
    expect(mockSetFilterValue).toHaveBeenCalledWith(undefined);
  });

  it('calls setFilterValue when "Random User" is clicked', async () => {
    render(<TaskAssigneeHeader column={mockColumn} />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Random User'));

    expect(mockSetFilterValue).toHaveBeenCalledWith('Random User');
  });
});
