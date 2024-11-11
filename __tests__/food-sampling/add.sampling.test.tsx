import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import { addFoodSampling } from '@/lib/food-sampling';
import { AddFoodSampling } from '@/components/food-sampling';

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

describe('Add Food Sampling Modal', () => {
  const pondId = 'test-pond-id';
  const cycleId = 'test-cycle-id';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form fields correctly', async () => {
    render(<AddFoodSampling pondId={pondId} cycleId={cycleId} />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /sample/i }));
    });

    expect(screen.getByPlaceholderText('Kuantitas Makanan')).toBeInTheDocument();
  });

  it('closes the modal after successful form submission', async () => {

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      } as Response)
    );

    const mockResponse = { success: true, message: 'Food Sampling added' };
    (addFoodSampling as jest.Mock).mockResolvedValue(mockResponse);

    render(<AddFoodSampling pondId={pondId} cycleId={cycleId} />);

    fireEvent.click(screen.getByRole('button', { name: /sample/i }));

    fireEvent.change(screen.getByPlaceholderText('Kuantitas Makanan'), { target: { value: '30' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('displays error message when backend says food sampling creation failed', async () => {
    const mockResponse = { success: false, message: 'Failed to create food sampling' };
    (addFoodSampling as jest.Mock).mockResolvedValue(mockResponse);

    render(<AddFoodSampling pondId={pondId} cycleId={cycleId} />);

    fireEvent.click(screen.getByRole('button', { name: /sample/i }));

    fireEvent.change(screen.getByPlaceholderText('Kuantitas Makanan'), { target: { value: '30' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    await waitFor(() => {
      expect(screen.getByText('Gagal menyimpan sample makanan')).toBeInTheDocument();
    });
  });


  it('displays error message and sets error state when form submission fails', async () => {
    const mockError = new Error('Gagal menambah sampling makanan');
    (addFoodSampling as jest.Mock).mockRejectedValueOnce(mockError);


    render(<AddFoodSampling pondId={pondId} cycleId={cycleId} />);

    fireEvent.click(screen.getByRole('button', { name: /sample/i }));

    fireEvent.change(screen.getByPlaceholderText('Kuantitas Makanan'), { target: { value: '30' } });

    fireEvent.click(screen.getByRole('button', { name: /Simpan/i }));

    await waitFor(() => {
      expect(screen.getByText('Gagal menyimpan sample makanan')).toBeInTheDocument();
    });
  });

  it('does not allow form submission when any of the fields are invalid', async () => {
    render(<AddFoodSampling pondId={pondId} cycleId={cycleId} />);

    fireEvent.click(screen.getByRole('button', { name: /sample/i }));

    fireEvent.change(screen.getByPlaceholderText('Kuantitas Makanan'), { target: { value: '-2' } });

    fireEvent.click(screen.getByRole('button', { name: /Simpan/i }));

    await waitFor(() => {
      expect(screen.getByText('Kuantitas makanan harus berupa angka positif')).toBeInTheDocument();
      expect(addFoodSampling).not.toHaveBeenCalled();
    });
  });
});
