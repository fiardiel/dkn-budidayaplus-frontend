import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FoodSamplingForm } from '@/components/food-sampling';  
import { addFoodSampling } from '@/lib/food-sampling';

jest.mock('@/lib/food-sampling', () => ({
  addFoodSampling: jest.fn(),
}));

describe('FoodSamplingForm', () => {
  const mockSetIsModalOpen = jest.fn();
  const pondId = 'abcde';
  const cycleId = '23456;'

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly with initial values', () => {
    render(<FoodSamplingForm pondId={pondId} cycleId={cycleId}  setIsModalOpen={mockSetIsModalOpen} />);

    expect(screen.getByPlaceholderText('Kuantitas Makanan')).toBeInTheDocument();
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
      expect(addFoodSampling).toHaveBeenCalledWith(pondId, cycleId, expect.any(FormData));
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
});