import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FishSamplingForm } from '@/components/fish-sampling';  
import { addFishSampling } from '@/lib/fish-sampling';
import { FishSampling } from '@/types/fish-sampling';

jest.mock('@/lib/fish-sampling', () => ({
  addFishSampling: jest.fn(),
}));

describe('FishSamplingForm', () => {
  const mockSetIsModalOpen = jest.fn();
  const pondId = 'abcde';

  const fishSampling: FishSampling = {
    sampling_id: 'abc123',
    pond_id: pondId,
    fish_weight: 1.5,
    fish_length: 20.0,
    sample_date: '2024-10-01',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly with initial values', () => {
    render(<FishSamplingForm pondId={pondId} fishSampling={fishSampling} setIsModalOpen={mockSetIsModalOpen} />);

    expect(screen.getByPlaceholderText('Berat Ikan(kg)')).toHaveValue(1.5);
    expect(screen.getByPlaceholderText('Panjang Ikan(cm)')).toHaveValue(20.0);
  });

  it('displays validation errors if form fields are empty', async () => {
    render(<FishSamplingForm pondId={pondId} setIsModalOpen={mockSetIsModalOpen} />);

    fireEvent.input(screen.getByPlaceholderText('Berat Ikan(kg)'), { target: { value: '' } });
    fireEvent.input(screen.getByPlaceholderText('Panjang Ikan(cm)'), { target: { value: '' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Simpan' }));

    await waitFor(() => {
      const errorMessages = screen.getAllByText('Expected number, received nan');
      expect(errorMessages.length).toBe(2); 
  });
  });

  it('submits the form successfully when data is valid', async () => {
    (addFishSampling as jest.Mock).mockResolvedValue({ success: true });

    render(<FishSamplingForm pondId={pondId} setIsModalOpen={mockSetIsModalOpen} />);

    fireEvent.input(screen.getByPlaceholderText('Berat Ikan(kg)'), { target: { value: '1.5' } });
    fireEvent.input(screen.getByPlaceholderText('Panjang Ikan(cm)'), { target: { value: '20' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Simpan' }));

    await waitFor(() => {
      expect(addFishSampling).toHaveBeenCalledWith(expect.any(FormData), pondId);
      expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
    });
  });

  it('shows an error message if form submission fails', async () => {
    (addFishSampling as jest.Mock).mockResolvedValue({ success: false });

    render(<FishSamplingForm pondId={pondId} setIsModalOpen={mockSetIsModalOpen} />);

    fireEvent.input(screen.getByPlaceholderText('Berat Ikan(kg)'), { target: { value: '1.5' } });
    fireEvent.input(screen.getByPlaceholderText('Panjang Ikan(cm)'), { target: { value: '20' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Simpan' }));

    await waitFor(() => {
      expect(screen.getByText('Gagal menyimpan sample ikan')).toBeInTheDocument();
    });
  });

  it('displays the error message when the API call throws an error', async () => {
    (addFishSampling as jest.Mock).mockRejectedValue(new Error('Network error'));

    render(<FishSamplingForm pondId={pondId} setIsModalOpen={mockSetIsModalOpen} />);

    fireEvent.input(screen.getByPlaceholderText('Berat Ikan(kg)'), { target: { value: '1.5' } });
    fireEvent.input(screen.getByPlaceholderText('Panjang Ikan(cm)'), { target: { value: '20' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Simpan' }));

    await waitFor(() => {
      expect(screen.getByText('Gagal menyimpan sample ikan')).toBeInTheDocument();
    });
  });
});