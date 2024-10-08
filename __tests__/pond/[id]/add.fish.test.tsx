import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import AddFishSampling from '@/components/fish_sampling/AddFishSampling';
import { addFishSampling } from '@/lib/fish_sampling';

jest.mock('@/lib/fish_sampling', () => ({
  addFishSampling: jest.fn(),
}));

describe('Add Fish Sampling Modal', () => {
  const mockToken = 'mockAccessToken';
  const mockPondData = {
    pond_id: 'pond123',
    name: 'Pond A',
    length: 50,
    width: 30,
    depth: 10,
    image_name: 'pond_a.jpg',
  };

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        reload: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form fields correctly', async () => {
    render(<AddFishSampling pondData={mockPondData}/>);
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

    render(<AddFishSampling pondData={mockPondData}/>);

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

  it('closes the modal and reloads the page after successful form submission', async () => {
    const mockResponse = { success: true, message: 'Fish sampling created' };
    (addFishSampling as jest.Mock).mockResolvedValue(mockResponse);
  
    const mockToken = 'mockAccessToken';
  
    render(<AddFishSampling token={mockToken} pondData={mockPondData} />);
  
    fireEvent.click(screen.getByRole('button', { name: /Tambah Sampling Ikan/i }));
  
    fireEvent.change(screen.getByPlaceholderText('Panjang Ikan (cm)'), { target: { value: 30 } });
    fireEvent.change(screen.getByPlaceholderText('Berat Ikan (kg)'), { target: { value: 2.5 } });
  
    // Mock the window reload function
    const reloadMock = jest.spyOn(window.location, 'reload').mockImplementation(() => {});
  
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });
  
    await waitFor(() => {
      expect(reloadMock).toHaveBeenCalled(); // Assert that the page reload was triggered
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  
    reloadMock.mockRestore(); // Restore the original functionality
  });

  it('displays an error message when the submission fails', async () => {
    const mockError = new Error('Failed to create fish sampling');
    (addFishSampling as jest.Mock).mockRejectedValue(mockError); // Simulate an API error
  
    render(<AddFishSampling token={mockToken} pondData={mockPondData} />);
  
    // Open the modal
    fireEvent.click(screen.getByRole('button', { name: /Tambah Sampling Ikan/i }));
  
    // Fill in the form with valid data
    fireEvent.change(screen.getByPlaceholderText('Panjang Ikan (cm)'), { target: { value: 35 } });
    fireEvent.change(screen.getByPlaceholderText('Berat Ikan (kg)'), { target: { value: 1.8 } });
  
    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });
  
    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText('Failed to create fish sampling. Please try again.')).toBeInTheDocument();
    });
  
    // Check if the modal remains open
    expect(screen.getByRole('dialog')).toBeInTheDocument(); // This should now work correctly
  });
  
  it('renders FishSamplingForm correctly when modal is open', async () => {
    render(<AddFishSampling token="mockAccessToken" pondData={mockPondData}/>);
  
    fireEvent.click(screen.getByRole('button', { name: /Tambah Sampling Ikan/i }));
  
    // Check if FishSamplingForm is rendered
    expect(screen.getByPlaceholderText('Panjang Ikan (cm)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Berat Ikan (kg)')).toBeInTheDocument();
  });

  it('opens and closes the modal correctly', () => {
    render(<AddFishSampling token={mockToken} pondData={mockPondData} />);
    
    // Verify that the modal is not present initially
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  
    // Open the modal
    fireEvent.click(screen.getByRole('button', { name: /Tambah Sampling Ikan/i }));
  
    // Verify that the modal is now present
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  
    // Close the modal
    fireEvent.click(screen.getByRole('button', { name: /Close/i }));
  
    // Verify that the modal is no longer present
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});