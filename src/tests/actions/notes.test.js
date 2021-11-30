/**
* @jest-environment node
*/

import { deleteDoc, disableNetwork, doc, getDoc } from '@firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as fs from 'fs';

import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn()
}));
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: 'YxCj1Yz9bpJkVwcumM1D',
            title: 'activeMock',
            body: 'Soy la cuerpa',
        }
    }
};

let store = mockStore(initState);
global.scrollTo = jest.fn();

describe('Pruebas con las acciones de notes', () => {

    beforeEach( () => {
        store = mockStore(initState);
    })
     
    afterAll(() => {
        disableNetwork(db);
    })

    test('debe de crear una nota startNewNote', async() => {
        
        await store.dispatch( startNewNote() );

        const actions = store.getActions();
        // console.log(actions);

        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect( actions[1] ).toEqual({
            type: types.notesAddBNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const { uid } = store.getState().auth;
        const docId = actions[0].payload.id;
        const noteRef = doc(db, `${ uid }/journal/notes/${ docId }`);

        await deleteDoc( noteRef );
    });

    test('startLoadingNotes debe cargar las notas', async() => {
        
        await store.dispatch( startLoadingNotes('TESTING') );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        };

        expect( actions[0].payload[0] ).toMatchObject( expected );

    });

    test('stateSaveNote debe de actualizar la nota', async() => {

        const note = {
            id: 'ZoQSsRpnK2IsFGe2XZyk',
            title: 'titulo',
            body: 'body'
        };

        await store.dispatch( startSaveNote( note ));

        const actions = store.getActions();
        // console.log(actions);
        expect( actions[0].type ).toBe( types.notesUpdated );

        const noteRef = doc(db, `TESTING/journal/notes/${ note.id }`);
        const getNote = await getDoc( noteRef );

        expect( getNote.data().title ).toBe( note.title );

    });

    test('startUploading debe de actualizar el url del entry', async() => {
        
        fileUpload.mockReturnValue('https://hola-mundo.com');
        fs.writeFileSync('foto.jpg', '');
        const file = fs.readFileSync('foto.jpg');

        await store.dispatch( startUploading( file ));

        const noteRef = doc(db, `TESTING/journal/notes/YxCj1Yz9bpJkVwcumM1D`);
        const getNote = await getDoc( noteRef );
        expect( getNote.data().url ).toBe('https://hola-mundo.com')

    });

 });
