import React from 'react'

const MyAlertTown = ({ myTowns }) => {
    return (
        <div className='my-alert-town-container'>
            {myTowns.map((town) =>
                <div key={town.id}>
                    <p>{town.city}</p>
                    <p>{town.town}</p>
                </div>
            )}
        </div>
    )
}

export default MyAlertTown