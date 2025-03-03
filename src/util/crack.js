import axios from "axios"
import { SignJWT,jwtVerify } from 'jose';
import { getAuth } from "firebase/auth";

async function getJWT(data) {
    const token=process.env.REACT_APP_TOKEN
    const secret = new TextEncoder().encode(token);
    const jwt = await new SignJWT(data)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret);

    return jwt
}

async function getPayload(jwt){
    try{
        const secret = new TextEncoder().encode(process.env.REACT_APP_TOKEN); // Use correct secret
        const { payload } = await jwtVerify(jwt, secret);
        return payload
    }
    catch (error){
    
        return {  
            message: {
                content: "No Authorization"
            }
        }
    }
    
}



export async function AskAI({ message, messages, setMessages, roles, setRoles, model, setLoading }) {
    // Add user's message to state immediately
    const updatedMessages = [...messages, message];
    const updatedRoles = [...roles, "user"];
    setMessages(updatedMessages);
    setRoles(updatedRoles);
    try {
        const obj = {
            model: model,
            messages: [...updatedMessages.map((msg, index) => ({
                role: updatedRoles[index],
                content: msg,
            })), { role: "user", content: message }],
            userid: getAuth().currentUser.uid,
            stream: false,
        }
        const response = await axios.post(process.env.REACT_APP_OLLAMA_API, {token:await getJWT(obj)});
        response.data = await getPayload(response.data.token)
    
        // Append the assistant's message to the state
        setMessages((prevMessages) => [...prevMessages, response.data.message.content]);
        setRoles((prevRoles) => [...prevRoles, "assistant"]);
    } catch (error) {
    
        setMessages((prevMessages) => [...prevMessages, `${model} is not available`]);
        setRoles((prevRoles) => [...prevRoles, "assistant"]);
    } finally {
        setLoading(false);
    }
}
