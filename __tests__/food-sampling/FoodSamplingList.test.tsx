import { render, screen, waitFor } from '@testing-library/react';
import FoodSamplingList from '@/components/food-sampling/FoodSamplingList';
import { FoodSampling } from '@/types/food-sampling';
import { formatDateTime } from '@/lib/utils';
import { renderSamplingData } from '@/lib/food-sampling';

jest.mock('@/lib/food-sampling', () => ({
  renderSamplingData: jest.fn(),
}));

const mockFoodSampling: FoodSampling = {
  sampling_id: 'sample123',
  pond_id: 'abcde',
  cycle_id: 'cycle123',
  food_quantity: 150,
  sample_date: new Date('2024-10-03'),
};

describe('FoodSamplingList', () => {
  beforeEach(() => {
    (renderSamplingData as jest.Mock).mockReset();
  });

  it('renders the food sampling list with data and custom label', async () => {
    (renderSamplingData as jest.Mock).mockReturnValue([
      {
        id: '1',
        label: 'Custom Label',
        value: 150,
        sampleDate: formatDateTime(mockFoodSampling.sample_date),
      },
    ]);

    render(<FoodSamplingList foodSampling={mockFoodSampling} />);

    await waitFor(() => {
      expect(screen.getByText('Custom Label')).toBeInTheDocument();
      expect(screen.getByText('150')).toBeInTheDocument();
      expect(screen.getByText(`Tanggal: ${formatDateTime(mockFoodSampling.sample_date)}`)).toBeInTheDocument();
    });
  });

  it('renders the food sampling list with default label when label is missing', async () => {
    // Mock data without label to trigger fallback
    (renderSamplingData as jest.Mock).mockReturnValue([
      {
        id: '1',
        value: 150,
        sampleDate: formatDateTime(mockFoodSampling.sample_date),
      },
    ]);

    render(<FoodSamplingList foodSampling={mockFoodSampling} />);

    await waitFor(() => {
      expect(screen.getByText('Kuantitas Makanan (gram)')).toBeInTheDocument(); // Check for fallback label
      expect(screen.getByText('150')).toBeInTheDocument();
      expect(screen.getByText(`Tanggal: ${formatDateTime(mockFoodSampling.sample_date)}`)).toBeInTheDocument();
    });
  });

  it('renders no food sampling message when data is undefined', async () => {
    render(<FoodSamplingList foodSampling={undefined} />);

    await waitFor(() => {
      expect(screen.getByText('Tidak ada data sampling makanan')).toBeInTheDocument();
    });
  });
});
