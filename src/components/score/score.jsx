import React, { useState, useEffect } from 'react';
import "./score.css"
import Add from '../add/add';

const Score = () => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : [];
  });

  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handlePlus = (id) => {
    setStudents(students.map(s => s.id === id ? { ...s, score: s.score + 1 } : s));
  };

  const handleMinus = (id) => {
    setStudents(students.map(s => s.id === id ? { ...s, score: s.score - 1 } : s));
  };

  const handleAddStudent = () => {
    if (newName.trim()) {
      setStudents([...students, { id: Date.now(), name: newName, score: 0 }]);
      setNewName("");
    }
  };

  const handleDelete = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="score-wrap">
      <div className='score'>

      <div className="search-input">
      <input className='search'
        type="text"
        placeholder="Qidiruv..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '15px', padding: '5px', display: 'block' }}
      />
      </div>

      {filteredStudents.length > 0 ? (
        filteredStudents.map((student) => (
            <div className='student' key={student.id} style={{ marginBottom: '10px' }}>
              <p>{student.name}</p>
              <span id='button' style={{ marginLeft: '10px' }}>
                <p id='score'>Ball: {student.score > 0 ? `+${student.score}` : student.score}</p>
                <button className='plus' style={{ marginLeft: '10px' }} onClick={() => handlePlus(student.id)}>+</button>
                <button className='minus' style={{ marginLeft: '5px' }} onClick={() => handleMinus(student.id)}>-</button>
                <button className='del' style={{ marginLeft: '5px' }} onClick={() => handleDelete(student.id)}>O'chirish</button>
              </span>
            </div>
          ))
      ) : (
        <p>Bunday o'quvchi topilmadi</p>
      )}

    </div>
    </div>
    
  );
};

export default Score;
