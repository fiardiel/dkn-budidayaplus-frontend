import { render, screen, fireEvent } from '@testing-library/react'
import { CycleCarousel } from '@/components/cycle'
import { CycleList } from '@/types/cycle'
import { stopCycle } from '@/lib/cycle';

jest.mock('@/lib/cycle', () => ({
  stopCycle: jest.fn(),
}));

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
  stopped: []
};

jest.mock('@/components/cycle/renderCycleCard', () => ({
  renderCycleCard: (
    cycle: any,
    label: string,
    _bgColor: string,
    _dateTextColor: string,
    isStopped?: boolean,
    onStopCycle?: (id: string) => void
  ) => {
    return (
      <div key={cycle.id} data-testid={`cycleCard-${cycle.id}`}>
        <div>{label}</div>
        {!isStopped && (
          <button data-testid={`stopButton-${cycle.id}`} onClick={() => onStopCycle?.(cycle.id)}>
            Stop Siklus
          </button>
        )}
      </div>
    );
  },
}));

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

describe('CycleCarousel (Additional Tests)', () => {
  it('Handles stop cycle logic and moves active cycle to stopped', async () => {
    (stopCycle as jest.Mock).mockResolvedValueOnce({ success: true, message: 'Siklus berhasil dihentikan' });
    render(<CycleCarousel cycleList={cycleList} />);

    const stopButton = screen.getByTestId('stopButton-1');
    fireEvent.click(stopButton);
    expect(stopCycle).toHaveBeenCalledWith('1');
    await screen.findByText('Siklus Dihentikan');
  });

  it('Shows alert if stop cycle fails', async () => {
    window.alert = jest.fn();
    (stopCycle as jest.Mock).mockResolvedValueOnce({ success: false, message: 'Failed to stop cycle' });

    render(<CycleCarousel cycleList={cycleList} />);

    const stopButton = screen.getByTestId('stopButton-1');
    fireEvent.click(stopButton);

    expect(stopCycle).toHaveBeenCalledWith('1');
  });

  it('Renders stopped cycles correctly', () => {
    const updatedCycleList: CycleList = {
      ...cycleList,
      stopped: [
        {
          id: '2',
          start_date: new Date(),
          end_date: new Date(),
          supervisor: '1',
          pond_fish_amount: [],
        },
      ],
    };

    render(<CycleCarousel cycleList={updatedCycleList} />);
    expect(screen.getByText('Siklus Dihentikan')).toBeInTheDocument();
  });
});

