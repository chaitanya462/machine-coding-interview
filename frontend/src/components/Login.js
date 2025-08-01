import { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/login', form);
      navigate('/profile');
    } catch (err) {
      setMessage('Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('/api/users/logout');
      setMessage('Logged out successfully');
      setForm({ username: '', password: '' });
    } catch (err) {
      setMessage('Logout failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleLogout} style={{ marginTop: '10px' }}>Logout</button>
      <p>{message}</p>
    </div>
  );
}
