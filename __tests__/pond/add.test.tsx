import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import AddPond from '@/components/pond/AddPond';
import { addPond } from '@/lib/pond';
import fetchMock from 'jest-fetch-mock';

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
    expect(screen.getByPlaceholderText('Nama Gambar')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Panjang (meter)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Lebar (meter)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tinggi (meter)')).toBeInTheDocument();
  });

  it('does not submit the form if no token is found', async () => {
    Object.defineProperty(document, 'cookie', {
      value: '',
      writable: true,
    });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    fetchMock.mockReject(new Error('No token found'));

    render(<AddPond />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /tambah kolam/i }));
    });

    fireEvent.change(screen.getByPlaceholderText('Nama Kolam'), { target: { value: 'Pond 4' } });
    fireEvent.change(screen.getByPlaceholderText('Nama Gambar'), { target: { value: 'pond4.jpg' } });
    fireEvent.change(screen.getByPlaceholderText('Panjang (meter)'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Lebar (meter)'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Tinggi (meter)'), { target: { value: '5' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('No token found');
      expect(addPond).not.toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });

  it('closes the modal after successful form submission', async () => {

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      } as Response)
    );

    const mockResponse = { success: true, message: 'Pond created' };
    (addPond as jest.Mock).mockResolvedValue(mockResponse);  // Mock success response

    const mockToken = 'mockAccessToken';

    render(<AddPond token={mockToken} />);

    fireEvent.click(screen.getByRole('button', { name: /tambah kolam/i }));

    fireEvent.change(screen.getByPlaceholderText('Nama Kolam'), { target: { value: 'Pond 4' } });
    fireEvent.change(screen.getByPlaceholderText('Nama Gambar'), { target: { value: 'pond4.jpg' } });
    fireEvent.change(screen.getByPlaceholderText('Panjang (meter)'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Lebar (meter)'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Tinggi (meter)'), { target: { value: '5' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    jest.clearAllMocks();
  });

  it('displays error message and sets error state when form submission fails', async () => {
    const mockError = new Error('Failed to create pond');
    (addPond as jest.Mock).mockRejectedValueOnce(mockError); // Mock error

    const mockToken = 'mockAccessToken';

    render(<AddPond token={mockToken} />);

    // Open the modal
    fireEvent.click(screen.getByText(/tambah kolam/i));

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Nama Kolam'), { target: { value: 'Pond 5' } });
    fireEvent.change(screen.getByPlaceholderText('Nama Gambar'), { target: { value: 'pond5.jpg' } });
    fireEvent.change(screen.getByPlaceholderText('Panjang (meter)'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Lebar (meter)'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Tinggi (meter)'), { target: { value: '5' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Failed to create pond')).toBeInTheDocument();
    });
  });
});
