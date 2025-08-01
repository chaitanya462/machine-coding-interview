import { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage('');
      await axios.post('/api/users/login', form);
      setMessageType('success');
      setMessage('Login successful! Redirecting...');
      setTimeout(() => navigate('/profile'), 1000);
    } catch (err) {
      setMessageType('error');
      setMessage('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    try {
      setMessage('');
      await axios.get('/api/users/logout');
      setMessageType('success');
      setMessage('Logged out successfully');
      setForm({ username: '', password: '' });
    } catch (err) {
      setMessageType('error');
      setMessage('Logout failed');
    }
  };

  return (
    <div className="container fade-in">
      <div className="card">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-control"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="btn-group">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
            <button type="button" onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </form>
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
