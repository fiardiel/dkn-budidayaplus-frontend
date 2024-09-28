import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeletePond from '@/components/pond/DeletePond';
import { deletePond } from '@/lib/pond';

jest.mock('@/lib/pond', () => ({
  deletePond: jest.fn(),
}));

describe('DeletePond Component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '' }
    });
  });

  it('renders the delete button correctly', () => {
    render(<DeletePond pondId="pond1" />);
    expect(screen.getByRole('button', { name: /hapus kolam/i })).toBeInTheDocument();
  });

  it('opens a modal when delete button is clicked', () => {
    render(<DeletePond pondId="pond1" />);
    fireEvent.click(screen.getByRole('button', { name: /hapus kolam/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/hapus kolam\?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /hapus/i })).toBeInTheDocument();
  })

  it('closes the dialog when x button is pressed', () => {
    render(<DeletePond pondId="pond1" />);
    fireEvent.click(screen.getByRole('button', { name: /hapus kolam/i }));
    expect(screen.getByText(/hapus kolam\?/i)).toBeInTheDocument();
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  })

  it('closes the dialog when area outside the dialog is clicked', () => { 
    render(<DeletePond pondId="pond1" />);
    fireEvent.click(screen.getByRole('button', { name: /hapus kolam/i }));
    expect(screen.getByText(/hapus kolam\?/i)).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument
  })

  it('calls the deletePond function when delete button is clicked and redirected', async () => {
    (deletePond as jest.Mock).mockResolvedValue(true);
    render(<DeletePond pondId="pond1" />);
    fireEvent.click(screen.getByRole('button', { name: /hapus kolam/i }));
    fireEvent.click(screen.getByRole('button', { name: /hapus/i }));
    await waitFor(() => {
      expect(deletePond).toHaveBeenCalledWith('pond1');
      expect(window.location.href).toBe('/pond');
    });
  })

  it('shows error message when deletePond function fails', async () => {
    (deletePond as jest.Mock).mockRejectedValue(new Error('Delete pond failed'));
    render(<DeletePond pondId="pond1" />);
    fireEvent.click(screen.getByRole('button', { name: /hapus kolam/i }));
    fireEvent.click(screen.getByRole('button', { name: /hapus/i }));
    await waitFor(() => {
      expect(deletePond).toHaveBeenCalledWith('pond1');
      expect(screen.getByText('Gagal menghapus kolam')).toBeInTheDocument();
    });
  })

  it('shows fail message when deletePond function returns false', async () => {
    (deletePond as jest.Mock).mockResolvedValue(false);
    render(<DeletePond pondId="pond1" />);
    fireEvent.click(screen.getByRole('button', { name: /hapus kolam/i }));
    fireEvent.click(screen.getByRole('button', { name: /hapus/i }));
    await waitFor(() => {
      expect(deletePond).toHaveBeenCalledWith('pond1');
      expect(screen.getByText('Gagal menghapus kolam')).toBeInTheDocument();
    });
  })
});
