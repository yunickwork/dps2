import React from 'react'
import './MapEqColor.scss'

const MapEqColor = () => {
    return (
        <div className='map-eq-color'>
            <h3>震度</h3>
            <section>
                <div><span className='map-eq-color-level'></span>7級</div>
                <div><span className='map-eq-color-level'></span>6強</div>
                <div><span className='map-eq-color-level'></span>6弱</div>
                <div><span className='map-eq-color-level'></span>5強</div>
                <div><span className='map-eq-color-level'></span>5弱</div>
                <div><span className='map-eq-color-level'></span>4級</div>
                <div><span className='map-eq-color-level'></span>3級</div>
                <div><span className='map-eq-color-level'></span>2級</div>
                <div><span className='map-eq-color-level'></span>1級</div>
            </section>
        </div>
    )
}

export default MapEqColor