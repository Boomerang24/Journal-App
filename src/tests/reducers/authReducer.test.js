import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {

    test('debe de probar la action de login', () => {
        
        const initialState = {
            uid: '1234',
            displayName: 'Megan'
        }

        const action = {
            type: types.login,
            payload: initialState
        }

        const state = authReducer( initialState, action );
        expect( state ).toEqual( { uid: '1234', name: 'Megan'} );
    });

    test('debe de probar la action de logout', () => {
        
        const newLogin = {
            uid: '1234',
            displayName: 'Megan'
        }

        const action = {
            type: types.logout
        }

        const state = authReducer( newLogin, action );
        expect( state ).toMatchObject( {} );
        expect( state ).not.toEqual( { uid: '1234', name: 'Megan'} );
    });

    test('debe de retornar el estado por defecto', () => {
        
        const demoInitialState = {
            uid: 'dsafd21fsa1fsaq1',
            name: 'Alexis'
        }
        
        const state = authReducer( demoInitialState, {});
        expect( state ).toEqual( demoInitialState );
    });
});
