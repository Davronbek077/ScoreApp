import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Pages from './pages/pages';
import Navbar from './components/navbar/Navbar';
import Score from './components/score/score';
import Add from './components/add/add';
import Login from './components/login/Login';

function App() {
  const [role, setRole] = useState(null);

  if (!role) {
    return <Login setRole={setRole} />;
  }

  return (
    <>
      {role === 'teacher' && <Pages />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Score role={role} />} />
        {role === 'teacher' && <Route path="/add" element={<Add />} />}
      </Routes>
    </>
  );
}

export default App;
