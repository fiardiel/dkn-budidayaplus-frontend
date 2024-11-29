import { render, screen, waitFor } from '@testing-library/react'
import CycleList from '@/components/cycle/CycleList'
import { getCycleList } from '@/lib/cycle'

jest.mock('@/lib/cycle', () => ({
  getCycleList: jest.fn()
}))

jest.mock('@/components/cycle', () => ({
  CycleCarousel: () => <div data-testid='cycleCarousel'></div>,
}))

const mockCycleList = {
  active: [{
    id: '1'
  }],
  past: [{
    id: '2'
  }],
  future: [{
    id: '3'
  }]
}

describe('CycleList', () => {
  it('renders the cycle list component', async () => {
    (getCycleList as jest.Mock).mockResolvedValue(mockCycleList)
    const ui = await CycleList({ className: 'test' })
    render(ui);

    await waitFor(() => {
      expect(screen.getByTestId('cycleCarousel')).toBeInTheDocument()
    })
  })
})
