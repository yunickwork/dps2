import React from 'react'
import './Loading.scss'

const Loading = ({ height }) => {
    return (
        <div className='loading-container' style={{ minHeight: `${height}vh`, textAlign: `center` }}>
            <div className='loading-wrapper'>
                <div className="spinner">
                    <svg className='loading-svg' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle className='loading-circle' cx="50" cy="50" r="46" />
                    </svg>
                </div>
                <p>Loading</p>
            </div>
        </div>
    )
}

export default Loading