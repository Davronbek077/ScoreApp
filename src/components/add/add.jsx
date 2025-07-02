import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { ref, push } from 'firebase/database';
import Pages from '../../pages/pages';
import './add.css';

const Add = () => {
  const { groupId } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const studentsRef = ref(db, `groups/${groupId}/students`);
    await push(studentsRef, { name });
    setName('');
    navigate(`/group/${groupId}`);
  };

  return (
    <div className="add-container">
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Ism"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <button className='add-btn' type="submit">Qo'shish</button>
      </form>
      <Pages groupId={groupId}/>
    </div>
  );
};

export default Add;