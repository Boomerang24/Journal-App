import { finishLoading, removeErrorAction, setErrorAction, startLoading } from "../../actions/ui";
import { types } from "../../types/types";

describe('Pruebas en ui-actions', () => {
    
    test('todas las acciones deben de funcionar', () => {
        
        const sameplObj = {
            type: types.uiSetError,
            payload: 'Help!!!'
        }

        const action = setErrorAction( sameplObj.payload );

        expect(action).toMatchObject( sameplObj );
    });

    const removeError = removeErrorAction();
    const startLoadingAct = startLoading();
    const finishLoadingAct = finishLoading();

    expect(removeError).toEqual({
        type: types.uiRemoveError
    });

    expect(startLoadingAct).toEqual({
        type: types.uiStartLoading
    });
    
    expect(finishLoadingAct).toEqual({
        type: types.uiFinishLoading
    });
});
