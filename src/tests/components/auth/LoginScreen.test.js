import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';


import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'; // Para la ayuda

import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startGoogleLogin, startLoginEmailPass } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPass: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn(); // Simular el dispatch

const wrapper = mount( 
    <Provider store={ store }>
        <MemoryRouter >
            <LoginScreen />
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en <LoginScreen />', () => {

    beforeEach( () => {
        store = mockStore(initState);
        jest.clearAllMocks();
    })

    test('debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();
    });

    test('debe de disparar la accion de startGoogleLogin', () => {
        
        wrapper.find('.google-btn').prop('onClick')();

        expect( startGoogleLogin ).toHaveBeenCalled();
    });

    test('debe de disparar la accion de startLoginEmailPass', () => {
        
        const email = 'test@gmail.com';
        const password = '123456';

        wrapper.find('input[name="email"]').simulate('change', {
            target: {
                name: "email",
                value: email
            }
        });

        wrapper.find('input[name="password"]').simulate('change', {
            target: {
                name: "password",
                value: password
            }
        })

        wrapper.find('form').prop('onSubmit')({ 
            preventDefault () {} 
        });

        expect( startLoginEmailPass).toHaveBeenCalledWith(email, password);

    });
    
});
