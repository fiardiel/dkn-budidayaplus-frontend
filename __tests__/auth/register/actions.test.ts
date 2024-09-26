import { handleRegisterSubmit } from "@/lib/auth/register/registerActions";
import { cookies } from "next/headers";
import { RegisterForm } from "@/types/auth/register";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

global.fetch = jest.fn();

describe("handleFormSubmit", () => {
  const mockRegisterForm: RegisterForm = {
    phone_number: "08123456789",
    password: "password123",
    first_name: "John",
    last_name: "Smith",
  };

  const mockSetCookie = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (cookies as jest.Mock).mockReturnValue({
      set: mockSetCookie,
    });
  });

  it("should return success when registration is successful", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({
        refresh: "fakeRefreshToken",
        access: "fakeAccessToken",
      }),
    });

    const result = await handleRegisterSubmit(mockRegisterForm);

    expect(result).toEqual({ ok: true, message: "Registrasi berhasil" });
    expect(mockSetCookie).toHaveBeenCalledWith("refreshToken", "fakeRefreshToken", { path: "/", httpOnly: true });
    expect(mockSetCookie).toHaveBeenCalledWith("accessToken", "fakeAccessToken", { path: "/", httpOnly: true });
  });

  it("should return an error message when registration fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({
        detail: "Invalid registration data",
      }),
    });

    const result = await handleRegisterSubmit(mockRegisterForm);

    expect(result).toEqual({ ok: false, message: "Invalid registration data" });
    expect(mockSetCookie).not.toHaveBeenCalled();
  });

  it("should return a generic error message when there is an exception", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    const result = await handleRegisterSubmit(mockRegisterForm);

    expect(result).toEqual({ ok: false, message: "Terjadi kesalahan pada registrasi" });
    expect(mockSetCookie).not.toHaveBeenCalled();
  });
});
