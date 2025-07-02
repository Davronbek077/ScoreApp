import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { ref, onValue, push, remove } from 'firebase/database';
import { Link } from 'react-router-dom';
import "./Sidebar.css"

const Sidebar = ({ onClose, role, groupId }) => {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, groupId: null });

  useEffect(() => {
    const groupsRef = ref(db, 'groups');
    const unsubscribe = onValue(groupsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const groupList = Object.entries(data).map(([id, value]) => ({ id, ...value }));
      setGroups(groupList);
    });
    return () => unsubscribe();
  }, []);

  const handleAddGroup = async () => {
    if (newGroup.trim() === '' || newPassword.trim() === '') return;
    const groupsRef = ref(db, 'groups');
    await push(groupsRef, { name: newGroup, password: newPassword });
    setNewGroup('');
    setNewPassword('');
    setShowInput(false);
  };

  // Guruhni o‘chirish funksiyasi
  const handleDeleteGroup = async (id) => {
    if (window.confirm("Guruhni o‘chirishni istaysizmi?")) {
      await remove(ref(db, `groups/${id}`));
    }
  };

  // Faqat o'qituvchi barcha guruhlarni ko'radi, o'quvchi faqat o'z guruhini
  const visibleGroups = role === 'teacher'
    ? groups
    : groups.filter(g => g.id === groupId);

  return (
    <div className="sidebar-overlay" onClick={onClose}>
      <div className="sidebar" onClick={e => e.stopPropagation()}>
        <div className="sidebar-header">
          <h2>Guruhlar</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <ul className="group-list">
          {visibleGroups.map(group => (
            <li key={group.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link to={`/group/${group.id}`} onClick={onClose}>{group.name}</Link>
              {role === 'teacher' && (
                <button
                  className="delete-group-btn"
                  onClick={() => setDeleteModal({ open: true, groupId: group.id})}
                  title="Guruhni o‘chirish"
                >
                  🗑
                </button>
              )}
            </li>
          ))}
        </ul>
        {role === 'teacher' && (
          <div className="add-group-section">
            {showInput ? (
              <div className="add-group-input">
                <input
                  type="text"
                  value={newGroup}
                  onChange={e => setNewGroup(e.target.value)}
                  placeholder="Guruh nomi"
                  autoFocus
                />
                <input
                  type="text"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Guruh paroli"
                />
                <button onClick={handleAddGroup}>Qo'shish</button>
                <button onClick={() => setShowInput(false)}>Bekor qilish</button>
              </div>
            ) : (
              <button className="add-group-btn" onClick={() => setShowInput(true)}>
                + Guruh qo'shish
              </button>
            )}
          </div>
        )}
        {deleteModal.open && (
  <div className="modal-overlay">
    <div className="modal">
      <p>Guruhni o‘chirishni xohlaysizmi?</p>
      <div className="modal-actions">
        <button
          className="modal-yes"
          onClick={async () => {
            await remove(ref(db, `groups/${deleteModal.groupId}`));
            setDeleteModal({ open: false, groupId: null });
          }}
        >
          Ha
        </button>
        <button
          className="modal-no"
          onClick={() => setDeleteModal({ open: false, groupId: null })}
        >
          Yo‘q
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default Sidebar;