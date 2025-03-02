import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export function SignupOnClick({email, password}) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    })
    .finally(() => {
        console.log('Signup process is done')
    });
    return  
}