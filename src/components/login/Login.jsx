import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

const Login = ({ setRole }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === '3217') {
      setRole('teacher');
      navigate('/');
    } else if (password === '1208') {
      setRole('student');
      navigate('/');
    } else {
      setError("Parol noto'g'ri");
    }
  };

  return (
    <div className='login' style={{ padding: 50, textAlign: 'center' }}>
      <h2>Parolni kiriting</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Parol"
        style={{ padding: '10px', width: '200px' }}
      />
      <br/>
      <button onClick={handleLogin}>Kirish</button>
      {error && (
        <p className='err'> {error} </p>
      )}
    </div>
  );
};

export default Login;
