import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import { AddCycleModal } from '@/components/cycle';
import { createCycle } from '@/lib/cycle';
import { Pond } from '@/types/pond';

jest.mock('@/lib/cycle', () => ({
  createCycle: jest.fn(),
}));

const mockPonds: Pond[] = [
  {
    pond_id: '1',
    name: 'Pond 1',
    length: 10,
    width: 10,
    depth: 10,
    image_name: 'pond1.jpg',
  },
  {
    pond_id: '2',
    name: 'Pond 2',
    length: 10,
    width: 10,
    depth: 10,
    image_name: 'pond2.jpg',
  },
]

describe('Add Cycle Modal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('renders the form fields correctly', async () => {
    render(<AddCycleModal ponds={mockPonds} />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /mulai siklus/i }));
    });

    expect(screen.getByPlaceholderText('Tanggal Mulai')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tanggal Selesai')).toBeInTheDocument();
    expect(screen.getByText('Pond 1')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Jumlah ikan pada kolam Pond 1')).toBeInTheDocument();
    expect(screen.getByText('Pond 2')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Jumlah ikan pada kolam Pond 2')).toBeInTheDocument();
  });

  it('closes the modal after successful form submission', async () => {
    (createCycle as jest.Mock).mockResolvedValue({ success: true, message: 'Cycle created' });

    render(<AddCycleModal ponds={mockPonds} />);
    fireEvent.click(screen.getByRole('button', { name: /mulai siklus/i }));
    fireEvent.change(screen.getByPlaceholderText('Tanggal Mulai'), { target: { value: '2021-08-01' } });
    fireEvent.change(screen.getByPlaceholderText('Tanggal Selesai'), { target: { value: '2021-09-30' } });
    fireEvent.change(screen.getByPlaceholderText('Jumlah ikan pada kolam Pond 1'), { target: { value: '1000' } });
    fireEvent.change(screen.getByPlaceholderText('Jumlah ikan pada kolam Pond 2'), { target: { value: '2000' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    expect(createCycle).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  })

  it('shows error message when start date is after end date', async () => {
    render(<AddCycleModal ponds={mockPonds} />);
    fireEvent.click(screen.getByRole('button', { name: /mulai siklus/i }));

    fireEvent.change(screen.getByPlaceholderText('Tanggal Mulai'), { target: { value: '2021-08-15' } });
    fireEvent.change(screen.getByPlaceholderText('Tanggal Selesai'), { target: { value: '2021-08-01' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    await waitFor(() => {
      expect(screen.getByText('Tanggal akhir harus setelah tanggal mulai')).toBeInTheDocument();
    })
  })

  it('shows error message when cycle duration is not 60 days', async () => { 
    render(<AddCycleModal ponds={mockPonds} />);
    fireEvent.click(screen.getByRole('button', { name: /mulai siklus/i }));

    fireEvent.change(screen.getByPlaceholderText('Tanggal Mulai'), { target: { value: '2021-08-01' } });
    fireEvent.change(screen.getByPlaceholderText('Tanggal Selesai'), { target: { value: '2021-08-02' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    await waitFor(() => {
      expect(screen.getByText('Durasi siklus harus 60 hari')).toBeInTheDocument();
    })
  })

  it('shows error message when the server has an error, not reached, or invalid input from the server', async () => {
    (createCycle as jest.Mock).mockRejectedValue(new Error('Gagal membuat siklus tambak'));

    render(<AddCycleModal ponds={mockPonds} />);
    fireEvent.click(screen.getByRole('button', { name: /mulai siklus/i }));
    fireEvent.change(screen.getByPlaceholderText('Tanggal Mulai'), { target: { value: '2021-08-01' } });
    fireEvent.change(screen.getByPlaceholderText('Tanggal Selesai'), { target: { value: '2021-09-30' } });
    fireEvent.change(screen.getByPlaceholderText('Jumlah ikan pada kolam Pond 1'), { target: { value: '1000' } });
    fireEvent.change(screen.getByPlaceholderText('Jumlah ikan pada kolam Pond 2'), { target: { value: '2000' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    await waitFor(() => {
      expect(screen.getByText('Gagal membuat siklus tambak')).toBeInTheDocument();
    });
  })

  it('doesnt allow form submission when any of the fields are invalid', async () => { 
    render(<AddCycleModal ponds={mockPonds} />);
    fireEvent.click(screen.getByRole('button', { name: /mulai siklus/i }));

    fireEvent.change(screen.getByPlaceholderText('Tanggal Mulai'), { target: { value: '2021-08-01' } });
    fireEvent.change(screen.getByPlaceholderText('Tanggal Selesai'), { target: { value: '2021-09-30' } });
    fireEvent.change(screen.getByPlaceholderText('Jumlah ikan pada kolam Pond 1'), { target: { value: '1000' } });
    fireEvent.change(screen.getByPlaceholderText('Jumlah ikan pada kolam Pond 2'), { target: { value: '-2000' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    await waitFor(() => {
      expect(createCycle).not.toHaveBeenCalled();
    })
  })

  it('does not close the modal when there is an error', async () => {
    (createCycle as jest.Mock).mockRejectedValue(new Error('Gagal membuat siklus tambak'));

    render(<AddCycleModal ponds={mockPonds} />);
    fireEvent.click(screen.getByRole('button', { name: /mulai siklus/i }));
    fireEvent.change(screen.getByPlaceholderText('Tanggal Mulai'), { target: { value: '2021-08-01' } });
    fireEvent.change(screen.getByPlaceholderText('Tanggal Selesai'), { target: { value: '2021-09-30' } });
    fireEvent.change(screen.getByPlaceholderText('Jumlah ikan pada kolam Pond 1'), { target: { value: '1000' } });
    fireEvent.change(screen.getByPlaceholderText('Jumlah ikan pada kolam Pond 2'), { target: { value: '2000' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    })
  })


})