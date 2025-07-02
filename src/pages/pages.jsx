import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './pages.css';

const Pages = ({ groupId: propGroupId }) => {
  const params = useParams();
  const groupId = propGroupId || params.groupId;
  const navigate = useNavigate();

  return (
    <div className="pages-section">
      {groupId && <button onClick={() => navigate(`/group/${groupId}`)}>Asosiy</button>}
      {groupId && <button onClick={() => navigate(`/group/${groupId}/add`)}>Qo'shish</button>}
    </div>
  );
};

export default Pages;