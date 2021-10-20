import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            
            <div 
                className="journal__entry-picture"
                style={{ // En React debe de ser un objeto para especificar el estilo del elemento
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://i0.wp.com/wallpapersfortech.com/wp-content/uploads/2021/03/fc5b092.jpg?fit=780%2C1689&ssl=1)'
                }}
            />

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Un nuevo dia
                </p>
                <p className="journal__entry-content">
                    Amet qui aliquip sint quis pariatur consequat qui laboris labore.
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>

        </div>
    )
}
