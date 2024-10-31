import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddFishSampling from '@/components/fish-sampling/AddFishSampling';
import { getLatestCycle } from '@/lib/cycle';

jest.mock('@/lib/cycle');
const mockGetLatestCycle = getLatestCycle as jest.MockedFunction<typeof getLatestCycle>;

describe('AddFishSampling', () => {
  const pondId = 'test-pond-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Add Fish Sampling button if cycle is available', async () => {
    mockGetLatestCycle.mockResolvedValue({
      id: 'test-cycle-id',
      start_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      end_date: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
      supervisor: 'John Doe',
      pond_fish_amount: [{ id: 'test-pond-fish-amount-id', pond_id: 'test-pond-id', fish_amount: 100 }],
    });

    render(<AddFishSampling pondId={pondId} />);

    await waitFor(() => {
      expect(screen.getByText('Add Fish Sampling')).toBeInTheDocument();
    });
  });

  it('does not render the Add Fish Sampling button if no cycle is available', async () => {
    mockGetLatestCycle.mockResolvedValue(undefined);

    render(<AddFishSampling pondId={pondId} />);

    await waitFor(() => {
      expect(screen.queryByText('Add Fish Sampling')).not.toBeInTheDocument();
    });
  });

  it('opens modal with FishSamplingForm when Add Fish Sampling button is clicked', async () => {
    mockGetLatestCycle.mockResolvedValue({
      id: 'test-cycle-id',
      start_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      end_date: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
      supervisor: 'John Doe',
      pond_fish_amount: [{ id: 'test-pond-fish-amount-id', pond_id: 'test-pond-id', fish_amount: 100 }],
    });

    render(<AddFishSampling pondId={pondId} />);

    await waitFor(() => {
      const addButton = screen.getByTestId('add-fish-sampling-button');
      expect(addButton).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByTestId('add-fish-sampling-button'));
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
      pond_fish_amount: [{ id: 'test-pond-fish-amount-id', pond_id: 'test-pond-id', fish_amount: 100 }],
    });

    render(<AddFishSampling pondId={pondId} />);

    await waitFor(() => {
      const addButton = screen.getByText('Add Fish Sampling');
      expect(addButton).toBeInTheDocument();
    });

    // Open modal
    act(() => {
      fireEvent.click(screen.getByText('Add Fish Sampling'));
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
