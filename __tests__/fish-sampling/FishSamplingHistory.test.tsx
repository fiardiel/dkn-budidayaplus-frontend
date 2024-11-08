import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FishSamplingHistory from '@/components/fish-sampling/FishSamplingHistory';
import { useFishSamplingHistory } from '@/hooks/useFishSamplingHistory';

jest.mock('@/hooks/useFishSamplingHistory');
const mockUseFishSamplingHistory = useFishSamplingHistory as jest.MockedFunction<typeof useFishSamplingHistory>;

describe('FishSamplingHistory', () => {
  const pondId = 'test-pond-id';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders "No sampling history available" when there is no data', () => {
    mockUseFishSamplingHistory.mockReturnValue(
        {
            fish_samplings: [],
            cycle_id: 'test-cycle-id'
        }
    );
    render(<FishSamplingHistory pondId={pondId} />);

    expect(screen.getByText('No sampling history available.')).toBeInTheDocument();
  });

  it('renders table headers with icons', () => {
    mockUseFishSamplingHistory.mockReturnValue(
        {
            fish_samplings: [
                {
                    pond_id: '1',
                    sampling_id: '1',
                    fish_weight: 3,
                    fish_length: 10,
                    sample_date: '2024-10-31',
                },
            ],
            cycle_id: 'test-cycle-id'
        }
    );

    render(<FishSamplingHistory pondId={pondId} />);

    expect(screen.getByText('Weight')).toBeInTheDocument();
    expect(screen.getByText('(kg)')).toBeInTheDocument();
    expect(screen.getByText('Length')).toBeInTheDocument();
    expect(screen.getByText('(cm)')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
  });

  it('renders table rows with sampling data', () => {
    const mockData = {
      fish_samplings: [
        {
          pond_id: '1',
          sampling_id: '1',
          fish_weight: 3,
          fish_length: 10,
          sample_date: '2024-10-31',
        },
        {
          pond_id: '1',
          sampling_id: '2',
          fish_weight: 5,
          fish_length: 15,
          sample_date: '2024-11-01',
        },
      ],
        cycle_id: 'test-cycle-id'
    };
    mockUseFishSamplingHistory.mockReturnValue(mockData);

    render(<FishSamplingHistory pondId={pondId} />);

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText(new Date('2024-10-31').toLocaleDateString())).toBeInTheDocument();

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText(new Date('2024-11-01').toLocaleDateString())).toBeInTheDocument();
  });
});
