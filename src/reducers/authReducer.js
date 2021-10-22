import { types } from "../types/types";

/*
    {
        uid: dsafd21fsa1fsaq1,
        name: 'Alexis'
    }

*/

export const authReducer = ( state = {}, action ) => {
    
    switch ( action.type ) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        
        case types.logout:
            return { };
    
        default:
            return state;
    }
}
