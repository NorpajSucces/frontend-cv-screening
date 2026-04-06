import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginHR } from "../../store/slices/authSlice";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Retrieve loading and API error state from Redux
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!email || !password) {
      setLocalError("Please enter email and password");
      return;
    }

    // Call Redux Thunk
    const resultAction = await dispatch(loginHR({ email, password }));

    // If API returns success, redirect to dashboard
    if (loginHR.fulfilled.match(resultAction)) {
      navigate("/hr/dashboard");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* LEFT */}
        <div className="login-illustration">
          <div className="illustration-circle"></div>
          <h2 className="illustration-title">Empowering Tech Talent</h2>
          <p className="illustration-subtitle">
            Connecting IT talent with the right opportunities.
          </p>
        </div>

        {/* RIGHT */}
        <div className="login-form-section">
          <div className="login-header">
            <h1>HR Portal Dashboard</h1>
            <p>Sign in to continue</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            
            {/* Show Local Validation Error OR Backend API Error */}
            {(localError || error) && (
              <div className="login-error">{localError || error}</div>
            )}

            <div className="login-field-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>

            <div className="login-field-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
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