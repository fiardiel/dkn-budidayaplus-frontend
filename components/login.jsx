const handleSubmit = async (e) => {
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
    } else {
      setError(data.detail || "Failed to login");
      setSuccess("");
    }
  };
  