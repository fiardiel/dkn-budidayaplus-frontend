import { render, screen } from '@testing-library/react'
import { CycleCarousel } from '@/components/cycle'
import { Cycle, CycleList } from '@/types/cycle'

const cycleList: CycleList = {
  active: [{
    id: '1',
    start_date: new Date(),
    end_date: new Date(),
    supervisor: '1',
    pond_fish_amount: []
  }],
  past: [],
  future: [],
};

jest.mock('@/components/cycle/renderCycleCard', () => ({
  renderCycleCard: (cycle: Cycle, label: string, _bgColor: string, _dateTextColor: string) => {
    return (
      <div key={cycle.id} data-testid="cycleCard">
        <div>{label}</div>
      </div>
    )
  }
}))

jest.mock('@/components/ui/carousel', () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CarouselContent: ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div data-testid="carouselContent" className={className}>{children}</div>
  ),
}));

describe('Cycle Carousel', () => {
  it('Applies "justify-start" when totalLength > 1', () => {
    const mockCycleList = {
      ...cycleList,
      past: [{ id: '2', start_date: new Date(), end_date: new Date(), supervisor: '1', pond_fish_amount: [] }],
      future: [{ id: '3', start_date: new Date(), end_date: new Date(), supervisor: '1', pond_fish_amount: [] }]
    };
    render(<CycleCarousel cycleList={mockCycleList} />);
    const carouselContent = screen.getByTestId('carouselContent');
    expect(carouselContent).toHaveClass('justify-start');
  });

  it('Applies "justify-center" when totalLength <= 1', () => {
    render(<CycleCarousel cycleList={cycleList} />);
    const carouselContent = screen.getByTestId('carouselContent');
    expect(carouselContent).toHaveClass('justify-center');
  });
});

