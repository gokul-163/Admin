import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      navigate("/Dashboard");
    } catch (err) {
      alert("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      }}
    >
      <div
        className="card shadow-lg p-4 border-0"
        style={{
          width: "350px",
          borderRadius: "15px",
          animation: "fadeIn 0.8s",
        }}
      >
        <div className="text-center mb-3">
          <h3 className="fw-bold">🔐 Login</h3>
          <p className="text-muted">Welcome back!</p>
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="username"
            className="form-control form-control-lg"
            placeholder="Username"
            onChange={handleChange}
            value={form.username}
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="password"
            className="form-control form-control-lg"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
          />
        </div>

        <button
          className="btn btn-primary w-100 btn-lg d-flex justify-content-center align-items-center"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <div className="spinner-border spinner-border-sm text-light" />
          ) : (
            "Login"
          )}
        </button>


      </div>
    </div>
  );
}

export default Login;