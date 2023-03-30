import React, { useState } from 'react'
import './CwbEqLog.scss'
import { AiFillFileText } from "react-icons/ai";
import CwbEqLogBox from './CwbEqLogBox';
import { useDomain } from '../../../components/DomainContext/DomainContext';

const CwbEqLogList = ({ rangePageLogDB, page, rowsPerPage, logDBLength, selectReport }) => {
    // Domain
    const { domain } = useDomain();

    const [openBox, setOpenBox] = useState(false)
    const [eqIdDB, setEqIdDB] = useState(null)

    let detailHandle = (id) => {
        // get message id data
        const eqIdHTTP = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, selectReport: `${selectReport === false ? '氣象局報告' : '氣象局速報'}` })
        };

        fetch(`http://${domain}:4000/datas/Cwb/Log/MessageID`, eqIdHTTP)
            .then(response => response.json())
            .then(data => setEqIdDB(data))
            .catch(err => console.log(err))

        // open box
        setOpenBox(true)
    }

    // if(eqIdDB === null) return 

    return (
        <div className='cwb-eq-log-list-container'>
            {logDBLength !== 0 && <div className={`cwb-eq-log-${selectReport === false ? 'report' : 'pReport'}-list-title`}>
                <h3>序號</h3>
                <h3>地震編號</h3>
                <h3>深度Km</h3>
                <h3>芮氏規模</h3>
                <h3>發生時間</h3>
                <h3>東經</h3>
                <h3>北緯</h3>
                <h3>{selectReport === false ? '震央' : '詳細資料'}</h3>
                <h3>詳細資料</h3>
            </div>}
            {logDBLength === 0 && <div style={{ textAlign: 'center', padding: '10px' }}><h2>{selectReport === false ? '氣象局報告' : '氣象局速報'}無資料</h2></div>}
            {rangePageLogDB.map((item, index) => (
                <div className={`cwb-eq-log-${selectReport === false ? 'report' : 'pReport'}-list`} key={item.id}>
                    <p>{page * rowsPerPage >= rowsPerPage ? page * rowsPerPage + index + 1 : index + 1}</p>
                    <p>{item.id}</p>
                    <p>{item.depth}</p>
                    <p>{item.mag}</p>
                    <p>{item.origintime}</p>
                    <p>{item.lon}</p>
                    <p>{item.lat}</p>
                    <p><span style={{ display: `${selectReport === false ? 'block' : 'none'}` }}>{item.Rposition}</span> {selectReport === true && <button onClick={() => detailHandle(item.id)}><AiFillFileText style={{ fontSize: '24px' }} /></button>}</p>
                    <p><button onClick={() => detailHandle(item.id)}><AiFillFileText style={{ fontSize: '24px' }} /></button></p>
                </div>
            ))}
            <CwbEqLogBox setOpenBox={setOpenBox} openBox={openBox} eqIdDB={eqIdDB} />
        </div>
    )
}

export default CwbEqLogList