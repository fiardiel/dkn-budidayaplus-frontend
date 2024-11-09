import { render, screen } from '@testing-library/react';
import PondQualityHistoryPage from '@/app/pond/[id]/pond-quality/page';

jest.mock('@/components/pond-quality', () => ({
  PondQualityHistory: ({ pondId }: { pondId: string }) => (
    <div data-testid='pond-quality-history'>{pondId}</div>
  )
}))

describe('PondQualityHistoryPage', () => {
  it('renders the pond quality history page', () => {
    const params = { id: '1' }
    render(<PondQualityHistoryPage params={params} />)

    const pondQualityHistory = screen.getByTestId('pond-quality-history')
    expect(pondQualityHistory).toBeInTheDocument()
  }) 
})