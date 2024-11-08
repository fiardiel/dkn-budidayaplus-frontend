import { render, screen, waitFor } from '@testing-library/react';
import FoodSamplingHistory from '@/components/food-sampling/FoodSamplingHistory';
import { useFoodSamplingHistory } from '@/hooks/useFoodSamplingHistory';
import { formatDate } from 'date-fns';

jest.mock('@/hooks/useFoodSamplingHistory');

const mockFoodSamplingHistory = {
  food_samples: [
    {
      sampling_id: 'sample1',
      sample_date: new Date('2024-10-03').toISOString(),
      food_quantity: 120,
    },
    {
      sampling_id: 'sample2',
      sample_date: new Date('2024-10-04').toISOString(),
      food_quantity: 150,
    },
  ],
};

describe('FoodSamplingHistory', () => {
  beforeEach(() => {
    (useFoodSamplingHistory as jest.Mock).mockReturnValue(mockFoodSamplingHistory);
  });

  it('renders the food sampling history with data', async () => {
    render(<FoodSamplingHistory pondId="1" />);

    await waitFor(() => {
      expect(screen.getByText('Riwayat Sampling Makanan')).toBeInTheDocument();

      // Check table headers
      expect(screen.getByText('Tanggal')).toBeInTheDocument();
      expect(screen.getByText('Kuantitas Makanan (gram)')).toBeInTheDocument();

      // Check table data rows
      mockFoodSamplingHistory.food_samples.forEach((sample) => {
        expect(screen.getByText(formatDate(new Date(sample.sample_date), 'dd-MM-yyyy'))).toBeInTheDocument();
        expect(screen.getByText(sample.food_quantity.toString())).toBeInTheDocument();
      });
    });
  });

  it('renders a message when there is no data', async () => {
    (useFoodSamplingHistory as jest.Mock).mockReturnValue({ food_samples: [] });
    render(<FoodSamplingHistory pondId="1" />);

    await waitFor(() => {
      expect(screen.getByText('Riwayat Sampling Makanan')).toBeInTheDocument();
      expect(screen.getByText('Tidak ada data')).toBeInTheDocument();
    });
  });
});
