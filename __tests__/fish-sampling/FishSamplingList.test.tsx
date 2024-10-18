import { render, screen, waitFor } from '@testing-library/react';
import { FishSampling } from '@/types/fish-sampling';
import { FishSamplingList } from '@/components/fish-sampling';

jest.mock('@/lib/fish-sampling', () => ({
  fetchFishSampling: jest.fn(),
}));

const mockFishSamplingData: FishSampling[] = [
  {
    sampling_id: 'abc123',
    pond_id: 'abcde',
    fish_weight: 20,
    fish_length: 30,
    sample_date: '2024-10-03',
  },
];

describe('FishSamplingList', () => {
  it('renders the fish sampling list', async () => {
    render(<FishSamplingList fishSampling={mockFishSamplingData} />);

    await waitFor(() => {
      expect(screen.getByText('Sampling Ikan')).toBeInTheDocument();
      expect(screen.getByText('Berat Ikan (kg)')).toBeInTheDocument();
      expect(screen.getByText('20')).toBeInTheDocument();
      expect(screen.getByText('Panjang Ikan (cm)')).toBeInTheDocument();
      expect(screen.getByText('30')).toBeInTheDocument();
      expect(screen.getByText('Tanggal Sampling')).toBeInTheDocument();
      expect(screen.getByText('2024-10-03')).toBeInTheDocument();
    });
  });

  it('renders no fish sampling message', async () => {
    const mockFishSamplingData: FishSampling[] = [];
    render(<FishSamplingList fishSampling={mockFishSamplingData} />);

    await waitFor(() => {
      expect(screen.getByText('Tidak ada sampling ikan')).toBeInTheDocument();
    });
  });
});