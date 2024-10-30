import { render, screen, waitFor } from '@testing-library/react';
import { FoodSampling } from '@/types/food-sampling';
import { FoodSamplingList } from '@/components/food-sampling';
import { formatDateTime } from '@/lib/utils';

jest.mock('@/lib/food-sampling', () => ({
  getFoodSampling: jest.fn(),
}));

const mockFoodSamplingData: FoodSampling[] = [
  {
    sampling_id: 'abc123',
    pond_id: 'abcde',
    cycle_id: 'cycle123',
    food_quantity: 100,
    sample_date: new Date('2024-10-03'),
  },
];

describe('FoodSamplingList', () => {
  it('renders the food sampling list', async () => {
    render(<FoodSamplingList foodSampling={mockFoodSamplingData} />);

    await waitFor(() => {
      expect(screen.getByText('Data Sampling Makanan')).toBeInTheDocument();
      expect(screen.getByText('Kuantitas Makanan (gram): 100')).toBeInTheDocument();
      expect(screen.getByText(`Tanggal: ${formatDateTime(mockFoodSamplingData[0].sample_date)}`)).toBeInTheDocument();
    });
  });

  it('renders no food sampling message', async () => {
    const mockFoodSamplingData: FoodSampling[] = [];
    render(<FoodSamplingList foodSampling={mockFoodSamplingData} />);

    await waitFor(() => {
      expect(screen.getByText('Tidak ada data sampling makanan')).toBeInTheDocument();
    });
  });
});
