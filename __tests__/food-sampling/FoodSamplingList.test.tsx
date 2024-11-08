import { render, screen, waitFor } from '@testing-library/react';
import FoodSamplingList from '@/components/food-sampling/FoodSamplingList';
import { FoodSampling } from '@/types/food-sampling';
import { formatDateTime } from '@/lib/utils';

const mockFoodSampling: FoodSampling = {
  sampling_id: 'sample123',
  pond_id: 'abcde',
  cycle_id: 'cycle123',
  food_quantity: 150,
  sample_date: new Date('2024-10-03'),
};

describe('FoodSamplingList', () => {
  it('renders the food sampling list with data', async () => {
    render(<FoodSamplingList foodSampling={mockFoodSampling} />);

    await waitFor(() => {
      expect(screen.getByText('Kuantitas Makanan (gram)')).toBeInTheDocument();
      expect(screen.getByText('150')).toBeInTheDocument();
      expect(screen.getByText(`Tanggal: ${formatDateTime(mockFoodSampling.sample_date)}`)).toBeInTheDocument();
    });
  });

  it('renders no food sampling message when data is undefined', async () => {
    const mockFoodSamplingUndefined = undefined;
    render(<FoodSamplingList foodSampling={mockFoodSamplingUndefined} />);

    await waitFor(() => {
      expect(screen.getByText('Tidak ada data sampling makanan')).toBeInTheDocument();
    });
  });
});
