import { render, screen, waitFor } from '@testing-library/react';
import { Pond } from '@/types/pond';
import User from '@/types/auth/user';
import { fetchFishSampling } from '@/lib/fish-sampling';
import { FishSampling } from '@/types/fish-sampling';
import { FishSamplingList } from '@/components/fish-sampling';

jest.mock('@/lib/fish-sampling', () => ({
  fetchFishSampling: jest.fn(),
}));

const mockPond: Pond = {
  pond_id: 'abcde',
  name: 'Pond 1',
  length: 121.0,
  width: 121.0,
  depth: 121.0,
  image_name: 'pond1.jpg',
};

const mockUser: User = {
  id: 1,
  phone_number: '0812345678',
  first_name: 'John',
  last_name: 'Doe',
};

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