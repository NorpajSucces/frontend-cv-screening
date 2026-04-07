import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);

    // Simulasi Login
    setTimeout(() => {
      localStorage.setItem("token", "dummy-token");
      localStorage.setItem("user", JSON.stringify({ email, role: 'hr_admin' }));
      navigate("/hr/dashboard");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* SISI KIRI: ILLUSTRATION */}
        <div className="login-illustration">
          <div className="illustration-circle"></div>
          <h2 className="illustration-title">Empowering Tech Talent</h2>
          <p className="illustration-subtitle">
            Connecting IT talent with the right opportunities.
          </p>
        </div>

        {/* SISI KANAN: FORM */}
        <div className="login-form-section">
          <div className="login-header">
            <h1>HR Portal Dashboard</h1>
            <p>Sign in to continue</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="login-error">{error}</div>}

            <div className="login-field-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="login-field-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            <button className="login-button" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          <div className="login-footer">
            © 2024 SmartRecruiter
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;