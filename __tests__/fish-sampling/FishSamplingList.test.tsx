import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FishSampling } from '@/types/fish-sampling';
import { FishSamplingList } from '@/components/fish-sampling';

jest.mock('@/lib/fish-sampling', () => ({
  fetchLatestFishSampling: jest.fn(),
  fetchFishSamplingHistory: jest.fn(),
}));

const mockLatestFishSampling: FishSampling = {
  sampling_id: 'abc123',
  pond_id: 'abcde',
  fish_weight: 20,
  fish_length: 30,
  sample_date: '2024-10-03',
};

const mockFishSamplingHistory: FishSampling[] = [
  {
    sampling_id: 'abc123',
    pond_id: 'abcde',
    fish_weight: 20,
    fish_length: 30,
    sample_date: '2024-10-03',
  },
  {
    sampling_id: 'abc124',
    pond_id: 'abcde',
    fish_weight: 25,
    fish_length: 35,
    sample_date: '2024-09-28',
  },
];

describe('FishSamplingList Component', () => {
  it('renders the latest fish sampling', async () => {
    render(<FishSamplingList fishSampling={[mockLatestFishSampling]} />);

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

  it('renders a message when no fish sampling data is available', async () => {
    render(<FishSamplingList fishSampling={[]} />);

    await waitFor(() => {
      expect(screen.getByText('Tidak ada sampling ikan')).toBeInTheDocument();
    });
  });

  it('shows the full history when "View Full History" is clicked', async () => {
    render(<FishSamplingList fishSampling={[mockLatestFishSampling]} />);

    // Simulate clicking the "View Full History" button
    const viewHistoryButton = screen.getByText('View Full History');
    fireEvent.click(viewHistoryButton);

    await waitFor(() => {
      mockFishSamplingHistory.forEach((sampling) => {
        expect(screen.getByText(sampling.fish_weight.toString())).toBeInTheDocument();
        expect(screen.getByText(sampling.fish_length.toString())).toBeInTheDocument();
        expect(screen.getByText(new Date(sampling.sample_date).toLocaleDateString())).toBeInTheDocument();
      });
    });
  });

  it('toggles the full history view back when "Hide History" is clicked', async () => {
    render(<FishSamplingList fishSampling={[mockLatestFishSampling]} />);

    // Click to view the full history
    fireEvent.click(screen.getByText('View Full History'));

    await waitFor(() => {
      expect(screen.getByText('25')).toBeInTheDocument();
    });

    // Click to hide the history
    fireEvent.click(screen.getByText('Hide History'));

    await waitFor(() => {
      expect(screen.queryByText('25')).not.toBeInTheDocument();
    });
  });
});