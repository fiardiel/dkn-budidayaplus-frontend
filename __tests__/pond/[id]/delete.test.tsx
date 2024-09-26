import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeletePond from '@/components/pond/DeletePond';
import { deletePond } from '@/lib/pond';

jest.mock('@/lib/pond', () => ({
  deletePond: jest.fn(),
}));

describe('DeletePond Component', () => {
  it('renders the delete button correctly', () => {
    render(<DeletePond pondId="pond1" />);
    expect(screen.getByRole('button', { name: /hapus kolam/i })).toBeInTheDocument();
  });

  it('calls the delete function when delete button is clicked', async () => {
    const mockDeletePond = jest.fn(() => Promise.resolve({ success: true }));
    (deletePond as jest.Mock).mockImplementationOnce(mockDeletePond);

    render(<DeletePond pondId="pond1" />); 
    const deleteButton = screen.getByRole('button', { name: /hapus kolam/i });

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeletePond).toHaveBeenCalledWith("pond1");
      expect(mockDeletePond).toHaveBeenCalledTimes(1);
    });
  });

  it('displays an error message if the delete request fails', async () => {
    const mockDeletePond = jest.fn(() => Promise.reject(new Error('Delete failed')));
    (deletePond as jest.Mock).mockImplementationOnce(mockDeletePond);

    render(<DeletePond pondId="pond1" />);
    const deleteButton = screen.getByRole('button', { name: /hapus kolam/i });

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to delete pond')).toBeInTheDocument();
    });
  });

  it('throws an error if the delete response is unsuccessful', async () => {
    const mockDeletePond = jest.fn(() => Promise.resolve({ success: false }));
    (deletePond as jest.Mock).mockImplementationOnce(mockDeletePond);

    render(<DeletePond pondId="pond1" />);
    const deleteButton = screen.getByRole('button', { name: /hapus kolam/i });

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to delete pond')).toBeInTheDocument();
    });
  });
});
