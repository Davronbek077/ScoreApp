// Add.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './add.css';

const Add = () => {
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  const handleAddStudent = () => {
    if (newName.trim()) {
      // LocalStorage'dan mavjud o‘quvchilarni olib kelamiz
      const saved = localStorage.getItem('students');
      const students = saved ? JSON.parse(saved) : [];

      // Yangi o‘quvchi obyektini yaratamiz
      const newStudent = {
        id: Date.now(),
        name: newName,
        score: 0,
      };

      // Yangi ro‘yxatni localStorage'ga saqlaymiz
      const updatedStudents = [...students, newStudent];
      localStorage.setItem('students', JSON.stringify(updatedStudents));

      // Inputni tozalaymiz
      setNewName('');

      // Home sahifaga qaytamiz
      navigate('/');
    }
  };

  return (
    <div className='add-wrap' style={{ marginTop: '10px' }}>
      <div className="add-input">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Yangi o'quvchi ismi"
          style={{ padding: '5px' }}
        />
        <button onClick={handleAddStudent} style={{ marginLeft: '10px' }}>
          Qo'shish
        </button>
      </div>
    </div>
  );
};

export default Add;
