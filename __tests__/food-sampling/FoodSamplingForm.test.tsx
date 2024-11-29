import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FoodSamplingForm } from '@/components/food-sampling';
import { addFoodSampling } from '@/lib/food-sampling'; import { FoodSampling } from '@/types/food-sampling';

const originalReload = window.location.reload;

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: { ...window.location, reload: jest.fn() },
  });
});
afterAll(() => {
  window.location.reload = originalReload;
});

jest.mock('@/lib/food-sampling', () => ({
  addFoodSampling: jest.fn(),
}));

describe('FoodSamplingForm', () => {
  const mockSetIsModalOpen = jest.fn();
  const pondId = 'abcde';
  const cycleId = '23456;'

  const foodSampling: FoodSampling = {
    sampling_id: 'abc123',
    pond_id: pondId,
    cycle_id: cycleId,
    food_quantity: 1500,
    reporter: 'Rafi',
    recorded_at: new Date('2024-10-01'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly with initial values', () => {
    render(<FoodSamplingForm pondId={pondId} cycleId={cycleId} setIsModalOpen={mockSetIsModalOpen} />);

    expect(screen.getByPlaceholderText('Kuantitas Makanan')).toHaveValue(0);
  });

  it('displays validation errors if form fields are empty', async () => {
    render(<FoodSamplingForm pondId={pondId} cycleId={cycleId} setIsModalOpen={mockSetIsModalOpen} />);

    fireEvent.input(screen.getByPlaceholderText('Kuantitas Makanan'), { target: { value: '' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Simpan' }));

    await waitFor(() => {
      const errorMessages = screen.getAllByText('Expected number, received nan');
      expect(errorMessages.length).toBe(1);
    });
  });

  it('submits the form successfully when data is valid', async () => {
    (addFoodSampling as jest.Mock).mockResolvedValue({ success: true });

    render(<FoodSamplingForm pondId={pondId} cycleId={cycleId} setIsModalOpen={mockSetIsModalOpen} />);

    fireEvent.input(screen.getByPlaceholderText('Kuantitas Makanan'), { target: { value: '30' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Simpan' }));

    await waitFor(() => {
      expect(addFoodSampling).toHaveBeenCalledWith({ food_quantity: 30 }, pondId, cycleId);
      expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
    });
  });

  it('shows an error message if form submission fails', async () => {
    (addFoodSampling as jest.Mock).mockResolvedValue({ success: false });

    render(<FoodSamplingForm pondId={pondId} cycleId={cycleId} setIsModalOpen={mockSetIsModalOpen} />);

    fireEvent.input(screen.getByPlaceholderText('Kuantitas Makanan'), { target: { value: '30' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Simpan' }));

    await waitFor(() => {
      expect(screen.getByText('Gagal menyimpan sample makanan')).toBeInTheDocument();
    });
  });

  it('displays the error message when the API call throws an error', async () => {
    (addFoodSampling as jest.Mock).mockRejectedValue(new Error('Network error'));

    render(<FoodSamplingForm pondId={pondId} cycleId={cycleId} setIsModalOpen={mockSetIsModalOpen} />);

    fireEvent.input(screen.getByPlaceholderText('Kuantitas Makanan'), { target: { value: '30' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Simpan' }));

    await waitFor(() => {
      expect(screen.getByText('Gagal menyimpan sample makanan')).toBeInTheDocument();
    });
  });

  it('submits the form with food quantity greater than threshold', async () => {
    (addFoodSampling as jest.Mock).mockResolvedValue({ success: true });

    render(<FoodSamplingForm pondId={pondId} cycleId={cycleId} setIsModalOpen={mockSetIsModalOpen} />);

    fireEvent.input(screen.getByPlaceholderText('Kuantitas Makanan'), { target: { value: '1500' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Simpan' }));

    await waitFor(() => {
      expect(addFoodSampling).toHaveBeenCalledWith({ food_quantity: 1500 }, pondId, cycleId);
      expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
    });
  });
});
