import React from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background';
import Button from '../components/Button';

function Home() {
  const navigate = useNavigate();

  var button_style = {
    backgroundColor: '#FAF3E0',
    color: 'black',
    width: '75vw',
    height: '7vh',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
    fontSize: '18px', // Bigger font size
    fontFamily: 'Arial, sans-serif' // More elegant font
  };
  var button_style1 = {...button_style,'marginTop':'60vh'};

  return (
    <Background>
      <Button title="login" style={button_style1} onClick={() => navigate('/login')}></Button>
      <Button title="signup" style={button_style} onClick={() => navigate('/signup')}></Button>
    </Background>
  );
}

export default Home;
