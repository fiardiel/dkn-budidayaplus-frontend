import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import PondQualityList from '@/components/pond-quality/PondQualityList';
import { PondQuality } from '@/types/pond-quality';
import { formatDate } from 'date-fns';
import { id } from 'date-fns/locale';

const mockPondQuality: PondQuality = {
  cycle: '1',
  id: 'abcde',
  pond: 'abcde',
  reporter: '0812345678',
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

describe('PondQualityList', () => {
  it('renders the pond quality list', async () => {
    render(<PondQualityList pondQuality={mockPondQuality} />);

    await waitFor(() => {
      expect(screen.getByText('Suhu (°C)')).toBeInTheDocument();
      expect(screen.getByText('25°C')).toBeInTheDocument();
      expect(screen.getByText('pH level')).toBeInTheDocument();
      expect(screen.getByText('7.5')).toBeInTheDocument();
      expect(screen.getByText('Salinitas')).toBeInTheDocument();
      expect(screen.getByText('35')).toBeInTheDocument();
      expect(screen.getByText('Kecerahan (cm)')).toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument();
      expect(screen.getByText('Sirkulasi')).toBeInTheDocument();
      expect(screen.getByText('7.12')).toBeInTheDocument();
      expect(screen.getByText('DO (mg/L)')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('ORP')).toBeInTheDocument();
      expect(screen.getByText('200')).toBeInTheDocument();
      expect(screen.getByText('NH')).toBeInTheDocument();
      expect(screen.getByText('0.112')).toBeInTheDocument();
      expect(screen.getByText('NO')).toBeInTheDocument();
      expect(screen.getByText('0.134')).toBeInTheDocument();
      expect(screen.getByText('PO')).toBeInTheDocument();
      expect(screen.getByText('0.144')).toBeInTheDocument();
      expect(screen.getByText(`Laporan terakhir: ${formatDate(mockPondQuality.recorded_at, 'EEEE, dd MMMM yyyy', { locale: id })}`)).toBeInTheDocument();
    });
  });

  it('renders the pond quality list with both temperature and pH outside thresholds', async () => {
    const updatedPondQuality = { ...mockPondQuality, water_temperature: 15, ph_level: 9 }; // both out of thresholds

    render(<PondQualityList pondQuality={updatedPondQuality} />);

    await waitFor(() => {
      // Check that the temperature and pH values are displayed correctly
      expect(screen.getByText('15°C')).toBeInTheDocument();
      expect(screen.getByText('9')).toBeInTheDocument();

      // Check that both have the red color class
      const tempElement = screen.getByText('15°C').closest('p');
      expect(tempElement).toHaveClass('text-red-500');

      const phElement = screen.getByText('9').closest('p');
      expect(phElement).toHaveClass('text-red-500');
    });
  });

  it('renders no pond quality message', async () => {
    const mockPondQualityUndefined = undefined;
    render(<PondQualityList pondQuality={mockPondQualityUndefined} />);

    await waitFor(() => {
      expect(screen.getByText('Tidak ada data kualitas air')).toBeInTheDocument();
    });
  });

  it('renders the threshold status with violations in a popover', async () => {
    const thresholdStatus = 'Moderat';
    const violations = ['pH level out of range', 'Temperature too low'];

    render(<PondQualityList pondQuality={mockPondQuality} thresholdStatus={thresholdStatus} violations={violations} />);

    await waitFor(() => {
      const button = screen.getByText(`Kolam ${thresholdStatus}`);
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('text-yellow-500');

      // Click the button to open the popover
      fireEvent.click(button);

      // Check that the popover content is displayed
      expect(screen.getByText('Violations:')).toBeInTheDocument();
      expect(screen.getByText('pH level out of range')).toBeInTheDocument();
      expect(screen.getByText('Temperature too low')).toBeInTheDocument();
    });
  });

  it('renders the threshold status without violations in a popover', async () => {
    const thresholdStatus = 'Sehat';
    const violations: string[] = [];

    render(<PondQualityList pondQuality={mockPondQuality} thresholdStatus={thresholdStatus} violations={violations} />);

    await waitFor(() => {
      const button = screen.getByText(`Kolam ${thresholdStatus}`);
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('text-white');

      fireEvent.click(button);

      expect(screen.getByText('Violations:')).toBeInTheDocument();
      expect(screen.getByText('Tidak ada ambang batas kualitas kolam yang terlampaui')).toBeInTheDocument();
    });
  });
});