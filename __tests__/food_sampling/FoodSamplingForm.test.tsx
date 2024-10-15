import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FoodSamplingForm } from '@/components/food-sampling';  
import { addFoodSampling } from '@/lib/food-sampling';
import { FoodSampling } from '@/types/food-sampling';

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
    food_quantity: 30,
    sample_date: '2024-10-01',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly with initial values', () => {
    render(<FoodSamplingForm pondId={pondId} cycleId={cycleId} foodSampling={foodSampling} setIsModalOpen={mockSetIsModalOpen} />);

    expect(screen.getByPlaceholderText('Kuantitas Makanan')).toHaveValue(30);
  });

  it('displays validation errors if form fields are empty', async () => {
    render(<FoodSamplingForm pondId={pondId} cycleId={cycleId} foodSampling={foodSampling} setIsModalOpen={mockSetIsModalOpen} />);

    fireEvent.input(screen.getByPlaceholderText('Kuantitas Makanan'), { target: { value: '' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Simpan' }));

    await waitFor(() => {
      const errorMessages = screen.getAllByText('Expected number, received nan');
      expect(errorMessages.length).toBe(2); 
  });
  });

  it('submits the form successfully when data is valid', async () => {
    (addFoodSampling as jest.Mock).mockResolvedValue({ success: true });

    render(<FoodSamplingForm pondId={pondId} cycleId={cycleId} foodSampling={foodSampling} setIsModalOpen={mockSetIsModalOpen} />);

    fireEvent.input(screen.getByPlaceholderText('Kuantitas Makanan'), { target: { value: '30' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Simpan' }));

    await waitFor(() => {
      expect(addFoodSampling).toHaveBeenCalledWith(expect.any(FormData), pondId);
      expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
    });
  });

  it('shows an error message if form submission fails', async () => {
    (addFoodSampling as jest.Mock).mockResolvedValue({ success: false });

    render(<FoodSamplingForm pondId={pondId} cycleId={cycleId} foodSampling={foodSampling} setIsModalOpen={mockSetIsModalOpen} />);

    fireEvent.input(screen.getByPlaceholderText('Kuantitas Makanan'), { target: { value: '30' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Simpan' }));

    await waitFor(() => {
      expect(screen.getByText('Gagal menyimpan sample makanan')).toBeInTheDocument();
    });
  });

  it('displays the error message when the API call throws an error', async () => {
    (addFoodSampling as jest.Mock).mockRejectedValue(new Error('Network error'));

    render(<FoodSamplingForm pondId={pondId} cycleId={cycleId} foodSampling={foodSampling} setIsModalOpen={mockSetIsModalOpen} />);

    fireEvent.input(screen.getByPlaceholderText('Kuantitas Makanan'), { target: { value: '30' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Simpan' }));

    await waitFor(() => {
      expect(screen.getByText('Gagal menyimpan sample makanan')).toBeInTheDocument();
    });
  });
});