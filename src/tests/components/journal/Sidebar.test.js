import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'; // Para la ayuda

import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn(),
}));

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '1',
        name: 'Megan'
    },
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

const wrapper = mount( 
    <Provider store={ store }>
        <Sidebar />
    </Provider>
);


describe('Pruebas en <Sidebar />', () => {
    
    test('debe de mostrarse correctamente', () => {
        // snapshot
        expect( wrapper ).toMatchSnapshot();
    });

    test('debe de llamar la accion de startLogout', () => {
        // debe de llamar la accion de logout
        wrapper.find('button').prop('onClick')();

        expect( startLogout ).toHaveBeenCalled();
    });

    test('debe de llamar la accion de startNewNote', () => {
        // debe de llamar la accion de startNewNote
        wrapper.find('.journal__new-entry').prop('onClick')();

        expect( startNewNote ).toHaveBeenCalled();
    });
});
