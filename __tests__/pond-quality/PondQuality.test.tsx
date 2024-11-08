import { render, screen, waitFor } from '@testing-library/react';
import { PondQuality as PondQualityComponent } from '@/components/pond-quality';
import { Pond } from '@/types/pond';
import { PondQuality } from '@/types/pond-quality';
import User from '@/types/auth/user';
import { usePondQuality } from '@/hooks/usePondQuality';

jest.mock('@/hooks/usePondQuality', () => {
  const mockPond: Pond = {
    pond_id: 'abcde',
    name: 'Pond 1',
    length: 121.0,
    width: 121.0,
    depth: 121.0,
    image_name: 'pond1.jpg',
  };
  
  const mockUser: User = {
    id: 1,
    phone_number: '0812345678',
    first_name: 'John',
    last_name: 'Doe',
  }
  
  const mockPondQuality: PondQuality = {
    cycle: '1',
    id: 'abcde',
    pond: mockPond.pond_id,
    reporter: mockUser.phone_number,
    recorded_at: new Date(),
    image_name: 'pond1.jpg',
    ph_level: 7.5,
    salinity: 35,
    water_temperature: 25,
    water_clarity: 8,
    water_circulation: 7.12,
    dissolved_oxygen: 5,
    orp: 200,
    ammonia: 0.112,
    nitrate: 0.134,
    phosphate: 0.144,
  };
  return  {
    usePondQuality: jest.fn().mockReturnValue({ pondQuality: mockPondQuality, cycle: { id: '1' } })
  }
})

describe('PondQuality', () => {
  it('renders the pond quality component', async () => {
    render(<PondQualityComponent pondId='1'/>)

    await waitFor(() => {

      expect(screen.getByTestId('pond-quality-list')).toBeInTheDocument()
      expect(screen.getByTestId('add-pond-quality')).toBeInTheDocument()
      expect(screen.getByTestId('view-pond-quality-history')).toBeInTheDocument()
    })
  })

  it('renders the pond quality component without the cycle', async () => {
    (usePondQuality as jest.Mock).mockReturnValue({ pondQuality: undefined, cycle: undefined })
    render(<PondQualityComponent pondId='1' />)
    await waitFor(() => {
      expect(screen.getByTestId('pond-quality-list')).toBeInTheDocument()
      expect(screen.queryByTestId('add-pond-quality')).not.toBeInTheDocument()
      expect(screen.queryByTestId('view-pond-quality-history')).not.toBeInTheDocument()
    })
  })
})