import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'; // Para la ayuda
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn(); // Simular el dispatch

const note = {
    id: 1,
    date: 0,
    title: 'Hola',
    body: 'mundo',
    url: 'https://randomplace.com/pic1.jpg'
}

const wrapper = mount( 
    <Provider store={ store }>
        <JournalEntry { ...note }/>
    </Provider>
);

describe('Pruebas en <JournalEntry />', () => {
    
    test('debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    });

    test('debe de activar la nota', () => {
        
        wrapper.find('.journal__entry').prop('onClick')();

        expect( store.dispatch ).toHaveBeenCalled();
        expect( store.dispatch ).toHaveBeenCalledWith(
            activeNote( note.id, { ...note } )
        );
    });

});
