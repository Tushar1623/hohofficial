import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api.js';

export const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!password.trim()) {
      return setError('Please enter your admin password.');
    }

    try {
      setLoading(true);
      const success = await api.login(password.trim());
      if (success) {
        navigate('/admin', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your password and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-brand text-center">
          <img src="/HoH.jpg" alt="HoH" width="56" height="56" className="admin-login-logo" />
          <h1 className="admin-login-title">HOUSE OF HUMOUR</h1>
          <p className="admin-login-subtitle">Admin Control Panel</p>
        </div>

        {error && (
          <div className="admin-error-box" role="alert">
            <span className="material-symbols-outlined">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="password">Admin Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'ACCESS ADMIN PANEL'}
          </button>
        </form>

        <div className="admin-login-footer text-center">
          <Link to="/" className="text-muted-link">
            &larr; Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
