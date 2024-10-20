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

  {
    sampling_id: 'sample2',
    pond: 'mockPondId',
    reporter: '082299442771',
    cycle: 'mockCycleId',
    food_quantity: 200,
    sample_date: new Date('2024-10-02'),
  },
];

describe('FoodSamplingList', () => {
  it('renders the food sampling list', async () => {
    render(<FoodSamplingList foodSampling={mockFoodSamplingData} />);

    await waitFor(() => {
        expect(screen.getByText('Sampling Makanan')).toBeInTheDocument();
        expect(screen.getByText('Kuantitas Makanan (gram)')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
        expect(screen.getByText('200')).toBeInTheDocument();
        expect(screen.getByText('082299442770')).toBeInTheDocument();
        expect(screen.getByText('082299442771')).toBeInTheDocument();
        expect(screen.getByText('2024-10-01')).toBeInTheDocument();
        expect(screen.getByText('2024-10-02')).toBeInTheDocument();
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
