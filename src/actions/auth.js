import Swal from 'sweetalert2';
import { 
    getAuth,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut 
} from 'firebase/auth';
import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';

export const startLoginEmailPass = ( email, password ) => {
    return ( dispatch ) => { // es un callback, ocupa el dispatch del THUNK-Middleware

        dispatch( startLoading() );

        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
            .then( ({ user }) => {
                dispatch( login( user.uid, user.displayName ));
                
                dispatch( finishLoading() );
            })
            .catch( e => {
                // console.log(e);
                dispatch( finishLoading() );
                if ( e.message.includes('password') ){

                    Swal.fire('Error', 'Incorrect Password', 'error');

                } else {
                    Swal.fire('Error', `There is no user registered with the email: "${ email }"`, 'error');
                }
            })
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name) => {
    return ( dispatch ) => { // es un callback, ocupa el dispatch del THUNK-Middleware

        const auth = getAuth();
        createUserWithEmailAndPassword( auth, email, password )
            .then( async({ user }) => {

                await updateProfile( user, { displayName: name});
                
                dispatch( login( user.uid, user.displayName ) );                
            })
            .catch( e => {
                // console.log(e);
                Swal.fire('Error', `Email "${email}" is already in use`, 'error');
            })
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
});

export const startLogout = () => {
    return async( dispatch ) => {
        const auth = getAuth();
        await signOut(auth);

        dispatch( logout() );
        dispatch( noteLogout() );
    }
}

export const logout = () => ({
    type: types.logout
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
