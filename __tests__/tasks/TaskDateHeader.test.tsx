import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskDateHeader from '@/components/tasks/TaskDateHeader';
import { Column } from '@tanstack/react-table';

const mockToggleSorting = jest.fn();
const mockSetFilterValue = jest.fn();
const mockColumn: Column<any, any> = {
  id: 'date',
  header: 'Date',
  getCanSort: () => true,
  getIsSorted: () => 'asc',
  toggleSorting: mockToggleSorting,
  setFilterValue: mockSetFilterValue,
} as unknown as Column<any, any>;

describe('TaskDateHeader', () => {
  it('renders correctly', () => {
    render(<TaskDateHeader column={mockColumn} />);
    expect(screen.getByText('Tanggal')).toBeInTheDocument();
  });

  it('toggles sorting when the sort button is clicked', () => {
    render(<TaskDateHeader column={mockColumn} />);
    fireEvent.click(screen.getByLabelText('Sort by date'));
    expect(mockToggleSorting).toHaveBeenCalledWith(true);
  });

  it('opens the popover when the filter button is clicked', async () => {
    render(<TaskDateHeader column={mockColumn} />);
    fireEvent.click(screen.getByLabelText('Filter'));
    await waitFor(() => expect(screen.getByText('Clear')).toBeInTheDocument());
  });

  it('calls setFilterValue with "past" when the Past button is clicked', async () => {
    render(<TaskDateHeader column={mockColumn} />);
    fireEvent.click(screen.getByLabelText('Filter'));
    fireEvent.click(screen.getByText('Past'));
    expect(mockSetFilterValue).toHaveBeenCalledWith('past');
  });

  it('calls setFilterValue with "upcoming" when the Upcoming button is clicked', async () => {
    render(<TaskDateHeader column={mockColumn} />);
    fireEvent.click(screen.getByLabelText('Filter'));
    fireEvent.click(screen.getByText('Upcoming'));
    expect(mockSetFilterValue).toHaveBeenCalledWith('upcoming');
  });

  it('calls setFilterValue with "today" when the Today button is clicked', async () => {
    render(<TaskDateHeader column={mockColumn} />);
    fireEvent.click(screen.getByLabelText('Filter'));
    fireEvent.click(screen.getByText('Today'));
    expect(mockSetFilterValue).toHaveBeenCalledWith('today');
  });

  it('calls setFilterValue with undefined when the Clear button is clicked', async () => {
    render(<TaskDateHeader column={mockColumn} />);
    fireEvent.click(screen.getByLabelText('Filter'));
    fireEvent.click(screen.getByText('Clear'));
    expect(mockSetFilterValue).toHaveBeenCalledWith(undefined);
  });
});
