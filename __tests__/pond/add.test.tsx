import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AddPond from '@/components/pond/AddPond';
import { addPond } from '@/lib/pond';
import { cookies } from 'next/headers';

jest.mock('@/lib/pond', () => ({
  addPond: jest.fn(),
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

describe('Add Pond Modal', () => {
  beforeEach(() => {
    // Mock the cookies to return a valid access token
    (cookies as jest.Mock).mockReturnValue({
      get: jest.fn(() => ({ value: 'mockAccessToken' })),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form fields correctly', async () => {
    render(<AddPond />);

    // Open the modal
    fireEvent.click(screen.getByRole('button', { name: /Tambah Kolam/i }));

    // Check if form fields are rendered
    expect(screen.getByPlaceholderText('Nama Kolam')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nama Gambar')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Volume Kolam')).toBeInTheDocument();
  });

  it('submits the form and resets it after adding pond', async () => {
    const mockResponse = { id: 'abcdef', name: 'Pond 4' };
    (addPond as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(<AddPond />);

    fireEvent.click(screen.getByRole('button', { name: /Tambah Kolam/i }));

    fireEvent.change(screen.getByPlaceholderText('Nama Kolam'), { target: { value: 'Pond 4' } });
    fireEvent.change(screen.getByPlaceholderText('Nama Gambar'), { target: { value: 'pond4.jpg' } });
    fireEvent.change(screen.getByPlaceholderText('Volume Kolam'), { target: { value: 125.0 } });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(addPond).toHaveBeenCalledWith(
        { name: 'Pond4', image_name: 'pond4.jpg', volume: 125.0 },
        'mockAccessToken'
      );

      expect(screen.getByPlaceholderText('Nama Kolam')).toHaveValue('');
      expect(screen.getByPlaceholderText('Nama Gambar')).toHaveValue('');
      expect(screen.getByPlaceholderText('Volume Kolam')).toHaveValue('');
    });
  });

  it('displays an error message when form submission fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (addPond as jest.Mock).mockRejectedValueOnce(new Error('Failed to create pond'));

    render(<AddPond />);

    fireEvent.click(screen.getByRole('button', { name: /Tambah Kolam/i }));
    fireEvent.change(screen.getByPlaceholderText('Nama Kolam'), { target: { value: 'Pond4' } });
    fireEvent.change(screen.getByPlaceholderText('Nama Gambar'), { target: { value: 'pond4.jpg' } });
    fireEvent.change(screen.getByPlaceholderText('Volume Kolam'), { target: { value: 125.0 } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to create pond:', expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });
});
