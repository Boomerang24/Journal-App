import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                />

                <textarea
                    placeholder="What happened today?"
                    className="notes__textarea"
                >                    
                </textarea>

                <div className="notes__image">
                    <img
                        src="https://i.pinimg.com/736x/14/ec/c6/14ecc690772e31903ad3d6e64500d0c2.jpg"
                        alt="imagen-layout"
                    />
                </div>

            </div>

        </div>
    )
}
