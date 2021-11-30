import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom'; // Para la ayuda

import { login, logout, startLoginEmailPass, startLogout } from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Pruebas con las acciones de Auth', () => {

    beforeEach( () => {
        store = mockStore(initState);
    })

    test('login y logout deben de crear la accion respectiva', () => {

       const samplePayload = {
           uid: '12312321',
           displayName: 'Hayley'
       };

       const loginAction = login('12312321', 'Hayley');
       const logoutAction = logout();

       expect( loginAction ).toMatchObject({
           type: types.login,
           payload: samplePayload
       });

       expect( logoutAction ).toEqual({
           type: types.logout
       });
        
    });

    test('debe de realizar el startLogout', async() => {
        
        await store.dispatch( startLogout() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.logout
        });

        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        });

    });

    test('debe de iniciar el startLoginEmailPass', async() => {

        const userTest = {
            email: 'test@testing.com',
            pass: '123456'
        }
        
        await store.dispatch( startLoginEmailPass( userTest.email, userTest.pass ) );

        const actions = store.getActions();

        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: 'QtgRl3eGiheYtUnoPze5hmD6sNG3' || expect.any(String),
                displayName: null
            }
        })
    });
    
});
