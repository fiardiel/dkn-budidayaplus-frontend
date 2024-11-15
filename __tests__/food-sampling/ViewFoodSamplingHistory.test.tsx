import { ViewFoodSamplingHistory } from '@/components/food-sampling';
import { render, screen, waitFor } from '@testing-library/react';

describe('ViewFoodSamplingHistory', () => {
  it('renders the view food sampling history button with correct pondId', async () => {
    const ui = await ViewFoodSamplingHistory({ pondId: '1' });
    render(ui);

    await waitFor(() => {
      expect(screen.getByText('Lihat Riwayat')).toBeInTheDocument();
    });
  });
});
