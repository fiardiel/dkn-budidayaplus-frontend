import { render, screen, waitFor, within } from '@testing-library/react';
import { PondQuality } from '@/types/pond-quality';
import { PondQualityHistory } from '@/components/pond-quality';
import { usePondQualityHistory } from '@/hooks/usePondQualityHistory';

jest.mock('@/hooks/usePondQualityHistory', () => ({
  usePondQualityHistory: jest.fn()
}))

const mockPondQuality1: PondQuality = {
  id: '1',
  cycle: '1',
  reporter: '0812345678',
  pond: '1',
  image_name: 'pond1.jpg',
  salinity: 35,
  water_clarity: 8,
  water_circulation: 7.12,
  dissolved_oxygen: 5,
  orp: 200,
  recorded_at: new Date(),
  water_temperature: 25,
  ph_level: 7,
  ammonia: 0.1,
  phosphate: 0.2,
  nitrate: 0.3
}

const mockPondQuality2: PondQuality = {
  id: '2',
  cycle: '1',
  reporter: '0812345678',
  pond: '1',
  image_name: 'pond1.jpg',
  salinity: 35,
  water_clarity: 8,
  water_circulation: 7.12,
  dissolved_oxygen: 5,
  orp: 200,
  recorded_at: new Date(),
  water_temperature: 25,
  ph_level: 7,
  ammonia: 0.1,
  phosphate: 0.2,
  nitrate: 0.3
}

const mockPondQualityHistory = {
  pond_qualities: [mockPondQuality1, mockPondQuality2],
  cycle_id: '1'
}

describe('PondQualityHistory', () => {
  it('renders the pond quality history table', async () => {
    (usePondQualityHistory as jest.Mock).mockReturnValue(mockPondQualityHistory)

    render(<PondQualityHistory pondId='1' />)

    expect(usePondQualityHistory).toHaveBeenCalledWith('1')

    await waitFor(() => {
      const table = screen.getByRole('table')
      const tableBody = table.querySelector('tbody')
      expect(tableBody).toBeInTheDocument()

      const rows = within(tableBody as HTMLElement).getAllByRole('row')
      expect(rows).toHaveLength(2)
    })
  })

  it('renders the pond quality history table without pond qualities', async () => {
    (usePondQualityHistory as jest.Mock).mockReturnValue({ pond_qualities: [], cycle_id: '1' })

    render(<PondQualityHistory pondId='1' />)

    await waitFor(() => {
      const table = screen.getByRole('table')
      expect(table).toBeInTheDocument()

      const errorText = screen.getByText('Tidak ada data')
      expect(errorText).toBeInTheDocument() 
    })
  })

  it('renders the pond quality history table when fetch fails', async () => {
    (usePondQualityHistory as jest.Mock).mockReturnValue(undefined)

    render(<PondQualityHistory pondId='1' />)

    await waitFor(() => {
      const table = screen.getByRole('table')
      expect(table).toBeInTheDocument()

      const errorText = screen.getByText('Tidak ada data')
      expect(errorText).toBeInTheDocument() 
    })
  })

})