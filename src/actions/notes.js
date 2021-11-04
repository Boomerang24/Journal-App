import { db } from "../firebase/firebase-config";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "@firebase/firestore";
import Swal from "sweetalert2";

import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from "../helpers/fileUpload";


export const startNewNote = () => {
    return async( dispatch, getState ) => {

        // const state = getState(); // Sirve para obtener el state de Redux en "store.js"
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime() // Obtiene la fecha de forma automatica
        }

        const doc = await addDoc(collection(db, `${ uid }`, "journal/notes"), {
            title: '',
            body: '',
            date: new Date().getTime() // Obtiene la fecha de forma automatica
        });

        dispatch( activeNote( doc.id, newNote) );
        dispatch( addNewNote( doc.id, newNote ));
    }
};

export const activeNote = ( id, note ) => ({ // se ponen parentesis para regresar un objeto
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddBNew,
    payload: {
        id, ...note
    }
})

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {

        const notes = await loadNotes( uid );
        dispatch( setNotes(notes) );
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if( !note.url ) {
            delete note.url
        }

        const noteToFireStore = { ...note }; // Se clona para no modificar el note original
        delete noteToFireStore.id; // Eliminamos la propiedad id

        const noteRef = doc(db, `${ uid }/journal/notes/${ note.id }`);
        try {
            const noteUpdated = await updateDoc(noteRef, noteToFireStore);
            dispatch( refreshNote( note.id, noteToFireStore ));
            Swal.fire('Saved', `Note: "${note.title}" has been saved`, 'success');           
            return noteUpdated;
        } catch (error) {
            Swal.fire('Error!!!', `Note: "${note.title}" wasn't saved`, 'error');
        }        
    }
}

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {
        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload( file );
        
        activeNote.url = fileUrl; // activeNote URL is updated before saving the note
        
        dispatch( startSaveNote( activeNote ));

        Swal.close();
    }
}

export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {
         
        const uid = getState().auth.uid;
        const noteRef = doc(db, `${ uid }/journal/notes/${ id }`);
        await deleteDoc(noteRef);

        dispatch( deleteNote( id ) );
    }
}


export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});
