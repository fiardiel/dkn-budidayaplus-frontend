import { render, screen, waitFor } from '@testing-library/react';
import FishSamplingCard from '@/components/fish-sampling/FishSamplingCard';
import { id } from 'date-fns/locale';
import { formatDate } from 'date-fns';
import { fetchLatestFishSampling } from '@/lib/fish-sampling';

jest.mock('@/lib/fish-sampling', () => ({
  fetchLatestFishSampling: jest.fn(),
}))

describe('FishSamplingCard', () => {
  const pondId = 'test-pond-id';
  const cycleId = 'test-cycle-id';
  const className = 'test-class';
  const props = { pondId, cycleId, className };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders FishSamplingList and AddFishSampling components', async () => {
    (fetchLatestFishSampling as jest.Mock).mockResolvedValue(undefined);

    const ui = await FishSamplingCard(props);
    render(ui)

    await waitFor(() => {
      expect(screen.getByText('Sample')).toBeInTheDocument();
      expect(screen.getByText('Lihat Riwayat')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /lihat riwayat/i }))
    })
  });

  it('fetches and displays fish sampling data when cycle is available', async () => {
    const mockDate = new Date(Date.now());
    (fetchLatestFishSampling as jest.Mock).mockReturnValue({
      sampling_id: 'test-sampling-id',
      pond_id: 'test-pond-id',
      reporter: 'John Doe',
      fish_weight: 1.5,
      fish_length: 40,
      recorded_at: mockDate.toLocaleDateString(),
    });

    const ui = await FishSamplingCard(props);
    render(ui)

    await waitFor(() => {
      const weightElement = screen.getByTestId('fish-weight');
      const lengthElement = screen.getByTestId('fish-length');
      const dateElement = screen.getByTestId('fish-sample-date');

      expect(weightElement).toHaveTextContent('1.5');
      expect(lengthElement).toHaveTextContent('40');
      expect(dateElement).toHaveTextContent(formatDate(mockDate, 'EEEE, dd MMMM yyyy', { locale: id }));
    });
  });

  it('does not fetch fish sampling data when cycle is unavailable', async () => {
    const newProps = { pondId: 'test-pond-id', cycleId: undefined, className: 'test-class' };

    const ui = await FishSamplingCard(newProps);
    render(ui);

    await waitFor(() => {
      expect(fetchLatestFishSampling).not.toHaveBeenCalled();
    });
  });

  it('does not render the history button when the cycle is unavailable', async () => {
    const newProps = { pondId: 'test-pond-id', cycleId: undefined, className: 'test-class' };

    const ui = await FishSamplingCard(newProps);
    render(ui);

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /lihat riwayat/i })).not.toBeInTheDocument();
    })
  })
});
