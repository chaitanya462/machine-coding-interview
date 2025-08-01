import { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');
        console.log('Fetching profile...');
        const res = await axios.get('/api/users/profile');
        console.log('Profile response:', res.data);
        
        // Handle different possible response structures
        const userData = res.data.user || res.data;
        if (userData) {
          setUser(userData);
        } else {
          setError('No user data received');
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError('Failed to load profile');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  return user ? (
    <div>
      <h2>Welcome, {user.username || user.name || 'User'}</h2>
      <p>Email: {user.email || 'Not provided'}</p>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <div>
      <p>No user data available</p>
      <button onClick={() => navigate('/login')}>Go to Login</button>
    </div>
  );
}
