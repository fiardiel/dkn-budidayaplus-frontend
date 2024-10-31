import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import FishSamplingHistoryPage from '@/app/pond/[id]/fish-sampling/page';
import FishSamplingHistory from '@/components/fish-sampling/FishSamplingHistory';

jest.mock('@/components/fish-sampling/FishSamplingHistory');

describe('FishSamplingHistoryPage', () => {
  it('renders FishSamplingHistory with the correct pondId from params', () => {
    const pondId = 'test-pond-id';
    const mockParams = { params: { id: pondId } };

    render(<FishSamplingHistoryPage {...mockParams} />);

    expect(FishSamplingHistory).toHaveBeenCalledWith({ pondId }, {});
  });
});
