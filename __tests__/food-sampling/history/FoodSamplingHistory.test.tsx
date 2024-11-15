import { render, screen, waitFor } from '@testing-library/react';
import FoodSamplingHistory from '@/components/food-sampling/FoodSamplingHistory';
import { formatDate } from 'date-fns';
import { FoodSamplingHistory as FoodSamplingHistoryType } from '@/types/food-sampling';
import { id } from 'date-fns/locale';
import { getFoodSamplingHistory } from '@/lib/food-sampling';
import { getLatestCycle } from '@/lib/cycle';

jest.mock('@/lib/food-sampling', () => ({
  getFoodSamplingHistory: jest.fn(),
}))

jest.mock('@/lib/cycle', () => ({
  getLatestCycle: jest.fn(),
}))

const pondId = 'abcde';
const cycleId = 'abcdef'
const reporter = 'abcdefg';

const mockFoodSamplingHistory: FoodSamplingHistoryType = {
  cycle_id: cycleId,
  food_samplings: [
    {
      sampling_id: 'sample1',
      pond_id: pondId,
      cycle_id: cycleId,
      reporter: reporter,
      recorded_at: new Date('2024-10-03'),
      food_quantity: 120,
    },
    {
      sampling_id: 'sample2',
      pond_id: pondId,
      cycle_id: cycleId,
      reporter: reporter,
      recorded_at: new Date('2024-10-04'),
      food_quantity: 150,
    },
  ],
};

describe('FoodSamplingHistory', () => {
  it('renders the food sampling history with data', async () => {
    (getFoodSamplingHistory as jest.Mock).mockResolvedValue(mockFoodSamplingHistory);
    (getLatestCycle as jest.Mock).mockResolvedValue({ id: cycleId });

    const ui = await FoodSamplingHistory({ pondId })
    render(ui);

    await waitFor(() => {
      expect(screen.getByText('Riwayat Sampling Makanan')).toBeInTheDocument();

      expect(screen.getByText('Tanggal')).toBeInTheDocument();
      expect(screen.getByText('Kuantitas Makanan (gram)')).toBeInTheDocument();

      mockFoodSamplingHistory.food_samplings.forEach((foodSampling) => {
        expect(screen.getByText(formatDate(foodSampling.recorded_at, 'EEEE, dd MMMM yyyy', { locale: id }))).toBeInTheDocument();
        expect(screen.getByText(foodSampling.food_quantity)).toBeInTheDocument();
      });
    });
  });

  it('renders a message when there is no data', async () => {
    (getLatestCycle as jest.Mock).mockReturnValue({ id: '1' });
    (getFoodSamplingHistory as jest.Mock).mockReturnValue({ food_samplings: [] });
    const ui = await FoodSamplingHistory({ pondId: '1' });
    render(ui);

    await waitFor(() => {
      expect(screen.getByText('Riwayat Sampling Makanan')).toBeInTheDocument();
      expect(screen.getByText('Tidak ada data')).toBeInTheDocument();
    });
  });

  it('handles when there is no cycle (not possible)', async () => {
    (getLatestCycle as jest.Mock).mockReturnValue(undefined);
    const ui = await FoodSamplingHistory({ pondId: '1' });
    render(ui);

    await waitFor(() => {
      expect(screen.getByText('Riwayat Sampling Makanan')).toBeInTheDocument();
      expect(screen.getByText('Tidak ada data')).toBeInTheDocument();
    });
  })
});
