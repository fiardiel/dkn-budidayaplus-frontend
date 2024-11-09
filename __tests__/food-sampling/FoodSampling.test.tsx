import { render, screen, waitFor } from '@testing-library/react';
import { FoodSampling } from '@/components/food-sampling';
import { FoodSampling as FoodSamplingType } from '@/types/food-sampling';
import { useFoodSampling } from '@/hooks/useFoodSampling';

jest.mock('@/hooks/useFoodSampling', () => {
  const mockFoodSampling: FoodSamplingType = {
    sampling_id: '1',
    food_quantity: 100,
    sample_date: new Date(),
    pond_id: '1',
    cycle_id: '1',
  };
  return {
    useFoodSampling: jest.fn().mockReturnValue({ foodSampling: mockFoodSampling, cycle: { id: '1' } }),
  };
});

describe('FoodSampling', () => {
  it('renders the FoodSampling component with cycle', async () => {
    render(<FoodSampling pondId="1" />);

    await waitFor(() => {
      expect(screen.getByTestId('food-sampling-list')).toBeInTheDocument();
      expect(screen.getByTestId('add-food-sampling')).toBeInTheDocument();
      expect(screen.getByText('Lihat Riwayat')).toBeInTheDocument();
    });
  });

  it('renders the FoodSampling component without cycle', async () => {
    (useFoodSampling as jest.Mock).mockReturnValue({ foodSampling: undefined, cycle: undefined });
    render(<FoodSampling pondId="1" />);

    await waitFor(() => {
      expect(screen.getByTestId('food-sampling-list')).toBeInTheDocument();
      expect(screen.queryByTestId('add-food-sampling')).not.toBeInTheDocument();
      expect(screen.queryByTestId('view-food-sampling-history')).not.toBeInTheDocument();
    });
  });
});
