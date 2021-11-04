import { collection, getDocs, query } from "@firebase/firestore"
import { db } from "../firebase/firebase-config"


export const loadNotes = async( uid ) => {

    const notesSnap = await getDocs(query(collection(db, `${ uid }/journal/notes`)));
    const notes = [];

    notesSnap.forEach( snapChild => {
        // console.log( snapChild.data() ); 
        notes.push({
            id: snapChild.id,
            ...snapChild.data()
        });
    });

    return notes;
}
