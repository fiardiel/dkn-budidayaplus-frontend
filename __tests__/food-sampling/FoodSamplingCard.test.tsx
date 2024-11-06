import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import FoodSamplingCard from '@/components/food-sampling/FoodSamplingCard';
import { getLatestFoodSampling } from '@/lib/food-sampling';
import { useFoodSampling } from '@/hooks/useFood';

jest.mock('@/lib/cycle', () => ({
  getLatestCycle: jest.fn().mockReturnValue( {
    id: 'test-cycle-id',
    start_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    end_date: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
    supervisor: 'John Doe',
    pond_food_amount: [
      {
        id: 'test-pond-food-amount-id',
        pond_id: 'test-pond-id',
        food_amount: 100,
      },
    ],
  })
}))


jest.mock('@/hooks/useFood', () => ({
  useFoodSampling: jest.fn()
}))

jest.mock('@/lib/food-sampling', () => ({
  getLatestFoodSampling: jest.fn(),
}));

describe('FoodSamplingCard', () => {
  const pondId = 'test-pond-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

//   it('renders FoodSamplingList and AddFoodSampling components', async () => {
//     (getLatestFoodSampling as jest.Mock).mockResolvedValue(JSON.parse("{}"));
//     await act(async () => {
//       render(<FoodSamplingCard pondId={pondId} />);
//     });

//     // expect(screen.getByText('Add Food Sampling')).toBeInTheDocument();
//   });

  it('fetches and displays food sampling data when cycle is available', async () => {
    // mock the hook's return value
    const mockDate = new Date(Date.now());
    (useFoodSampling as jest.Mock).mockReturnValue({
      sampling_id: 'test-sampling-id',
      pond_id: 'test-pond-id',
      reporter: 'John Doe',
      food_quantity: 30,
      sample_date: mockDate
    });

    render(<FoodSamplingCard pondId={pondId} />);

    await waitFor(() => {
      expect(useFoodSampling).toHaveBeenCalledWith("test-pond-id");

      const quantityElement = screen.getByTestId('food-quantity');
      const dateElement = screen.getByTestId('sample-date');

      expect(quantityElement).toHaveTextContent('30');
      expect(dateElement).toHaveTextContent(mockDate.toLocaleDateString("en-GB").replace(/\//g, '-'));
    });
  });

  it('does not fetch food sampling data when cycle is unavailable', async () => {
    (getLatestFoodSampling as jest.Mock).mockResolvedValue(undefined);

    render(<FoodSamplingCard pondId={pondId} />);

    await waitFor(() => {
      expect(getLatestFoodSampling).not.toHaveBeenCalled();
    });
  });
});