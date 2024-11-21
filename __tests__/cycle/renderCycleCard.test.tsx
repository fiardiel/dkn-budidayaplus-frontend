import { render, screen } from '@testing-library/react';
import { renderCycleCard } from '@/components/cycle';
import { Cycle } from '@/types/cycle';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Carousel } from '@/components/ui/carousel';

const mockCycle: Cycle = {
  id: 'abcde',
  start_date: new Date(),
  end_date: new Date(),
  supervisor: 'supervisor',
  pond_fish_amount: []
};

describe('renderCycleCard', () => {
  it('should render the cycle card with active state', () => {
    render(
      <Carousel>
        {renderCycleCard(mockCycle, "Siklus Aktif", "bg-blue-500", "text-gray-300")}
      </Carousel>
    );

    expect(screen.getByText('Siklus Aktif')).toBeInTheDocument();
    expect(screen.getByText(`${format(mockCycle.start_date, 'dd/MM/yy', { locale: id })} - ${format(mockCycle.end_date, 'dd/MM/yy', { locale: id })}`)).toBeInTheDocument();
    expect(screen.getByText('Stop Siklus')).toBeInTheDocument();
  });

  it('should render the cycle card with stopped state', () => {
    render(
      <Carousel>
        {renderCycleCard(mockCycle, "Siklus Aktif", "bg-blue-500", "text-gray-300", true)}
      </Carousel>
    );

    expect(screen.getByText('Siklus Dihentikan')).toBeInTheDocument();
    expect(screen.getByText(`${format(mockCycle.start_date, 'dd/MM/yy', { locale: id })} - ${format(mockCycle.end_date, 'dd/MM/yy', { locale: id })}`)).toBeInTheDocument();
    expect(screen.queryByText('Stop Siklus')).not.toBeInTheDocument();
  });

  it('should call onStopCycle when stop button is clicked', () => {
    const mockOnStopCycle = jest.fn();

    render(
      <Carousel>
        {renderCycleCard(mockCycle, "Siklus Aktif", "bg-blue-500", "text-gray-300", false, mockOnStopCycle)}
      </Carousel>
    );

    const stopButton = screen.getByText('Stop Siklus');
    stopButton.click();

    expect(mockOnStopCycle).toHaveBeenCalledTimes(1);
    expect(mockOnStopCycle).toHaveBeenCalledWith(mockCycle.id);
  });
});
