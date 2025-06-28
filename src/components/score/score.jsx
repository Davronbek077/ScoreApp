import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { ref, onValue, set, remove } from 'firebase/database';
import './score.css';

const Score = ({ role }) => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const studentsRef = ref(db, 'students');
    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.keys(data).map(id => ({ id, ...data[id] }));
        setStudents(arr);
      } else {
        setStudents([]);
      }
    });
  }, []);

  const handleUpdate = (id, value) => {
    set(ref(db, 'students/' + id + '/score'), value);
  };

  const handleDelete = (id) => {
    remove(ref(db, 'students/' + id));
  };

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="score-wrap">
      <div className='search-input'>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Qidiruv..."
          className="search"
        />
      </div>

      <div className="score">
        {filtered.length ? (
          filtered.map((s) => (
            <div className={`student ${role === 'student' ? 'student-border' : ''}`} key={s.id}>
              <p>{s.name}</p>
              <div id="button">
                <p id="score"><span>Ball:</span>{s.score > 0 ? `+${s.score}` : s.score}</p>
                {role === 'teacher' && (
                  <>
                    <button className='plus' onClick={() => handleUpdate(s.id, s.score + 1)}>+</button>
                    <button className='minus' onClick={() => handleUpdate(s.id, s.score - 1)}>-</button>
                    <button className='del' onClick={() => handleDelete(s.id)}>O‘chirish</button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>O‘quvchi topilmadi</p>
        )}
      </div>
    </div>
  );
};

export default Score;
