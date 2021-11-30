import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'; // Para la ayuda

import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn(),
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
        active: {
            id: 1234,
            date: 0,
            title: 'Wuenas Noches',
            body: 'probanding...',
        }
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn(); // Simular el dispatch

const wrapper = mount( 
    <Provider store={ store }>
        <NoteScreen />
    </Provider>
);

describe('Pruebas en <NoteScreen />', () => {
    
    test('debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();
    });

    test('debe de disparar el active note', () => {

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Wuenos Dias'
            }
        });

        expect( activeNote ).toHaveBeenCalled();
        expect( activeNote ).toHaveBeenLastCalledWith(
            1234,
            {
                title: "Wuenos Dias",
                body: "probanding...",
                id: 1234,
                date: 0
            }
        );
        
    });
});
