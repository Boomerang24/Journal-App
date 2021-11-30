import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';


import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'; // Para la ayuda

import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';

jest.mock('../../actions/auth', () => ({
    login: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        notes: [],
        active: null
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn(); // Simular el dispatch

describe('Pruebas en <AppRouter />', () => {
    
    test('debe de llamar el login si estoy autenticado', async() => {
        
        await act( async () => {

            let user;

            const auth = getAuth();
            const userCred = await signInWithEmailAndPassword(auth, 'test@testing.com', '123456');
            user = userCred.user.uid;

            const wrapper = mount( 
                <Provider store={ store }>
                    <MemoryRouter >
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );

        });

        expect( login ).toHaveBeenCalled();
        expect( login ).toHaveBeenCalledWith('QtgRl3eGiheYtUnoPze5hmD6sNG3', null);

    });
});
