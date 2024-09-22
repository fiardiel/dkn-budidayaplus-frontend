import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from '@/app/auth/register/page';
import { handleFormSubmit } from '@/lib/auth';
import { useRouter } from 'next/navigation';

jest.mock('@/lib/auth', () => ({
  handleFormSubmit: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    statusText: "OK",
    headers: new Headers(),
    redirected: false,
    json: () => Promise.resolve({ message: "Registrasi berhasil" }),
  } as Response)
);

const mockFailedRegisterResponse = jest.fn().mockResolvedValue({
  ok: false,
  message: "Registrasi gagal"
});

describe("Register Page", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  let phoneInput: HTMLElement;
  let firstNameInput: HTMLElement;
  let lastNameInput: HTMLElement;
  let passwordInput: HTMLElement;
  let registerButton: HTMLElement;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    render(<RegisterPage />);

    phoneInput = screen.getByPlaceholderText("Nomor Ponsel");
    firstNameInput = screen.getByPlaceholderText("Nama Depan");
    lastNameInput = screen.getByPlaceholderText("Nama Belakang");
    passwordInput = screen.getByPlaceholderText("Kata Sandi");
    registerButton = screen.getByTestId("register-button");

    (handleFormSubmit as jest.Mock).mockResolvedValue({
      ok: true,
      message: "Registrasi berhasil",
    });
  });

  it("renders the register form", () => {
    expect(phoneInput).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it("allows user to register", async () => {
    fireEvent.change(phoneInput, { target: { value: '08123456789' } });
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword123' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(handleFormSubmit).toHaveBeenCalledWith({
        phone_number: '08123456789',
        first_name: 'John',
        last_name: 'Doe',
        password: 'mypassword123'
      });
    });
  });

  it("doesn't allow user to register with invalid fields", async () => {
    fireEvent.change(phoneInput, { target: { value: '08123' } });
    fireEvent.change(firstNameInput, { target: { value: '' } });
    fireEvent.change(lastNameInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(handleFormSubmit).not.toHaveBeenCalled();
      expect(screen.getByText("Nomor ponsel anda terlalu pendek")).toBeInTheDocument();
      expect(screen.getByText("Tolong masukkan nama depan anda")).toBeInTheDocument();
      expect(screen.getByText("Tolong masukkan nama belakang anda")).toBeInTheDocument();
      expect(screen.getByText("Kata sandi harus mengandung angka")).toBeInTheDocument();
    });
  })



  it("shows error message when registration fails", async () => {
    (handleFormSubmit as jest.Mock).mockImplementationOnce(mockFailedRegisterResponse);

    fireEvent.change(phoneInput, { target: { value: '08123456789' } });
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword123' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(handleFormSubmit).toHaveBeenCalled();
      expect(screen.getByText("Registrasi gagal")).toBeInTheDocument();
    });
  });
});
