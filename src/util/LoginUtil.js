import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export async function LoginOnClick({email, password}) {
    if (email === '' || password === '') return
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {  
        const user = userCredential.user  
        console.log(user)
     })
    .catch((error) => {     
        const errorCode = error.code
        const errorMessage = error.message  
        console.log(errorCode, errorMessage)   
    })
    .finally(() => {     
        console.log('Login process is done')   
    });
    return
}

export function isAuth() {
    const auth = getAuth();
    return auth.currentUser ? true : false
}

