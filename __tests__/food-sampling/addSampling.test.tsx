import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddFoodSampling from '@/components/food-sampling/AddFoodSampling';
import { getLatestCycle } from '@/lib/cycle';

jest.mock('@/lib/cycle');
const mockGetLatestCycle = getLatestCycle as jest.MockedFunction<typeof getLatestCycle>;

describe('AddFoodSampling', () => {
  const pondId = 'test-pond-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Add Food Sampling button if cycle is available', async () => {
    mockGetLatestCycle.mockResolvedValue({
      id: 'test-cycle-id',
      start_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      end_date: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
      supervisor: 'John Doe',
      pond_fish_amount: [{ id: 'test-pond-fish-amount-id', pond_id: 'test-pond-id', fish_amount: 100 }],
    });

    render(<AddFoodSampling pondId={pondId} />);

    await waitFor(() => {
      expect(screen.getByText('Add Food Sampling')).toBeInTheDocument();
    });
  });

  it('does not render the Add Food Sampling button if no cycle is available', async () => {
    mockGetLatestCycle.mockResolvedValue(undefined);

    render(<AddFoodSampling pondId={pondId} />);

    await waitFor(() => {
      expect(screen.queryByText('Add Food Sampling')).not.toBeInTheDocument();
    });
  });

  it('opens modal with FoodSamplingForm when Add Food Sampling button is clicked', async () => {
    mockGetLatestCycle.mockResolvedValue({
      id: 'test-cycle-id',
      start_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      end_date: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
      supervisor: 'John Doe',
      pond_fish_amount: [{ id: 'test-pond-food-amount-id', pond_id: 'test-pond-id', fish_amount: 100 }],
    });

    render(<AddFoodSampling pondId={pondId} />);

    await waitFor(() => {
      const addButton = screen.getByTestId('add-food-sampling-button');
      expect(addButton).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByTestId('add-food-sampling-button'));
    });

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('closes modal when setIsModalOpen is false', async () => {
    mockGetLatestCycle.mockResolvedValue({
      id: 'test-cycle-id',
      start_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      end_date: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
      supervisor: 'John Doe',
      pond_fish_amount: [{ id: 'test-pond-food-amount-id', pond_id: 'test-pond-id', fish_amount: 100 }],
    });

    render(<AddFoodSampling pondId={pondId} />);

    await waitFor(() => {
      const addButton = screen.getByText('Add Food Sampling');
      expect(addButton).toBeInTheDocument();
    });

    // Open modal
    act(() => {
      fireEvent.click(screen.getByText('Add Food Sampling'));
    });

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Simulate modal close
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /close/i })); // Assuming there's a close button
    });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});