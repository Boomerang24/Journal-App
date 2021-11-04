import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async( user ) => {
            
            if ( user?.uid ) { // if user exists, validates if uid exists
                dispatch( login( user.uid, user.displayName ));
                setIsLoggedIn( true );
                dispatch( startLoadingNotes( user.uid ) );

            } else {
                setIsLoggedIn( false );
            }

            setChecking( false );
        });
    }, [ dispatch, setChecking, setIsLoggedIn ])

    if ( checking ) {
        return (
            <div className="auth__main">
                <img 
                    src="https://acegif.com/wp-content/uploads/loading-87.gif" 
                    alt="cargando" 
                />
            </div>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        isLoggedIn={ isLoggedIn }
                        path="/auth/"
                        component={ AuthRouter } 
                    />
                    <PrivateRoute
                        isLoggedIn={ isLoggedIn }
                        exact path="/" 
                        component={ JournalScreen }
                    />
                </Switch>
            </div>
        </Router>
    )
}
