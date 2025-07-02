import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { ref, onValue, set, remove } from 'firebase/database';
import Pages from '../../pages/pages';
import './score.css';

const Score = ({ role, groupId: propGroupId }) => {
  const params = useParams();
  const groupId = propGroupId || params.groupId;
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [editScores, setEditScores] = useState({});
  const [editMode, setEditMode] = useState({});

  useEffect(() => {
    if (!groupId) return;
    const studentsRef = ref(db, `groups/${groupId}/students`);
    const unsubscribe = onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.keys(data).map(id => ({ id, ...data[id] }));
        setStudents(arr);
      } else {
        setStudents([]);
      }
    });
    return () => unsubscribe();
  }, [groupId]);

  const handleUpdate = (id, value) => {
    set(ref(db, `groups/${groupId}/students/${id}/score`), value);
  };

  const handleDelete = (id) => {
    remove(ref(db, `groups/${groupId}/students/${id}`));
  };

  const handleScoreClick = (id, currentScore) => {
    if (role === 'teacher') {
      setEditMode(prev => ({ ...prev, [id]: true }));
      setEditScores(prev => ({ ...prev, [id]: currentScore ?? 0 }));
    }
  };

  const handleInputChange = (id, value) => {
    setEditScores(prev => ({ ...prev, [id]: value }));
  };

  const handleInputKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      let newScore = parseInt(editScores[id], 10);
      if (!isNaN(newScore)) {
        handleUpdate(id, newScore);
      }
      setEditMode(prev => ({ ...prev, [id]: false }));
      setEditScores(prev => ({ ...prev, [id]: '' }));
    }
  };

  const filtered = students.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase())
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
                {role === 'teacher' && editMode[s.id] ? (
                  <input
                    className='score-input'
                    type="number"
                    autoFocus
                    placeholder="Ball kiriting"
                    value={editScores[s.id]}
                    onChange={(e) => handleInputChange(s.id, e.target.value)}
                    onKeyPress={(e) => handleInputKeyPress(e, s.id)}
                    onBlur={() => setEditMode(prev => ({ ...prev, [s.id]: false }))}
                  />
                ) : (
                  <p id="score" onClick={() => role === 'teacher' && handleScoreClick(s.id, s.score)}>
                    <span>Ball:</span> {s.score > 0 ? `+${s.score}` : s.score || 0}
                  </p>
                )}
                {role === 'teacher' && (
                  <>
                    <button className='plus' onClick={() => handleUpdate(s.id, (s.score || 0) + 1)}>+</button>
                    <button className='minus' onClick={() => handleUpdate(s.id, (s.score || 0) - 1)}>-</button>
                    <button className='del' onClick={() => handleDelete(s.id)}>O‘chirish</button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-student">O‘quvchi topilmadi</p>
        )}
      </div>
      {role === 'teacher' && <Pages groupId={groupId} />}
    </div>
  );
};

export default Score;