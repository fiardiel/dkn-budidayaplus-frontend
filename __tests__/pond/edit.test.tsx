import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import EditPond from '@/components/pond/EditPond'; // Adjust the import path as necessary
import { updatePond } from '@/lib/pond';

jest.mock('@/lib/pond', () => ({
  updatePond: jest.fn(),
}));

describe('Edit Pond Modal', () => {
  const mockPondData = {
    pond_id: '1',
    name: 'Kolam Obin',
    image_name: 'Foto_Obin.jpg',
    length: 10,
    width: 5,
    depth: 2,
  };

  const mockToken = 'mockAccessToken';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form fields correctly', async () => {
    render(<EditPond token={mockToken} pondData={mockPondData} />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /edit kolam/i }));
    });

    expect(screen.getByPlaceholderText('Nama Kolam')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nama Gambar')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Panjang (meter)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Lebar (meter)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tinggi (meter)')).toBeInTheDocument();
  });

  it('closes the modal when the close button is clicked', async () => {
    render(<EditPond token={mockToken} pondData={mockPondData} />);

    fireEvent.click(screen.getByRole('button', { name: /edit kolam/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('does not submit the form if no token is found', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    render(<EditPond pondData={mockPondData} />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /edit kolam/i }));
    });

    fireEvent.change(screen.getByPlaceholderText('Nama Kolam'), { target: { value: 'Updated Pond' } });
    
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /save changes/i }));
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('No token found');
      expect(updatePond).not.toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });

  it('closes the modal after successful form submission', async () => {
    const mockResponse = { success: true };
    (updatePond as jest.Mock).mockResolvedValue(mockResponse);

    render(<EditPond token={mockToken} pondData={mockPondData} />);

    fireEvent.click(screen.getByRole('button', { name: /edit kolam/i }));

    fireEvent.change(screen.getByPlaceholderText('Nama Kolam'), { target: { value: 'Updated Pond' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /save changes/i }));
    });

    await waitFor(() => {
      expect(updatePond).toHaveBeenCalledWith(
        mockPondData.pond_id,
        expect.any(Object),
        mockToken
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('displays error message and sets error state when form submission fails', async () => {
    const mockError = new Error('Failed to update pond');
    (updatePond as jest.Mock).mockRejectedValueOnce(mockError);

    render(<EditPond token={mockToken} pondData={mockPondData} />);

    fireEvent.click(screen.getByRole('button', { name: /edit kolam/i }));

    fireEvent.change(screen.getByPlaceholderText('Nama Kolam'), { target: { value: 'Updated Pond' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /save changes/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/failed to update pond/i)).toBeInTheDocument();
      expect(updatePond).toHaveBeenCalledTimes(1);
    });
  });
});