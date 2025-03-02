import React, { useState } from 'react';
import Background from '../components/Background';
import Button from '../components/Button';
import { SignupOnClick } from '../util/SignupUtil';



function Signup() {
  const [password, setPassword] = useState('');
  const [Passwordvalidate, setPasswordalidate] = useState('');
  const [email, setEmail] = useState('');


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
      <h1>Signup Page</h1>
      <input type="text" placeholder="Email" style={input_style} onInput={(event) => { setEmail(event.target.value)}}/>
      <input type="password" placeholder="Password" style={input_style} onInput={(event) => { setPassword(event.target.value) }}/>
      <input type="password" placeholder="Validate Password" style={input_style} onInput={(event) => { setPasswordalidate(event.target.value) }} />
      <Button title="signup" style={button_style} onClick={()=>{
        console.log(email,password)
        if (password !== Passwordvalidate) {
          alert("Password does not match")
          return
        }
        SignupOnClick({email:email,password:password})
        }}>Signup</Button>
    </Background>
  );
}

export default Signup;
