import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AddFishSampling from '@/components/fishSampling/AddFishSampling';
import { addFishSampling } from '@/lib/fishSampling';
import { cookies } from 'next/headers';

jest.mock('@/lib/fishSampling', () => ({
  addFishSampling: jest.fn(),
}));
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

describe('Add Fish Sampling Modal', () => {
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
    render(<AddFishSampling />);
    // Open the modal
    fireEvent.click(screen.getByRole('button', { name: /Sampling Ikan/i }));
    // Check if form fields are rendered
    expect(screen.getByPlaceholderText('Pilih Kolam')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Panjang Ikan(cm)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Berat Ikan(kg)')).toBeInTheDocument();
  });

  it('submits the form and resets it after adding fish sampling', async () => {
    const mockResponse = { id: '123456', pondId: 'abcdef', fishLength: 30, fishWeight: 2.5 };
    (addFishSampling as jest.Mock).mockResolvedValueOnce(mockResponse);
    render(<AddFishSampling />);
    fireEvent.click(screen.getByRole('button', { name: /Sampling Ikan/i }));
    fireEvent.change(screen.getByPlaceholderText('Pilih Kolam'), { target: { value: 'Pond 1' } });
    fireEvent.change(screen.getByPlaceholderText('Panjang Ikan(cm)'), { target: { value: 30 } });
    fireEvent.change(screen.getByPlaceholderText('Berat Ikan(kg)'), { target: { value: 2.5 } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    
    await waitFor(() => {
      expect(addFishSampling).toHaveBeenCalledWith(
        { pondId: 'Pond 1', fishLength: 30, fishWeight: 2.5 },
        'mockAccessToken'
      );
      expect(screen.getByPlaceholderText('Pilih Kolam')).toHaveValue('');
      expect(screen.getByPlaceholderText('Panjang Ikan(cm)')).toHaveValue('');
      expect(screen.getByPlaceholderText('Berat Ikan(kg)')).toHaveValue('');
    });
  });

  it('displays an error message when form submission fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (addFishSampling as jest.Mock).mockRejectedValueOnce(new Error('Failed to create fish sampling'));
    render(<AddFishSampling />);
    fireEvent.click(screen.getByRole('button', { name: /Sampling Ikan/i }));
    fireEvent.change(screen.getByPlaceholderText('Pilih Kolam'), { target: { value: 'Pond 1' } });
    fireEvent.change(screen.getByPlaceholderText('Panjang Ikan(cm)'), { target: { value: 30 } });
    fireEvent.change(screen.getByPlaceholderText('Berat Ikan(kg)'), { target: { value: 2.5 } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to create fish sampling:', expect.any(Error));
    });
    consoleErrorSpy.mockRestore();
  });
});
