import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background';
import Button from '../components/Button';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { LoginOnClick } from '../util/LoginUtil';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState('');
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setAccepted(true);
    } else {
      setAccepted(false);
    }
  });

  useEffect(() => {
    if (accepted === true) {
      navigate('/dashboard');
    }
  }, [accepted,navigate]);

  var input_style = {
    width: '75vw',
    height: '7vh',
    margin: '10px',
    padding: '10px',
    fontSize: '18px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    textAlign: 'center'
  };

  var button_style = {
    backgroundColor: '#E5D9F2',
    color: 'white',
    width: '75vw',
    height: '7vh',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
    fontSize: '18px',
    fontFamily: 'Arial, sans-serif'
  };

  return (
    <Background>
      <h1>Login Page</h1>
      <input type="text" placeholder="Email" style={input_style} onInput={(event)=>setEmail(event.target.value)}/>
      <input type="password" placeholder="Password" style={input_style} 
      onKeyDown={(event)=>{
        if(event.key === 'Enter'){
          LoginOnClick({email:email,password:password})
        }
      }} 
      onInput={(event) => setPassword(event.target.value)}/>
      <Button title="login" style={button_style} onClick={()=>LoginOnClick({email:email,password:password})}>Login</Button>
    </Background>
  );
}

export default Login;
