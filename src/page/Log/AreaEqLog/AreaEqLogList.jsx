import React, { useState } from 'react'
import './AreaEqLog.scss'
import { AiFillFileText } from "react-icons/ai";
import AreaEqLogBox from './AreaEqLogBox';

const AreaEqLogList = ({ rangePageLogDB, page, rowsPerPage, logDBLength, detailSwitch }) => {

    const [openBox, setOpenBox] = useState(false)
    const [messageIdDB, setMessageIdDB] = useState([])
    const [eqEvent, setEqEvent] = useState([])

    let detailHandle = (item) => {
        // get message id data
        const messageIdHTTP = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageID: item.messageID })
        };

        fetch(`http://10.100.105.103:4000/datas/Area_data/Log/MessageId`, messageIdHTTP)
            .then(response => response.json())
            .then(data => setMessageIdDB(data))
            .catch(err => console.log(err))
        // open box
        setOpenBox(true)
        setEqEvent(item)
    }

    return (
        <div className='area-eq-log-list-container'>
            {logDBLength !== 0 && <div className='area-eq-log-list-title'>
                <h3>序號</h3>
                <h3>地震編號</h3>
                <h3>最大震度</h3>
                <h3>地震時間</h3>
                {detailSwitch === false ? <h3>詳細內容</h3> : ''}
            </div>}
            {logDBLength === 0 && <div style={{ textAlign: 'center', padding: '10px' }}><h2>鄉鎮地震報告無資料</h2></div>}
            {rangePageLogDB.map((item, index) => (
                <div key={index} className='area-eq-log-list'>
                    <p>{page * rowsPerPage >= rowsPerPage ? page * rowsPerPage + index + 1 : index + 1}</p>
                    <p>{item.messageID}</p>
                    <p>{item.inx >= 7.0 ? '7級' :
                        item.inx >= 6.5 ? '6強' :
                            item.inx >= 6.0 ? '6弱' :
                                item.inx >= 5.5 ? '5強' :
                                    item.inx >= 5.0 ? '5弱' :
                                        item.inx >= 4.0 ? '4級' :
                                            item.inx >= 3.0 ? '3級' :
                                                item.inx >= 2.0 ? '2級' :
                                                    item.inx >= 1.0 ? '1級' : '0級'}</p>
                    <p>{item.eventtime}</p>
                    {detailSwitch === false ? <button
                        style={{ fontSize: '24px' }}
                        onClick={() => detailHandle(item)}
                    >
                        <AiFillFileText />
                    </button> : ''}
                </div>
            ))}
            <AreaEqLogBox setOpenBox={setOpenBox} openBox={openBox} messageIdDB={messageIdDB} eqEvent={eqEvent} />
            <div className='log-hr'></div>
        </div>
    )
}

export default AreaEqLogList