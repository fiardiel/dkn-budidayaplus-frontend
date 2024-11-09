import PondQuality from '@/components/pond-quality/PondQuality';
import { getLatestCycle } from '@/lib/cycle';
import { getLatestPondQuality } from '@/lib/pond-quality';
import { render, screen, waitFor } from '@testing-library/react';

jest.mock('@/lib/pond-quality', () => ({
  getLatestPondQuality: jest.fn()
}))

jest.mock('@/lib/cycle', () => ({
  getLatestCycle: jest.fn()
}))

jest.mock('@/components/pond-quality', () => ({
  AddPondQuality: jest.fn().mockReturnValue(<div data-testid='add-pond-quality' />),
  ViewPondQualityHistory: jest.fn().mockReturnValue(<div data-testid='view-pond-quality-history' />),
  PondQualityList: jest.fn().mockReturnValue(<div data-testid='pond-quality-list' />),
}))

describe('PondQuality', () => {
  beforeEach(() => {
    (getLatestPondQuality as jest.Mock).mockReturnValue(
      {
        id: '1',
        pond_id: 'abcde',
        cycle: '1',
        reporter: '0812345678',
        recorded_at: new Date(),
        image_name: 'pond1.jpg',
        ph_level: 7.5,
        water_temperature: 25,
        water_clarity: 8,
        water_circulation: 7.12,
        dissolved_oxygen: 5,
        orp: 200,
        ammonia: 0.112,
        nitrate: 0.134,
        phosphate: 0.144,
      }
    );
    (getLatestCycle as jest.Mock).mockReturnValue({
      id: '1',
      start_date: new Date(),
      end_date: new Date(),
      supervisor: '0812345678',
      pond_fish_amount: [
        {
          id: '1',
          pond_id: 'abcde',
          fish_amount: 10,
        },
      ],
    })
  });

  it('renders the pond quality component', async () => {
    const props = {
      pondId: 'abcde',
      className: 'test-class',
    }
    const ui = await PondQuality(props)
    render(ui);

    await waitFor(() => {
      expect(screen.getByTestId('pond-quality-list')).toBeInTheDocument()
      expect(screen.getByTestId('add-pond-quality')).toBeInTheDocument()
      expect(screen.getByTestId('view-pond-quality-history')).toBeInTheDocument()
    })
  })

  it('renders the component without the cycle', async () => {
    (getLatestCycle as jest.Mock).mockResolvedValue(undefined)

    const props = {
      pondId: 'abcde',
      className: 'test-class',
    }
    const ui = await PondQuality(props)
    render(ui);

    await waitFor(() => {
      expect(screen.queryByText('Tambah Kualitas Air')).toBeNull()
      expect(screen.queryByText('Lihat Riwayat Kualitas Air')).toBeNull()
    })
  })

  it('handles cycle fetch error', async () => {
    (getLatestCycle as jest.Mock).mockRejectedValue(new Error('Error'))
    const props = {
      pondId: 'pond-id',
      className: 'test-class',
    }
    const ui = await PondQuality(props)
    render(ui);

    await waitFor(() => {
      expect(screen.queryByText('Tambah Kualitas Air')).toBeNull()
      expect(screen.queryByText('Lihat Riwayat Kualitas Air')).toBeNull()
    })
  })

  it('handles pond quality fetch error', async () => {
    (getLatestPondQuality as jest.Mock).mockRejectedValueOnce(new Error('Error'));

    const props = {
      pondId: 'pond-id',
      className: 'test-class',
    }

    const ui = await PondQuality(props)
    render(ui);

    await waitFor(() => {
      expect(screen.queryByText('Tambah Kualitas Air')).toBeNull()
      expect(screen.queryByText('Lihat Riwayat Kualitas Air')).toBeNull()
    })
  })
})
