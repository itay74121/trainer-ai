import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background';
import './Dashboard.css';
import nameList from '../data/names.json'; // Import the name list from a JSON file
import SignoutButton from '../components/SignoutButton';
import { isAuth } from '../util/LoginUtil';

function Dashboard() {
  const [names, setNames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setNames(nameList);
    if (isAuth() !== true) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Background>
      <SignoutButton />
      <h1 className='title'>choose your trainer</h1>
      <div className="dashboard-grid">
        {names.map((name, index) => (
          <div key={index} className="dashboard-box" onClick={() => navigate(`/chat/${name}`)}>
            {name}
          </div>
        ))}
      </div>
    </Background>
  );
}

export default Dashboard;
