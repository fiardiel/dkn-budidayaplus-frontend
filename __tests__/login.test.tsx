import { render, screen, fireEvent } from "@testing-library/react";
import Login from "@/app/login-page/page"; 
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      statusText: "OK",
      headers: new Headers(),
      redirected: false,
      json: () => Promise.resolve({ message: "Login successful" }),
    } as Response)
);


describe("Login Page", () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
          push: jest.fn(), 
        });
      });
  it("renders the login form", () => {
    render(<Login />);
    
    const phoneInput = screen.getByPlaceholderText("Nomor Ponsel...");
    const passwordInput = screen.getByPlaceholderText("Password...");
    const loginButton = screen.getByRole("button", { name: /login/i });
    
    expect(phoneInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
  
  it("allows user to login", async () => {
    render(<Login />);
    
    const phoneInput = screen.getByPlaceholderText("Nomor Ponsel...");
    const passwordInput = screen.getByPlaceholderText("Password...");
    const loginButton = screen.getByRole("button", { name: /login/i });
    
    fireEvent.change(phoneInput, { target: { value: '08123456789' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });
    fireEvent.click(loginButton);
    
    const successMessage = await screen.findByText("Login successful");
    expect(successMessage).toBeInTheDocument();
  });
});
