import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';

import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

    const dispatch = useDispatch()

    const { active:note } = useSelector(state => state.notes);
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { body, title, id } = formValues;

    const activeId = useRef( note.id );

    useEffect(() => {

        if ( note.id !== activeId.current ) {
            reset( note ); // Reinicia los valores iniciales por la nota actual
            activeId.current = note.id; // Actualiza la nota activa por la nota actual, para evitar un ciclo infinito
        }

    }, [ note, reset ]);

    useEffect(() => {
        dispatch( activeNote( formValues.id, { ...formValues } )); // Actualiza activeNote en Redux
    }, [ formValues, dispatch ]);

    const handleDelete = () => {
        Swal.fire({
            title: 'Deleting...',
            icon: 'info',
            allowOutsideClick: false,
            showConfirmButton: false,
        });
        dispatch( startDeleting( id ));
        setTimeout(() => {
            Swal.fire({
                title: 'Deleted Successfully',
                icon: 'success',
            })
        }, 1500);
    }

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    name="title"
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    name="body"
                    placeholder="What happened today?"
                    className="notes__textarea"
                    value={ body }
                    onChange={ handleInputChange }
                >                    
                </textarea>

                {
                    (note.url) &&
                        <div className="notes__image">
                            <img
                                src={ note.url }
                                alt="imagen-layout"
                            />
                        </div>
                }

            </div>

            <button 
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>

        </div>
    )
}
