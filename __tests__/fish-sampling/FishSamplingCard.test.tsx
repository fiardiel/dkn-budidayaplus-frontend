import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import FishSamplingCard from '@/components/fish-sampling/FishSamplingCard';
import { fetchLatestFishSampling } from '@/lib/fish-sampling';
import { useLatestFishSampling } from '@/hooks/useFishSampling';

jest.mock('@/lib/cycle', () => ({
  getLatestCycle: jest.fn().mockReturnValue( {
    id: 'test-cycle-id',
    start_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    end_date: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
    supervisor: 'John Doe',
    pond_fish_amount: [
      {
        id: 'test-pond-fish-amount-id',
        pond_id: 'test-pond-id',
        fish_amount: 100,
      },
    ],
  })
}))


jest.mock('@/hooks/useFishSampling', () => ({
  useLatestFishSampling: jest.fn()
}))

jest.mock('@/lib/fish-sampling', () => ({
  fetchLatestFishSampling: jest.fn(),
}));

describe('FishSamplingCard', () => {
  const pondId = 'test-pond-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders FishSamplingList and AddFishSampling components', async () => {
    (fetchLatestFishSampling as jest.Mock).mockResolvedValue(undefined);
    await act(async () => {
      render(<FishSamplingCard pondId={pondId} />);
    });

    expect(screen.getByText('Add Fish Sampling')).toBeInTheDocument();
  });

  it('fetches and displays fish sampling data when cycle is available', async () => {
    // mock the hook's return value
    const mockDate = new Date(Date.now());
    (useLatestFishSampling as jest.Mock).mockReturnValue({
      sampling_id: 'test-sampling-id',
      pond_id: 'test-pond-id',
      reporter: 'John Doe',
      fish_weight: 1.5,
      fish_length: 40,
      sample_date: mockDate.toLocaleDateString(),
    });

    render(<FishSamplingCard pondId={pondId} />);

    await waitFor(() => {
      expect(useLatestFishSampling).toHaveBeenCalledWith("test-pond-id");

      const weightElement = screen.getByTestId('fish-weight');
      const lengthElement = screen.getByTestId('fish-length');
      const dateElement = screen.getByTestId('fish-sample-date');

      expect(weightElement).toHaveTextContent('1.5');
      expect(lengthElement).toHaveTextContent('40');
      expect(dateElement).toHaveTextContent(new Date(Date.now()).toLocaleDateString());
    });
  });

  it('does not fetch fish sampling data when cycle is unavailable', async () => {
    (fetchLatestFishSampling as jest.Mock).mockResolvedValue(undefined);

    render(<FishSamplingCard pondId={pondId} />);

    await waitFor(() => {
      expect(fetchLatestFishSampling).not.toHaveBeenCalled();
    });
  });
});