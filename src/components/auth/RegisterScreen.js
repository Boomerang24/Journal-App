import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { removeErrorAction, setErrorAction } from '../../actions/ui';

import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {

    const dispatch = useDispatch(); // dispatch del redux

    const user = {
        name: 'Hernando',
        email: 'nando@gmail.com',
        password: '12345',
        password2: '12345'
    }

    const [ formValues, handleInputChange ] = useForm( user );

    const { name, email, password, password2 } = formValues;
    
    const handleRegister = (e) => {
        e.preventDefault();

        if ( isFormValid() ) {
            console.log('Formulario correcto');
        }
    }

    const isFormValid = () => {

        if( name.trim().length === 0  ){
            dispatch( setErrorAction('Name is required') );
            return false;
        } else if ( !validator.isEmail( email ) ) {
            dispatch( setErrorAction('Email is not valid') );
            return false;
        } else if ( password !== password2 || password.length < 5 ){
            dispatch( setErrorAction('Password should be at least 6 characters long and match!') );
            return false;
        }

        dispatch( removeErrorAction() );

        return true;
    }


    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={ handleRegister }>

                <div className="auth__alert-error">
                    Hola Mundo
                </div>

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
