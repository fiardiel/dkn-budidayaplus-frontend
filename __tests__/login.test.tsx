import { render, screen, fireEvent } from "@testing-library/react";
import Login from "@/app/login-page/page"; 
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }));

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
    const loginButton = screen.getByText("Login");
    
    expect(phoneInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
  
  it("allows user to login", async () => {
    render(<Login />);
    
    const phoneInput = screen.getByPlaceholderText("Nomor Ponsel...");
    const passwordInput = screen.getByPlaceholderText("Password...");
    const loginButton = screen.getByText("Login");
    
    fireEvent.change(phoneInput, { target: { value: '08123456789' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });
    fireEvent.click(loginButton);
    
    const successMessage = await screen.findByText("Login successful");
    expect(successMessage).toBeInTheDocument();
  });
});
