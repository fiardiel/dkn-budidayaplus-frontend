import { render, screen, waitFor } from '@testing-library/react';
import FoodSamplingList from '@/components/food-sampling/FoodSamplingList';
import { FoodSampling } from '@/types/food-sampling';
import { id } from 'date-fns/locale';
import { formatDate } from 'date-fns';

const mockFoodSampling: FoodSampling = {
  sampling_id: 'sample123',
  pond_id: 'abcde',
  cycle_id: 'cycle123',
  food_quantity: 150,
  recorded_at: new Date('2024-10-03'),
  reporter: 'Rafi',
};

describe('FoodSamplingList', () => {
  it('renders the food sampling list with data and custom label', async () => {
    render(<FoodSamplingList foodSampling={mockFoodSampling} />);

    await waitFor(() => {
      expect(screen.getByText('Kuantitas (gram)')).toBeInTheDocument();
      expect(screen.getByText('150 gr')).toBeInTheDocument();
      expect(screen.getByText(`Laporan terakhir: ${formatDate(mockFoodSampling.recorded_at, 'EEEE, dd MMMM yyyy', { locale: id })}`)).toBeInTheDocument();
    });
  });

  it('renders no food sampling message when data is undefined', async () => {
    render(<FoodSamplingList foodSampling={undefined} />);

    await waitFor(() => {
      expect(screen.getByText('Tidak ada data sampling makanan')).toBeInTheDocument();
    });
  });
});
