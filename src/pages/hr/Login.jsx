import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation
      if (!email || !password) {
        setError('Please enter both email and password.');
        setLoading(false);
        return;
      }

      if (!email.includes('@')) {
        setError('Please enter a valid email address.');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        setLoading(false);
        return;
      }

      // Simulate successful login
      // In production, this would call your backend API
      const loginResponse = {
        token: 'jwt-token-' + Date.now(),
        user: { email, role: 'hr_admin' }
      };

      // Store token in localStorage
      localStorage.setItem('token', loginResponse.token);
      localStorage.setItem('user', JSON.stringify(loginResponse.user));

      // Redirect to dashboard
      setTimeout(() => {
        navigate('/hr/dashboard', { replace: true });
      }, 500);

    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-card">
          <div className="back-arrow" onClick={() => navigate('/')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </div>
          <div className="login-header">
            <div className="login-logo">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="4"/>
                <rect x="7" y="7" width="3" height="3" rx="1.5" fill="#2563eb"/>
                <rect x="14" y="7" width="3" height="3" rx="1.5" fill="#2563eb"/>
                <rect x="7" y="14" width="3" height="3" rx="1.5" fill="#2563eb"/>
                <rect x="14" y="14" width="3" height="3" rx="1.5" fill="#2563eb"/>
              </svg>
            </div>
            <h1>SmartRecruiter</h1>
            <p>Secure Recruitment Portal</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="login-error">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {error}
              </div>
            )}
            <label htmlFor="email">Work Email</label>
            <div className="login-input-wrapper">
              <span className="login-icon">
                <svg width="18" height="18" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>
              </span>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your work email" required disabled={loading} />
            </div>
            <label htmlFor="password">Password</label>
            <div className="login-input-wrapper">
              <span className="login-icon">
                <svg width="18" height="18" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              </span>
              <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required disabled={loading} />
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'} 
              <span className="login-btn-arrow">{loading ? '...' : '→'}</span>
            </button>
          </form>
        </div>
        <footer className="login-footer">
          <nav>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Security</a>
            <a href="#">Support</a>
          </nav>
          <p>© 2024 SmartRecruiter. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
