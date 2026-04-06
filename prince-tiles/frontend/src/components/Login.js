import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { username, password });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="login-page" style={{ padding: '120px 20px', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#f9f9f9', cursor: 'auto' }}>
      <button 
        onClick={() => navigate('/')}
        style={{ marginBottom: '20px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '600' }}
      >
        <i className="fas fa-arrow-left" /> Back to Home
      </button>
      <div className="login-card" style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%' }}>
        <h2 style={{ marginBottom: '24px', textAlign: 'center', color: '#333' }}>Developer Login</h2>
        {error && <p style={{ color: 'red', marginBottom: '16px', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '600' }}>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', cursor: 'text' }}
              required
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '600' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', cursor: 'text' }}
              required
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: '#c9a96e', color: '#fff', fontWeight: 'bold', fontSize: '1rem', transition: 'background 0.3s' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
