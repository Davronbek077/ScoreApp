import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Score from './components/score/score';
import Add from './components/add/add';
import Pages from './pages/pages';
import Login from './components/login/Login';
import { db } from './firebase';
import { ref, onValue } from 'firebase/database';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [groupName, setGroupName] = useState('');
  const [groupPassword, setGroupPassword] = useState('');
  const location = useLocation();

  useEffect(() => {
    let currentGroupId = groupId;
    const match = location.pathname.match(/group\/([^/]+)/);
    if (match) currentGroupId = match[1];
    if (currentGroupId) {
      const groupRef = ref(db, `groups/${currentGroupId}`);
      const unsubscribe = onValue(groupRef, (snapshot) => {
        const data = snapshot.val();
        setGroupName(data?.name || '');
        setGroupPassword(data?.password || '');
      });
      return () => unsubscribe();
    } else {
      setGroupName('');
      setGroupPassword('');
    }
  }, [location, groupId]);

  if (!role) {
    return <Login setRole={setRole} setGroupId={setGroupId} />;
  }

  return (
    <>
      <Navbar
        onMenuClick={() => setSidebarOpen(true)}
        role={role}
        groupName={groupName}
        groupPassword={groupPassword}
      />
      {sidebarOpen && (
        <Sidebar
          onClose={() => setSidebarOpen(false)}
          role={role}
          groupId={groupId}
        />
      )}
      <div style={{ marginTop: 60 }}>
        <Routes>
          <Route
            path="/"
            element={
              role === 'teacher'
                ? <Pages />
                : <Navigate to={groupId ? `/group/${groupId}` : '/'} />
            }
          />
          <Route
            path="/group/:groupId"
            element={<Score role={role} groupId={groupId} />}
          />
          <Route
            path="/group/:groupId/add"
            element={
              role === 'teacher'
                ? <Add />
                : <Navigate to={groupId ? `/group/${groupId}` : '/'} />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
