import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import { AddPondQuality } from '@/components/pond-quality';
import { addFishSampling } from '@/lib/fish-sampling';
import { FishSampling} from '@/types/fish-sampling';
import { AddFishSampling } from '@/components/fish-sampling';

jest.mock('@/lib/fish-sampling', () => ({
  addFishSampling: jest.fn(),
}));

describe('Add Fish Sampling Modal', () => {
  const mockFishSamplingData : FishSampling = {
    sampling_id: 'abc123',
    pond_id: 'abcde',
    fish_weight: 20,
    fish_length: 30,
    sample_date: '2024-10-03',
  };

  const pondId = 'test-pond-id';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form fields correctly', async () => {
    render(<AddFishSampling pondId={pondId}  />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Add Fish Sampling/i }));
    });

    expect(screen.getByPlaceholderText('Berat Ikan(kg)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Panjang Ikan(cm)')).toBeInTheDocument();
  });

  it('closes the modal after successful form submission', async () => {

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      } as Response)
    );

    const mockResponse = { success: true, message: 'Fish Sampling added' };
    (addFishSampling as jest.Mock).mockResolvedValue(mockResponse);

    render(<AddFishSampling pondId={pondId} />);

    fireEvent.click(screen.getByRole('button', { name: /Add Fish Sampling/i }));

    fireEvent.change(screen.getByPlaceholderText('Berat Ikan(kg)'), { target: { value: '20' } });
    fireEvent.change(screen.getByPlaceholderText('Panjang Ikan(cm)'), { target: { value: '30' } });
    // fireEvent.change(screen.getByPlaceholderText('Tanggal Sampling'), { target: { value: '2024-10-03' } });
    

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('displays error message when backend says fish sampling creation failed', async () => {
    const mockResponse = { success: false, message: 'Failed to create fish sampling' };
    (addFishSampling as jest.Mock).mockResolvedValue(mockResponse);
    // const file = new File(['(⌐□_□)'], 'pond.jpg', { type: 'image/jpg' });
  
    render(<AddFishSampling pondId={pondId} />);
  
    fireEvent.click(screen.getByRole('button', { name: /Add Fish Sampling/i }));
  
    fireEvent.change(screen.getByPlaceholderText('Berat Ikan(kg)'), { target: { value: '20' } });
    fireEvent.change(screen.getByPlaceholderText('Panjang Ikan(cm)'), { target: { value: '30' } });
    // fireEvent.change(screen.getByPlaceholderText('Tanggal Sampling'), { target: { value: '2024-10-03' } });
  
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    await waitFor(() => {
      expect(screen.getByText('Gagal menyimpan sample ikan')).toBeInTheDocument();
    });
  });
  

  it('displays error message and sets error state when form submission fails', async () => {
    const mockError = new Error('Gagal menambah sampling ikan');
    // const file = new File(['(⌐□_□)'], 'pond.jpg', { type: 'image/jpg' });
    (addFishSampling as jest.Mock).mockRejectedValueOnce(mockError);


    render(<AddFishSampling pondId={pondId} />);

    fireEvent.click(screen.getByRole('button', { name: /Add Fish Sampling/i }));

    fireEvent.change(screen.getByPlaceholderText('Berat Ikan(kg)'), { target: { value: '20' } });
    fireEvent.change(screen.getByPlaceholderText('Panjang Ikan(cm)'), { target: { value: '30' } });

    fireEvent.click(screen.getByRole('button', { name: /Simpan/i }));

    await waitFor(() => {
      expect(screen.getByText('Gagal menyimpan sample ikan')).toBeInTheDocument();
    });
  });

  it('does not allow form submission when any of the fields are invalid', async () => {
    render(<AddFishSampling pondId={pondId} />);

    fireEvent.click(screen.getByRole('button', { name: /Add Fish Sampling/i }));

    fireEvent.change(screen.getByPlaceholderText('Berat Ikan(kg)'), { target: { value: '-1' } });
    fireEvent.change(screen.getByPlaceholderText('Panjang Ikan(cm)'), { target: { value: '-2' } });

    fireEvent.click(screen.getByRole('button', { name: /Simpan/i }));

    await waitFor(() => {
      expect(screen.getByText('Berat harus berupa angka positif')).toBeInTheDocument();
      expect(screen.getByText('Panjang harus berupa angka positif')).toBeInTheDocument();
      expect(addFishSampling).not.toHaveBeenCalled();
    });
  });
});