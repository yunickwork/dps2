import React from 'react'
import './SimulationLog.scss'

const SimulationLogList = ({ rangePageLogDB, page, rowsPerPage, logDBLength }) => {
    return (
        <div className='simulation-log-list-container'>
            {logDBLength !== 0 && <div className="simulation-log-list-title">
                <h3>序號</h3>
                <h3>使用者</h3>
                <h3>類型</h3>
                <h3>模擬發送時間</h3>
                <h3>警報觸發時間</h3>
                <h3>地震規模</h3>
                <h3>發佈狀態</h3>
                <h3>Finish(秒)</h3>
            </div>}
            {logDBLength === 0 && <div style={{ textAlign: 'center', padding: '10px' }}><h2>模擬發報紀錄無資料</h2></div>}
            {rangePageLogDB.map((item, index) => (
                <div className="simulation-log-list" key={item.ID}>
                    <p>{page * rowsPerPage >= rowsPerPage ? page * rowsPerPage + index + 1 : index + 1}</p>
                    <p>{item.user}</p>
                    <p>{item.type}</p>
                    <p>{item.time}</p>
                    <p>{item.settime}</p>
                    <p>{item.mag}</p>
                    <p>{item.state}</p>
                    <p>{item.finish}</p>
                </div>
            ))}
        </div>
    )
}

export default SimulationLogList