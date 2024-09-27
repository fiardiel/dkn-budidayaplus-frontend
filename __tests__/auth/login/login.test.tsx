import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/app/auth/login/page";
import { handleLoginFormSubmit } from "@/lib/auth/login/actions";
import { useRouter } from "next/navigation";

jest.mock('@/lib/auth/login/actions', () => ({
  handleLoginFormSubmit: jest.fn(),
}));

jest.mock('@/lib/auth', () => ({
  hashPassword: jest.fn().mockResolvedValue('hashedPassword'),
}));

jest.mock("next/navigation", () => ({
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
    json: () => Promise.resolve({ message: "Login berhasil" }),
  } as Response)
);

const mockFailedLoginResponse = jest.fn().mockResolvedValue({
  ok: false,
  message: "Invalid credentials",
});


describe("Login Page", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  let phoneInput: HTMLElement;
  let passwordInput: HTMLElement;
  let loginButton: HTMLElement;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    render(<LoginPage />);

    phoneInput = screen.getByPlaceholderText("Nomor Ponsel");
    passwordInput = screen.getByPlaceholderText("Kata Sandi");
    loginButton = screen.getByRole("button", { name: /login/i });

    (handleLoginFormSubmit as jest.Mock).mockResolvedValue({
      ok: true,
      message: "Login berhasil",
    });
  });

  it("renders the login form", () => {
    expect(phoneInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("allows user to login", async () => {
    fireEvent.change(phoneInput, { target: { value: "08123456789" } });
    fireEvent.change(passwordInput, { target: { value: "mypassword123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(handleLoginFormSubmit).toHaveBeenCalledWith({
        phone_number: "08123456789",
        password: "hashedPassword",
      });
      expect(mockRouter.push).toHaveBeenCalledWith("/");
    });
  });

  it("shows error message when login fails", async () => {
    (handleLoginFormSubmit as jest.Mock).mockImplementationOnce(mockFailedLoginResponse);

    fireEvent.change(phoneInput, { target: { value: "08123456789" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(handleLoginFormSubmit).toHaveBeenCalled();
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });

});
