import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { getAuth } from "firebase/auth";



function SignoutButton() {
    const navigate = useNavigate();
    const auth = getAuth()
    return ( 
        <Button title="logout" 
      onClick={() => {
        auth.signOut()
        .then(() => {
            console.log('User signed out!')
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            navigate('/')
        });
      }}
      style={{
        backgroundColor: '#E5D9F2',
        color: 'white',
        width: '20vw',
        height: '3vh',
        border: 'none',
        borderRadius: '5px',
        fontSize: '18px',
        fontFamily: 'Arial',
        position: 'absolute',
        right: "3vw",
        top: "2vh",
      } }></Button>
     );
}

export default SignoutButton;