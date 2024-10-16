import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { EditPond } from '@/components/pond';
import { addOrUpdatePond } from '@/lib/pond';

jest.mock('@/lib/pond', () => ({
  addOrUpdatePond: jest.fn(),
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('opens the modal when the edit button is clicked', async () => {
    render(<EditPond pond={mockPondData} />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /edit kolam/i }));
    });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  })

  it('renders the form fields correctly', async () => {
    render(<EditPond pond={mockPondData} />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /edit kolam/i }));
    });

    expect(screen.getByPlaceholderText('Nama Kolam')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Panjang (meter)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Lebar (meter)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Kedalaman (meter)')).toBeInTheDocument();
    expect(screen.getByTestId('image')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /simpan/i })).toBeInTheDocument();
  });

  it('closes the modal when the close button is clicked', async () => {
    render(<EditPond pond={mockPondData} />);

    fireEvent.click(screen.getByRole('button', { name: /edit kolam/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('closes the modal after successful form submission', async () => {
    const mockResponse = { success: true };
    (addOrUpdatePond as jest.Mock).mockResolvedValue(mockResponse);

    render(<EditPond pond={mockPondData} />);

    fireEvent.click(screen.getByRole('button', { name: /edit kolam/i }));

    const nameInput = screen.getByPlaceholderText('Nama Kolam');
    const lengthInput = screen.getByPlaceholderText('Panjang (meter)');
    const widthInput = screen.getByPlaceholderText('Lebar (meter)');
    const depthInput = screen.getByPlaceholderText('Kedalaman (meter)');
    const imageInput = screen.getByTestId('image');

    fireEvent.change(nameInput, { target: { value: 'Updated Pond' } });
    fireEvent.change(lengthInput, { target: { value: '15' } });
    fireEvent.change(widthInput, { target: { value: '7' } });
    fireEvent.change(depthInput, { target: { value: '3' } });
    fireEvent.change(imageInput, { target: { files: [new File(['(⌐□_□)'], 'pond.jpg', { type: 'image/jpg' })] } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    await waitFor(() => {
      expect(addOrUpdatePond).toHaveBeenCalledWith(
        expect.any(Object),
        mockPondData.pond_id,
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('displays error message when form submission fails due to an error on the backend', async () => {
    const mockResponse = { success: false, message: 'Gagal menyimpan kolam' };
    (addOrUpdatePond as jest.Mock).mockResolvedValue(mockResponse);

    render(<EditPond pond={mockPondData} />);

    fireEvent.click(screen.getByRole('button', { name: /edit kolam/i }));

    const nameInput = screen.getByPlaceholderText('Nama Kolam');
    const lengthInput = screen.getByPlaceholderText('Panjang (meter)');
    const widthInput = screen.getByPlaceholderText('Lebar (meter)');
    const depthInput = screen.getByPlaceholderText('Kedalaman (meter)');
    const imageInput = screen.getByTestId('image');

    fireEvent.change(nameInput, { target: { value: 'Updated Pond' } });
    fireEvent.change(lengthInput, { target: { value: '15' } });
    fireEvent.change(widthInput, { target: { value: '7' } });
    fireEvent.change(depthInput, { target: { value: '3' } });
    fireEvent.change(imageInput, { target: { files: [new File(['(⌐□_□)'], 'pond.jpg', { type: 'image/jpg' })] } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/Gagal menyimpan kolam/i)).toBeInTheDocument();
      expect(addOrUpdatePond).toHaveBeenCalledTimes(1);
    });
  })

  it('displays error message and sets error state when form submission fails', async () => {
    const mockError = new Error('Gagal menyimpan kolam');
    (addOrUpdatePond as jest.Mock).mockRejectedValueOnce(mockError);

    render(<EditPond pond={mockPondData} />);

    fireEvent.click(screen.getByRole('button', { name: /edit kolam/i }));

    const nameInput = screen.getByPlaceholderText('Nama Kolam');

    fireEvent.change(nameInput, { target: { value: 'Updated Pond' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/Gagal menyimpan kolam/i)).toBeInTheDocument();
      expect(addOrUpdatePond).toHaveBeenCalledTimes(1);
    });
  });

  it("it doesn't allow form submission when any of the fields are invalid", async () => {
    render(<EditPond pond={mockPondData} />);

    fireEvent.click(screen.getByRole('button', { name: /edit kolam/i }));

    const nameInput = screen.getByPlaceholderText('Nama Kolam');
    const lengthInput = screen.getByPlaceholderText('Panjang (meter)');
    const widthInput = screen.getByPlaceholderText('Lebar (meter)');
    const depthInput = screen.getByPlaceholderText('Kedalaman (meter)');

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(lengthInput, { target: { value: '2' } });
    fireEvent.change(widthInput, { target: { value: '0' } });
    fireEvent.change(depthInput, { target: { value: '-1' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    expect('Nama Kolam harus diisi')
    expect('Lebar harus berupa angka positif')
    expect('Kedalaman harus berupa angka positif')

    expect(addOrUpdatePond).not.toHaveBeenCalled();
  });
});