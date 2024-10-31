import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { UpdateProfileModal } from '@/components/profile';
import { updateProfile } from '@/lib/profile';

jest.mock('@/hooks/useProfile', () => ({
  useProfile: jest.fn().mockReturnValue({
    id: 1,
    user: {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      phone_number: '081234567890',
    },
    image_name: 'john_doe.jpg',
  })
}))

jest.mock('@/lib/profile', () => ({
  updateProfile: jest.fn(),
}))

describe('Update Profile Modal', () => {
  it('opens the modal when the update button is clicked', async () => {
    render(<UpdateProfileModal />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /update profile/i }));
    })

    expect(screen.getByRole('button', { name: /ganti foto/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /hapus foto/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /simpan/i })).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nama Depan')).toHaveValue('John');
    expect(screen.getByPlaceholderText('Nama Belakang')).toHaveValue('Doe');
  })

  it('closes the modal when the close button is clicked', async () => {
    render(<UpdateProfileModal />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /update profile/i }));
    })

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /close/i }));
    })
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  })

  it('updates the profile when the form is submitted with correct fields', async () => {
    render(<UpdateProfileModal />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /update profile/i }));
    })

    fireEvent.change(screen.getByPlaceholderText('Nama Depan'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByPlaceholderText('Nama Belakang'), { target: { value: 'Doe' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    })

    expect(updateProfile).toHaveBeenCalledWith({
      first_name: 'Jane',
      last_name: 'Doe',
    })
  })

  it('shows an error message when the form is submitted with incorrect fields', async () => {
    render(<UpdateProfileModal />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /update profile/i }));
    })

    fireEvent.change(screen.getByPlaceholderText('Nama Depan'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Nama Belakang'), { target: { value: '' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    })

    expect(screen.getByText('Tolong masukkan nama depan anda')).toBeInTheDocument();
    expect(screen.getByText('Tolong masukkan nama belakang anda')).toBeInTheDocument();
  })

  it('shows an error message when the form is submitted with too long fields', async () => {
    render(<UpdateProfileModal />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /update profile/i }));
    })

    fireEvent.change(screen.getByPlaceholderText('Nama Depan'), { target: { value: 'Oi'.repeat(13) } });
    fireEvent.change(screen.getByPlaceholderText('Nama Belakang'), { target: { value: 'Iu'.repeat(13) } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    })

    expect(screen.getByText('Nama depan anda terlalu panjang')).toBeInTheDocument();
    expect(screen.getByText('Nama belakang anda terlalu panjang')).toBeInTheDocument();
  })

  it('shows an error message when the update fails', async () => {
    const mockError = new Error('Gagal mengupdate profile');
    (updateProfile as jest.Mock).mockRejectedValueOnce(mockError);

    render(<UpdateProfileModal />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /update profile/i }));
    })

    fireEvent.change(screen.getByPlaceholderText('Nama Depan'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByPlaceholderText('Nama Belakang'), { target: { value: 'Doe' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /simpan/i }));
    })

    await waitFor(() => {
      expect(screen.getByText('Gagal mengupdate profile')).toBeInTheDocument();
    });
  })
})