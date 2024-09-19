import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: phone,
        password: password,
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      setSuccess(data.message);
      setError("");
      router.push("/dashboard");
    } else {
      setError(data.detail || "Failed to login");
      setSuccess("");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nomor Ponsel..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
}
