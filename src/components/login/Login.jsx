import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import "./Login.css"

const Login = ({ setRole, setGroupId }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const groupsRef = ref(db, 'groups');
    const unsubscribe = onValue(groupsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const groupList = Object.entries(data).map(([id, value]) => ({ id, ...value }));
      setGroups(groupList);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    if (password === '1462') {
      setRole('teacher');
      setGroupId(null);
      navigate('/');
    } else {
      const found = groups.find(g => g.password === password);
      if (found) {
        setRole('student');
        setGroupId(found.id);
        navigate(`/group/${found.id}`);
      } else {
        setError("Parol noto'g'ri");
      }
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