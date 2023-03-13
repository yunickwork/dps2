import React, { useState } from 'react'
import './Adam.scss'
import AdamStatus from './AdamStatus/AdamStatus'
import AdamForm from './AdamForm/AdamForm'

const Adam = () => {
    //選擇
    const [select, setSelect] = useState(false)
    return (
        <div className='adam-container'>
            <div className='adam-wrapper'>
                <div className='adam-select-btn'>
                    <button style={{ backgroundColor: `${select === false ? 'rgb(54, 108, 139)' : ''}`, color: `${select === false ? 'white' : ''}` }} onClick={() => setSelect(false)}>移報設定狀態</button>
                    <button style={{ backgroundColor: `${select === true ? 'rgb(54, 108, 139)' : ''}`, color: `${select === true ? 'white' : ''}` }} onClick={() => setSelect(true)}>移報設定</button>
                </div>
                <h1 className='adam-title'>{select === false ? '移報設定狀態' : '移報設定'}</h1>
                <div className='adam-dashboard-wrapper'>
                    {select === false && <AdamStatus />}
                    {select === true && <AdamForm />}
                </div>
            </div>
        </div >
    )
}

export default Adam