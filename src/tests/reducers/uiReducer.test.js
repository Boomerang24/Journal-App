import { uiReducer } from "../../reducers/uiReducer";
import { types } from "../../types/types";

describe('Pruebas en uiReducer', () => {
    
    const initState = {
        loading: false,
        msgError: null
    }

    test('debe de probar la action de uiSetError', () => {
        
        const action = {
            type: types.uiSetError,
            payload: 'Soy un error'
        }

        const uiState = uiReducer( initState, action);
        expect(uiState).toMatchObject( { loading: false, msgError: action.payload });

    });
    
    test('debe de probar la action de uiRemoveError', () => {
        
        const newState = {
            ...initState,
            msgError: 'Soy un error'
        }

        const action = {
            type: types.uiRemoveError
        }

        const uiState = uiReducer( newState, action );
        expect( uiState ).toEqual( initState );
    });
    
    test('debe de probar la action de uiStartLoading', () => {
        
        const action = {
            type: types.uiStartLoading
        }

        const uiState = uiReducer( initState, action );
        expect( uiState ).toMatchObject({ ...initState, loading: true });
    });
    
    test('debe de probar la action de uiFinishLoading', () => {
        
        const newState = {
            ...initState,
            loading: true
        }

        const action = {
            type: types.uiFinishLoading
        }

        const uiState = uiReducer( newState, action );
        expect( uiState ).toEqual( initState );
    });
    
    test('debe de probar la action de retornar el estado por defecto', () => {
        
        const uiState = uiReducer( initState, {} );
        expect( uiState ).toStrictEqual( initState );
    });
    
});
