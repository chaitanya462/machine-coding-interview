import { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';

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
    return (
      <div className="container fade-in">
        <div className="page-nav">
          <span className="nav-link active">Profile</span>
        </div>
        <div className="card">
          <div className="loading">
            <h2>Loading Profile...</h2>
            <p>Please wait while we fetch your information.</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container fade-in">
        <div className="page-nav">
          <span className="nav-link active">Profile</span>
        </div>
        <div className="card">
          <div className="error-container">
            <h2>Error</h2>
            <p>{error}</p>
            <div className="btn-group">
              <button onClick={() => navigate('/login')} className="btn btn-primary">
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return user ? (
    <div className="container fade-in">
      <div className="page-nav">
        <span className="nav-link active">Profile</span>
      </div>
      <div className="card">
        <div className="profile-header">
          <h2>Welcome, {user.username || user.name || 'User'}!</h2>
          <p>Here's your profile information</p>
        </div>
        
        <div className="profile-info">
          <p><strong>Username:</strong> {user.username || user.name || 'Not provided'}</p>
          {/* <p><strong>Email:</strong> {user.email || 'Not provided'}</p> */}
          {user.id && <p><strong>User ID:</strong> {user.id}</p>}
          {user.createdAt && <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>}
        </div>
        
        <div className="btn-group">
          <button onClick={logout} className="btn btn-danger">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="container fade-in">
      <div className="page-nav">
        <span className="nav-link active">Profile</span>
      </div>
      <div className="card">
        <div className="error-container">
          <h2>No Profile Data</h2>
          <p>No user data available</p>
          <div className="btn-group">
            <button onClick={() => navigate('/login')} className="btn btn-primary">
              Go to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
