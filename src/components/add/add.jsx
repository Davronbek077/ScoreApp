import React, { useState } from 'react';
import { db } from '../../firebase';
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './add.css'

const Add = () => {
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  const handleAdd = () => {
    if (newName.trim()) {
      const id = Date.now().toString();
      set(ref(db, 'students/' + id), {
        name: newName,
        score: 0,
      });
      setNewName('');
      navigate('/');
    }
  };

  return (
    <div className='add-wrap'>
      <input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Yangi o‘quvchi ismi"
      />
      <button onClick={handleAdd}>Qo‘shish</button>
    </div>
  );
};

export default Add;
