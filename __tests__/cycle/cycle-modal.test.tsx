import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import { AddCycleModal } from '@/components/cycle';
import { createCycle } from '@/lib/cycle';
import { Pond } from '@/types/pond';
import { fetchPonds } from '@/lib/pond';
import { addDays, format } from 'date-fns';

jest.mock('@/lib/cycle', () => ({
  createCycle: jest.fn(),
}));

jest.mock('@/lib/pond', () => ({
  fetchPonds: jest.fn()
}))

const currentDate = new Date()
const currentMonth = currentDate.getMonth()
const currentYear = currentDate.getFullYear()
const dateForTest = new Date(currentYear, currentMonth, 15)

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
    (fetchPonds as jest.Mock).mockResolvedValue(mockPonds);
    render(<AddCycleModal />);

    await waitFor(() => {
      expect(fetchPonds).toHaveBeenCalled();
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /mulai siklus/i }));
    });
    
    expect(screen.getByRole('button', { name: /tanggal mulai/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Jumlah ikan kolam Pond 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Jumlah ikan kolam Pond 2')).toBeInTheDocument();
  });


  it('closes the modal after successful form submission', async () => {
    (fetchPonds as jest.Mock).mockResolvedValue(mockPonds);
    (createCycle as jest.Mock).mockResolvedValue({ success: true, message: 'Cycle created' });

    render(<AddCycleModal />);

    await waitFor(() => {
      expect(fetchPonds).toHaveBeenCalled();
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /mulai siklus/i }));
    })

    const button = screen.getByRole('button', { name: /tanggal mulai/i });
    const fishInput1 = screen.getByLabelText('Jumlah ikan kolam Pond 1');
    const fishInput2 = screen.getByLabelText('Jumlah ikan kolam Pond 2');

    fireEvent.change(fishInput1, { target: { value: '1000' } });
    fireEvent.change(fishInput2, { target: { value: '2000' } });
    fireEvent.click(button);
    
    fireEvent.click(screen.getByRole('gridcell', { name: '15' }));

    await waitFor(() => {
      expect(screen.getByText(`Tanggal selesai: ${format(addDays(dateForTest, 60), 'PPP')}`)).toBeInTheDocument();
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    expect(createCycle).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  })


  it('shows error message when form submission succeeds, but the server returns a non 200 response', async () => {
    (fetchPonds as jest.Mock).mockResolvedValue(mockPonds);
    (createCycle as jest.Mock).mockResolvedValue({ success: false, message: 'Anda memiliki tambak yang bertabrakan' });

    render(<AddCycleModal />);

    await waitFor(() => {
      expect(fetchPonds).toHaveBeenCalled();
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /mulai siklus/i }));
    })

    const button = screen.getByRole('button', { name: /tanggal mulai/i });
    const fishInput1 = screen.getByLabelText('Jumlah ikan kolam Pond 1');
    const fishInput2 = screen.getByLabelText('Jumlah ikan kolam Pond 2');

    fireEvent.change(fishInput1, { target: { value: '1000' } });
    fireEvent.change(fishInput2, { target: { value: '2000' } });
    fireEvent.click(button);
    
    fireEvent.click(screen.getByRole('gridcell', { name: '15' }));

    await waitFor(() => {
      expect(screen.getByText(`Tanggal selesai: ${format(addDays(dateForTest, 60), 'PPP')}`)).toBeInTheDocument();
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    expect(createCycle).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText('Anda memiliki tambak yang bertabrakan')).toBeInTheDocument();
    });
  })

  
  it('shows error message when form submission fails', async () => {
    (fetchPonds as jest.Mock).mockResolvedValue(mockPonds);
    (createCycle as jest.Mock).mockRejectedValue(new Error('Network Error'));

    render(<AddCycleModal />);

    await waitFor(() => {
      expect(fetchPonds).toHaveBeenCalled();
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /mulai siklus/i }));
    })

    const button = screen.getByRole('button', { name: /tanggal mulai/i });
    const fishInput1 = screen.getByLabelText('Jumlah ikan kolam Pond 1');
    const fishInput2 = screen.getByLabelText('Jumlah ikan kolam Pond 2');

    fireEvent.change(fishInput1, { target: { value: '1000' } });
    fireEvent.change(fishInput2, { target: { value: '2000' } });
    fireEvent.click(button);
    
    fireEvent.click(screen.getByRole('gridcell', { name: '15' }));

    await waitFor(() => {
      expect(screen.getByText(`Tanggal selesai: ${format(addDays(dateForTest, 60), 'PPP')}`)).toBeInTheDocument();
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    expect(createCycle).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText('Network Error')).toBeInTheDocument();
    });
  })


  it('shows error message if fish amount is filled 0', async () => {
    (fetchPonds as jest.Mock).mockResolvedValue(mockPonds);
    render(<AddCycleModal />);

    await waitFor(() => {
      expect(fetchPonds).toHaveBeenCalled();
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /mulai siklus/i }));
    })

    const button = screen.getByRole('button', { name: /tanggal mulai/i });
    const fishInput1 = screen.getByLabelText('Jumlah ikan kolam Pond 1');
    const fishInput2 = screen.getByLabelText('Jumlah ikan kolam Pond 2');

    fireEvent.change(fishInput1, { target: { value: '0' } });
    fireEvent.change(fishInput2, { target: { value: '2000' } });
    fireEvent.click(button);
    
    fireEvent.click(screen.getByRole('gridcell', { name: '15' }));

    await waitFor(() => {
      expect(screen.getByText(`Tanggal selesai: ${format(addDays(dateForTest, 60), 'PPP')}`)).toBeInTheDocument();
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    });

    expect(createCycle).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText('Jumlah ikan harus lebih besar dari 0')).toBeInTheDocument();
    });
  })
})