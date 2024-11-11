import { render, screen, waitFor } from '@testing-library/react';
import { FoodSampling } from '@/components/food-sampling';

jest.mock('@/lib/food-sampling', () => ({
  getLatestFoodSampling: jest.fn(),
}))

jest.mock('@/components/food-sampling/FoodSamplingList', () => () => <div data-testid="food-sampling-list" />);
jest.mock('@/components/food-sampling/AddFoodSampling', () => () => <div data-testid="add-food-sampling" />);
jest.mock('@/components/food-sampling/ViewFoodSamplingHistory', () => () => <div data-testid="view-food-sampling-history" />);

describe('FoodSampling', () => {
  it('renders the FoodSampling component with cycle', async () => {
    const ui = await FoodSampling({ pondId: '1', cycleId: '1' });
    render(ui)

    await waitFor(() => {
      expect(screen.getByTestId('food-sampling-list')).toBeInTheDocument();
      expect(screen.getByTestId('add-food-sampling')).toBeInTheDocument();
      expect(screen.getByTestId('view-food-sampling-history')).toBeInTheDocument();
    });
  });

  it('renders the FoodSampling component without cycle', async () => {
    const ui = await FoodSampling({ pondId: '1' });
    render(ui)

    await waitFor(() => {
      expect(screen.getByTestId('food-sampling-list')).toBeInTheDocument();
      expect(screen.queryByTestId('add-food-sampling')).not.toBeInTheDocument();
      expect(screen.queryByTestId('view-food-sampling-history')).not.toBeInTheDocument();
    });
  });
});
