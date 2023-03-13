import React from 'react'
import './CwbEqLog.scss'
import { MdOutlineClose } from "react-icons/md";

const CwbEqLogBox = ({ openBox, setOpenBox, eqIdDB }) => {
    // console.log(eqIdDB)
    if (eqIdDB === null) return
    return (
        <div className='cwb-eq-log-box-container'
            style={{ display: `${openBox === true ? 'flex' : 'none'}` }}
        >
            <button
                className='cwb-eq-log-box-close'
                onClick={() => { setOpenBox(false) }}
            >
                <MdOutlineClose />
            </button>
            <div className='cwb-eq-log-box-bg' onClick={() => { setOpenBox(false) }}></div>
            <div className='cwb-eq-log-box-wrapper'>
                <h1>氣象局地震事件詳細內容</h1>
                <h3>地震編號 : {eqIdDB[0].id}</h3>
                <textarea style={{ width: '100%', fontSize: '1.1rem', padding: '20px' }} cols="100%" readOnly={true} rows="20" value={eqIdDB[0].xml !== null ? eqIdDB[0].xml : '無資料'}></textarea>
            </div>
        </div>
    )
}

export default CwbEqLogBox