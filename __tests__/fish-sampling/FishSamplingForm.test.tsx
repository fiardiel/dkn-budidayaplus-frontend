import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FishSamplingForm from '@/components/fish-sampling/FishSamplingForm';
import { addFishSampling } from '@/lib/fish-sampling';

jest.mock('@/lib/fish-sampling'); // Mock the addFishSampling function
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockAddFishSampling = addFishSampling as jest.MockedFunction<typeof addFishSampling>;

describe('FishSamplingForm', () => {
  const mockSetIsModalOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form inputs and submit button', () => {
    render(<FishSamplingForm pondId="1" cycleId="1" setIsModalOpen={mockSetIsModalOpen} />);

    expect(screen.getByPlaceholderText('Berat Ikan(kg)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Panjang Ikan(cm)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /simpan/i })).toBeInTheDocument();
  });

  it('displays error message on failed submission', async () => {
    mockAddFishSampling.mockResolvedValueOnce({ success: false });
    render(<FishSamplingForm pondId="1" cycleId="1" setIsModalOpen={mockSetIsModalOpen} />);

    fireEvent.change(screen.getByPlaceholderText('Berat Ikan(kg)'), { target: { value: '1.5' } });
    fireEvent.change(screen.getByPlaceholderText('Panjang Ikan(cm)'), { target: { value: '20' } });
    fireEvent.click(screen.getByRole('button', { name: /simpan/i }));

    await waitFor(() => {
      expect(screen.getByText('Gagal menyimpan sample ikan')).toBeInTheDocument();
    });
  });

  it('submits form successfully and closes modal on success', async () => {
    mockAddFishSampling.mockResolvedValueOnce({ success: true });
    render(<FishSamplingForm pondId="1" cycleId="1" setIsModalOpen={mockSetIsModalOpen} />);

    fireEvent.change(screen.getByPlaceholderText('Berat Ikan(kg)'), { target: { value: '1.5' } });
    fireEvent.change(screen.getByPlaceholderText('Panjang Ikan(cm)'), { target: { value: '20' } });
    fireEvent.click(screen.getByRole('button', { name: /simpan/i }));

    await waitFor(() => {
      expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
      expect(screen.queryByText('Gagal menyimpan sample ikan')).not.toBeInTheDocument();
    });
  });

  it('displays validation errors for empty input', async () => {
    render(<FishSamplingForm pondId="1" cycleId="1" setIsModalOpen={mockSetIsModalOpen} />);
  
    fireEvent.change(screen.getByPlaceholderText('Berat Ikan(kg)'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Panjang Ikan(cm)'), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
  
    await waitFor(() => {
      const errorMessages = screen.getAllByText(/Expected number, received nan/i);
      expect(errorMessages).toHaveLength(2);
    });
  });  

  it('displays validation errors for negative input', async () => {
    render(<FishSamplingForm pondId="1" cycleId="1" setIsModalOpen={mockSetIsModalOpen} />);

    fireEvent.change(screen.getByPlaceholderText('Berat Ikan(kg)'), { target: { value: '-1.5' } });
    fireEvent.change(screen.getByPlaceholderText('Panjang Ikan(cm)'), { target: { value: '-20' } });
    fireEvent.click(screen.getByRole('button', { name: /simpan/i }));

    await waitFor(() => {
      expect(screen.getByText('Berat harus berupa angka positif')).toBeInTheDocument();
      expect(screen.getByText('Panjang harus berupa angka positif')).toBeInTheDocument();
    });
  });

  it('displays error message when submission throws an exception', async () => {
    mockAddFishSampling.mockRejectedValueOnce(new Error('Network Error'));
    render(<FishSamplingForm pondId="1" cycleId="1" setIsModalOpen={mockSetIsModalOpen} />);

    fireEvent.change(screen.getByPlaceholderText('Berat Ikan(kg)'), { target: { value: '1.5' } });
    fireEvent.change(screen.getByPlaceholderText('Panjang Ikan(cm)'), { target: { value: '20' } });
    fireEvent.click(screen.getByRole('button', { name: /simpan/i }));

    await waitFor(() => {
      expect(screen.getByText('Gagal menyimpan sample ikan')).toBeInTheDocument();
    });
  });
});
