import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Background from '../components/Background';
import '../styles/Chat.css'; // Correct import path for the Chat CSS file
import listnames from '../data/names.json'; // Correct import path for the listnames data
import ChatMessage from '../components/ChatMessage';
import { AskAI } from '../util/crack'; // Correct import path for the AskAI function
import { isAuth } from '../util/LoginUtil';

function Chat() {
  const { name } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [contains, setContains] = useState(true);
  const [modelname, setModelname] = useState(null);
  const [roles, setRoles] = useState([]);
  const dataRef = useRef(null); // Reference to the scrollable element
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuth() !== true) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    // Function to scroll the element to the bottom
    if (dataRef.current) {
        dataRef.current.scrollTop = dataRef.current.scrollHeight;
    }
    
  }, [messages]);

  useEffect(() => {
    if (!listnames.includes(name)) {
      setContains(false);
    }else{
        setModelname(name);
    }
  }, [name]);

  const handleSendMessage = async (modelname) => {
    if (message.trim()) {
      setLoading(true);
      AskAI({ message, messages, setMessages , roles, setRoles, model: modelname, setLoading });
      setMessage('');
    }
  };

  return (
    contains ? (
      <Background style={{ justifyContent: 'flex-end' }}>
        <h1 style={{ margin:0, marginBottom:"1.5vh"}}>{name}</h1>
        <div className="chat-box" ref={dataRef}>
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} user={roles[index]==="user"} />
            /*<div key={index} className="chat-message">{msg}</div>*/
          ))}
          {loading && (
            <div className='chat-message-other' style={{marginLeft:"75vw"}}>
                <div className="loading-dots">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )}
        
        </div>
        <div className="chat-input-container">
          <textarea
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="chat-input"
          />
          <button onClick={()=>{handleSendMessage(modelname)}} className="chat-send-button">Send</button>
        </div>
      </Background>
    ) : (
      <Background>
        <h1>Trainer not found</h1>
      </Background>
    )
  );
}

export default Chat;
