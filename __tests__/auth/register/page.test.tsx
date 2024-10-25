import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import RegisterPage from '@/app/auth/register/page';
import { handleRegisterSubmit } from '@/lib/auth';
import { useRouter } from 'next/navigation';

jest.mock('@/lib/auth', () => ({
  handleRegisterSubmit: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
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
  const mockPush = jest.fn();

  let phoneInput: HTMLElement;
  let firstNameInput: HTMLElement;
  let lastNameInput: HTMLElement;
  let passwordInput: HTMLElement;
  let registerButton: HTMLElement;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    jest.clearAllMocks();
    render(<RegisterPage />);

    phoneInput = screen.getByPlaceholderText("Nomor Ponsel");
    firstNameInput = screen.getByPlaceholderText("Nama Depan");
    lastNameInput = screen.getByPlaceholderText("Nama Belakang");
    passwordInput = screen.getByPlaceholderText("Kata Sandi");
    registerButton = screen.getByTestId("register-button");

    (handleRegisterSubmit as jest.Mock).mockResolvedValue({
      ok: true,
      message: "Registrasi berhasil",
    });
  });

  afterEach(() => {
    mockPush.mockRestore();
  })

  it("renders the register form", () => {
    expect(phoneInput).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it("allows user to register and succeeds the submission", async () => {
    (handleRegisterSubmit as jest.Mock).mockResolvedValue({ok: true, message:"Registrasi berhasil"})
    
    fireEvent.change(phoneInput, { target: { value: '08123456789' } });
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword123' } });
    
    await act(async () => {
      fireEvent.click(registerButton);
    })

    await waitFor(() => {
      expect(handleRegisterSubmit).toHaveBeenCalledWith({
        phone_number: '08123456789',
        first_name: 'John',
        last_name: 'Doe',
        password: 'mypassword123'
      });
      expect(mockPush).toHaveBeenCalledWith("/")
    });
  });

  it("doesn't allow user to register with invalid fields", async () => {
    fireEvent.change(phoneInput, { target: { value: '08123' } });
    fireEvent.change(firstNameInput, { target: { value: '' } });
    fireEvent.change(lastNameInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(handleRegisterSubmit).not.toHaveBeenCalled();
      expect(screen.getByText("Nomor ponsel anda terlalu pendek")).toBeInTheDocument();
      expect(screen.getByText("Tolong masukkan nama depan anda")).toBeInTheDocument();
      expect(screen.getByText("Tolong masukkan nama belakang anda")).toBeInTheDocument();
      expect(screen.getByText("Kata sandi harus mengandung angka")).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });
  })

  it("shows error message when registration fails", async () => {
    (handleRegisterSubmit as jest.Mock).mockImplementationOnce(mockFailedRegisterResponse);

    fireEvent.change(phoneInput, { target: { value: '08123456789' } });
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword123' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(handleRegisterSubmit).toHaveBeenCalledWith({
        phone_number: '08123456789',
        first_name: 'John',
        last_name: 'Doe',
        password: 'mypassword123'
      });
      expect(screen.getByText("Registrasi gagal")).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it("shows error message when there is an error exception during registration", async () => {
    (handleRegisterSubmit as jest.Mock).mockRejectedValue(new Error("Network Error"));

    fireEvent.change(phoneInput, { target: { value: '08123456789' } });
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword123' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(handleRegisterSubmit).toHaveBeenCalledWith({
        phone_number: '08123456789',
        first_name: 'John',
        last_name: 'Doe',
        password: 'mypassword123'
      });
      expect(screen.getByText("Terjadi kesalahan pada registrasi")).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });
  })
});
