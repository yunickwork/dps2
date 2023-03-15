import React from 'react'
import './MyAlertTown.scss'

const MyAlertTown = ({ myTowns, setMyTowns }) => {
    return (
        <div className='my-alert-town-container'>
            <header style={{ textAlign: `${myTowns.length > 0 ? 'right' : 'center'}` }}>
                <h3>{myTowns.length === 0 ? '目前無選擇警報鄉鎮' : ''}</h3>
                {myTowns.length > 0 && <button onClick={() => setMyTowns([])} className='my-alert-town-clear'>重新選則按鈕</button>}
            </header>
            <div className='my-alert-town-wrapper'>
                {myTowns.map((town) =>
                    <button className='my-alert-town-list' key={town.id}>
                        <p>{town.city}</p>
                        {'-'}
                        <p>{town.town}</p>
                    </button>
                )}
            </div>
        </div>
    )
}

export default MyAlertTown