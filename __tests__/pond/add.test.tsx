import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import { AddPond } from '@/components/pond';
import { addPond } from '@/lib/pond';

jest.mock('@/lib/pond', () => ({
  addPond: jest.fn(),
}));

describe('Add Pond Modal', () => {
  beforeEach(() => {
    Object.defineProperty(document, 'cookie', {
      value: 'accessToken=mockAccessToken',
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form fields correctly', async () => {
    render(<AddPond />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /tambah kolam/i }));
    });

    expect(screen.getByPlaceholderText('Nama Kolam')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Panjang (meter)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Lebar (meter)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Kedalaman (meter)')).toBeInTheDocument();
  });

  it('closes the modal after successful form submission', async () => {

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      } as Response)
    );

    const mockResponse = { success: true, message: 'Pond created' };
    (addPond as jest.Mock).mockResolvedValue(mockResponse); 
    const file = new File(['(⌐□_□)'], 'pond.jpg', { type: 'image/jpg' });

    render(<AddPond />);

    fireEvent.click(screen.getByRole('button', { name: /tambah kolam/i }));

    fireEvent.change(screen.getByPlaceholderText('Nama Kolam'), { target: { value: 'Pond 4' } });
    fireEvent.change(screen.getByPlaceholderText('Panjang (meter)'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Lebar (meter)'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Kedalaman (meter)'), { target: { value: '5' } });
    fireEvent.change(screen.getByTestId('image'), { target: { files: [file] } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    jest.clearAllMocks();
  });

  it('displays error message when backend says pond creation failed', async () => {
    const mockResponse = { success: false, message: 'Failed to create pond' };
    (addPond as jest.Mock).mockResolvedValue(mockResponse);
    const file = new File(['(⌐□_□)'], 'pond.jpg', { type: 'image/jpg' });

    render(<AddPond />);

    fireEvent.click(screen.getByRole('button', { name: /tambah kolam/i }));

    fireEvent.change(screen.getByPlaceholderText('Nama Kolam'), { target: { value: 'Pond 4' } });
    fireEvent.change(screen.getByPlaceholderText('Panjang (meter)'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Lebar (meter)'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Kedalaman (meter)'), { target: { value: '5' } });
    fireEvent.change(screen.getByTestId('image'), { target: { files: [file] } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    await waitFor(() => {
      expect(screen.getByText('Gagal menyimpan kolam')).toBeInTheDocument();
    });
  })

  it('displays error message and sets error state when form submission fails', async () => {
    const mockError = new Error('Gagal menambahkan kolam');
    const file = new File(['(⌐□_□)'], 'pond.jpg', { type: 'image/jpg' });
    (addPond as jest.Mock).mockRejectedValueOnce(mockError);

    render(<AddPond />);

    fireEvent.click(screen.getByText(/tambah kolam/i));

    fireEvent.change(screen.getByPlaceholderText('Nama Kolam'), { target: { value: 'Pond 5' } });
    fireEvent.change(screen.getByPlaceholderText('Panjang (meter)'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Lebar (meter)'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Kedalaman (meter)'), { target: { value: '5' } });
    fireEvent.change(screen.getByTestId('image'), { target: { files: [file] } });

    fireEvent.click(screen.getByRole('button', { name: /simpan/i }));

    await waitFor(() => {
      expect(screen.getByText('Gagal menyimpan kolam')).toBeInTheDocument();
    });
  });

  it('doesnt allow form submission when any of the fields are invalid', async () => {
    render(<AddPond />);

    fireEvent.click(screen.getByText(/tambah kolam/i));

    fireEvent.change(screen.getByPlaceholderText('Nama Kolam'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Panjang (meter)'), { target: { value: '2' } });
    fireEvent.change(screen.getByPlaceholderText('Lebar (meter)'), { target: { value: '0' } });
    fireEvent.change(screen.getByPlaceholderText('Kedalaman (meter)'), { target: { value: '-1' } });

    fireEvent.click(screen.getByRole('button', { name: /simpan/i }));

    await waitFor(() => {
      expect(screen.getByText('Nama kolam harus diisi')).toBeInTheDocument();
      expect(screen.getByText('Lebar harus berupa angka positif')).toBeInTheDocument();
      expect(screen.getByText('Kedalaman harus berupa angka positif')).toBeInTheDocument();
      expect(addPond).not.toHaveBeenCalled();
    });
  });
});
