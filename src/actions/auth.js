import { getAuth, signInWithPopup } from 'firebase/auth';
import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";

export const startLoginEmailPass = ( email, password ) => {
    return ( dispatch ) => { // es un callback, ocupa el dispatch del THUNK-Middleware

        setTimeout(() => {
            
            dispatch( login( email, password ) );

        }, 3500);
    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(( { user }) => {
                    dispatch( login( user.uid, user.displayName ) );
            });
            // .then( userCred => {      // Sirve para ver toda la info que devuelve el callback
            //     console.log(userCred) // en consola, utillizando user y desestructurandolo
            // })
        }
}

export const login = (uid, displayName) => ({
        type: types.login,
        payload: {
            uid,
            displayName
        }
})

// Lo mismo que arriba pero simplificado

// export const login = (uid, displayName) => {
//     return {
//         type: types.login,
//         payload: {
//             uid,
//             displayName
//         }
//     }
// }
