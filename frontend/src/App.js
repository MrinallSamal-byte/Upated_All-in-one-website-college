import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';

function App() {
  const [student, setStudent] = useState(null);

  return (
    <div>
      {!student ? (
        <Login onLogin={setStudent} />
      ) : (
        <Dashboard student={student} />
      )}
    </div>
  );
}

function Login({ onLogin }) {
  const [registerNo, setRegisterNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registerNo, password }),
      });
      const data = await res.json();
      if (res.ok) {
        onLogin(data.student);
      } else {
        setError(data.error);
      }
    } catch {
      setError('Server error');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Student Login</h2>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Registration Number (e.g., 24E112R17)"
            value={registerNo}
            onChange={e => setRegisterNo(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Login
        </button>
        {error && <p style={{color:'red', textAlign: 'center', marginTop: '15px'}}>{error}</p>}
        <p style={{ fontSize: '14px', color: '#666', marginTop: '20px', textAlign: 'center' }}>
          Use your registration number (e.g., 24E112R17) and password to login
        </p>
      </form>
    </div>
  );
}

export default App;