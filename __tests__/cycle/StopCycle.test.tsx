import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import StopCycle from '@/components/cycle/StopCycle';
import { stopCycle } from '@/lib/cycle';
import { useToast } from '@/hooks/use-toast';

jest.mock('@/lib/cycle', () => ({
  stopCycle: jest.fn(),
}))

jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
}))

describe('StopCycle', () => {
  const mockToast = jest.fn()

  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the stop cycle modal', () => {
    (stopCycle as jest.Mock).mockResolvedValue({ success: true, message: 'Siklus berhasil dihentikan' });

    render(<StopCycle cycleId='1' />);
    const stopButton = screen.getByRole('button', { name: /stop siklus/i });

    act(() => {
      fireEvent.click(stopButton);
    })

    waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    })

    expect(screen.getByText('Hentikan siklus')).toBeInTheDocument();
    expect(screen.getByText('Konfirmasi')).toBeInTheDocument();
  })

  it('handles stop cycle success', async () => {
    (stopCycle as jest.Mock).mockResolvedValue({ success: true, message: 'Siklus berhasil dihentikan' });
    render(<StopCycle cycleId='1' />);
    const stopButton = screen.getByRole('button', { name: /stop siklus/i });

    act(() => {
      fireEvent.click(stopButton);
    })

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    })

    const confirmButton = screen.getByRole('button', { name: /konfirmasi/i });
    act(() => {
      fireEvent.click(confirmButton);
    })

    await waitFor(() => {
      expect(stopCycle).toHaveBeenCalled();
      expect(mockToast).toHaveBeenCalledWith({
        description: 'Siklus berhasil dihentikan',
        variant: 'success'
      });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    })
  })

  it('handles stop cycle failure e.g. when cycle id not found', async () => {
    (stopCycle as jest.Mock).mockResolvedValue({ success: false, message: 'Siklus tidak ditemukan' });
    render(<StopCycle cycleId='1' />);
    const stopButton = screen.getByRole('button', { name: /stop siklus/i });

    act(() => {
      fireEvent.click(stopButton);
    })

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    })

    const confirmButton = screen.getByRole('button', { name: /konfirmasi/i });
    act(() => {
      fireEvent.click(confirmButton);
    })

    await waitFor(() => {
      expect(stopCycle).toHaveBeenCalled();
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Gagal menghentikan siklus',
        description: 'Silakan coba lagi.',
        variant: 'destructive'
      });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    })
  })

  it('handles when an unexpected failure when stopping occurs', async () => {
    (stopCycle as jest.Mock).mockRejectedValue(new Error('Network Error'));
    render(<StopCycle cycleId='1' />);
    const stopButton = screen.getByRole('button', { name: /stop siklus/i });

    act(() => {
      fireEvent.click(stopButton);
    })

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    })

    const confirmButton = screen.getByRole('button', { name: /konfirmasi/i });
    act(() => {
      fireEvent.click(confirmButton);
    })

    await waitFor(() => {
      expect(stopCycle).toHaveBeenCalled();
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Gagal menghentikan siklus',
        description: 'Silakan coba lagi.',
        variant: 'destructive'
      });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    })
  })
})

