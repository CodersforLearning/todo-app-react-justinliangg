import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    setUsername("");
    setPassword("");
    e.preventDefault();

    const response = await fetch("api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      sessionStorage.setItem("token", token);
      navigate("/");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="registerForm">
        <label>Username:</label>
        <input
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label>Password:</label>
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
