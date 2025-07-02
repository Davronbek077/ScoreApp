import React from 'react';
import './navbar.css';

const Navbar = ({ onMenuClick, role, groupName, groupPassword }) => (
  <nav className="navbar">
    {role === 'teacher' && (
      <button className="menu-icon" onClick={onMenuClick}>
        <span>&#9776;</span>
      </button>
    )}
    <div className="navbar-title">
    {groupName
  ? `${groupName}${role === 'teacher' && groupPassword ? ` (${groupPassword})` : ''}`
  : "ScoreApp"}
    </div>
  </nav>
);

export default Navbar;