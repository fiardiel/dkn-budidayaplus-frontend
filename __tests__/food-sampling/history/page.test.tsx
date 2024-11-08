import { render, screen } from '@testing-library/react';
import FoodSamplingHistoryPage from '@/app/pond/[id]/food-sampling/page';

jest.mock('@/components/food-sampling', () => ({
  FoodSamplingHistory: ({ pondId }: { pondId: string }) => (
    <div data-testid='food-sampling-history'>{pondId}</div>
  ),
}));

describe('FoodSamplingHistoryPage', () => {
  it('renders the food sampling history page with the correct pondId', () => {
    const params = { id: '1' };
    render(<FoodSamplingHistoryPage params={params} />);
    
    const foodSamplingHistory = screen.getByTestId('food-sampling-history');
    expect(foodSamplingHistory).toBeInTheDocument();
    expect(foodSamplingHistory).toHaveTextContent('1');
  });
});
