import { render, screen } from '@testing-library/react';

import { renderCycleCard } from '@/components/cycle';
import { Cycle } from '@/types/cycle';
import { formatDate } from 'date-fns';
import { id } from 'date-fns/locale';
import { Carousel } from '@/components/ui/carousel';

const mockCycle: Cycle = {
  id: 'abcde',
  start_date: new Date(),
  end_date: new Date(),
  supervisor: 'supervisor',
  pond_fish_amount: []
}


describe('renderCycleCard', () => {
  it('should render the cycle card', () => {
    render(
      <Carousel>
        {renderCycleCard(mockCycle, "Siklus Aktif", "bg-blue-500", "text-gray-300")}
      </Carousel>
    ); expect(screen.getByText('Siklus Aktif')).toBeInTheDocument()
    expect(screen.getByText(`${formatDate(mockCycle.start_date, 'dd/MM/yy', { locale: id })} - ${formatDate(mockCycle.end_date, 'dd/MM/yy', { locale: id })}`)).toBeInTheDocument()
    expect(screen.getByText('Stop Siklus')).toBeInTheDocument()
  })
})

