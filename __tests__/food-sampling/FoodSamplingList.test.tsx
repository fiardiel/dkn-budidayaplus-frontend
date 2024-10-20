import { render, screen, waitFor } from '@testing-library/react';
import { FoodSampling } from '@/types/food-sampling';
import { FoodSamplingList } from '@/components/food-sampling';

jest.mock('@/lib/food-sampling', () => ({
  fetchFoodSampling: jest.fn(),
}));

const mockFoodSamplingData: FoodSampling[] = [
  {
    sampling_id: 'abc123',
    pond: 'abcde',
    cycle: 'cycle123',
    reporter: '082299442770',
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
      expect(screen.getByText('Tanggal: 03-10-2024 07:00')).toBeInTheDocument();
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
