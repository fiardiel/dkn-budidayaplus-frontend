import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import AddFishSampling from '@/components/fish_sampling/AddFishSampling';
import { addFishSampling } from '@/lib/fish_sampling';

jest.mock('@/lib/fish_sampling', () => ({
  addFishSampling: jest.fn(),
}));

describe('Add Fish Sampling Modal', () => {
  beforeEach(() => {
    Object.defineProperty(document, 'cookie', {
      value: 'accessToken=mockAccessToken',
      writable: true,
    });

    // Enable fetch mocks before each test
    fetchMock.resetMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form fields correctly', async () => {
    render(<AddFishSampling />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Tambah Sampling Ikan/i }));
    });
    // Check if form fields are rendered
    expect(screen.getByPlaceholderText('Panjang Ikan (cm)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Berat Ikan (kg)')).toBeInTheDocument();
  });

  it('does not submit the form if no token is found', async () => {
    Object.defineProperty(document, 'cookie', {
      value: '',
      writable: true,
    });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    fetchMock.mockReject(new Error('No token found'));  // Use fetchMock here

    render(<AddFishSampling />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Tambah Sampling Ikan/i }));
    });

    fireEvent.change(screen.getByPlaceholderText('Panjang Ikan (cm)'), { target: { value: 30 } });
    fireEvent.change(screen.getByPlaceholderText('Berat Ikan (kg)'), { target: { value: 2.5 } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('No token found');
      expect(addFishSampling).not.toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });

  it('closes the modal after successful form submission', async () => {
    const mockResponse = { success: true, message: 'Pond created' };
    (addFishSampling as jest.Mock).mockResolvedValue(mockResponse);

    const mockToken = 'mockAccessToken';

    render(<AddFishSampling token={mockToken} />);

    fireEvent.click(screen.getByRole('button', { name: /Tambah Sampling Ikan/i }));

    fireEvent.change(screen.getByPlaceholderText('Panjang Ikan (cm)'), { target: { value: 30 } });
    fireEvent.change(screen.getByPlaceholderText('Berat Ikan (kg)'), { target: { value: 2.5 } });

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
    (addFishSampling as jest.Mock).mockRejectedValueOnce(mockError);

    const mockToken = 'mockAccessToken';

    render(<AddFishSampling token={mockToken} />);

    fireEvent.click(screen.getByText(/Tambah Sampling Ikan/i));

    fireEvent.change(screen.getByPlaceholderText('Panjang Ikan (cm)'), { target: { value: 30 } });
    fireEvent.change(screen.getByPlaceholderText('Berat Ikan (kg)'), { target: { value: 2.5 } });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Failed to create fish sampling')).toBeInTheDocument();
    });
  });
  
  it('resets error state when modal is closed', async () => {
    const mockError = new Error('Failed to create fish sampling');
    (addFishSampling as jest.Mock).mockRejectedValueOnce(mockError);
  
    const mockToken = 'mockAccessToken';
  
    render(<AddFishSampling token={mockToken} />);
  
    // Open the modal
    fireEvent.click(screen.getByRole('button', { name: /Tambah Sampling Ikan/i }));
  
    // Simulate filling out the form
    fireEvent.change(screen.getByPlaceholderText('Panjang Ikan (cm)'), { target: { value: 30 } });
    fireEvent.change(screen.getByPlaceholderText('Berat Ikan (kg)'), { target: { value: 2.5 } });
  
    // Simulate submitting the form
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
  
    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText('Failed to create fish sampling')).toBeInTheDocument();
    });
  
    // Close the modal
    fireEvent.click(screen.getByRole('button', { name: /Close/i }));
  
    // Wait for the modal to close and then check if the error state is reset
    await waitFor(() => {
      expect(screen.queryByText('Failed to create fish sampling')).not.toBeInTheDocument();
    });
  });
  
  
  it('renders FishSamplingForm correctly when modal is open', async () => {
    render(<AddFishSampling token="mockAccessToken" />);
  
    fireEvent.click(screen.getByRole('button', { name: /Tambah Sampling Ikan/i }));
  
    // Check if FishSamplingForm is rendered
    expect(screen.getByPlaceholderText('Panjang Ikan (cm)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Berat Ikan (kg)')).toBeInTheDocument();
  });
});

  


