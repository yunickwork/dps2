import React from 'react'

const LoginLogList = ({ rangePageLogDB, page, rowsPerPage, logDBLength }) => {
    return (
        <div className='login-log-list-container'>
            {logDBLength !== 0 && <div className="login-log-list-title">
                <h3>序號</h3>
                <h3>帳號</h3>
                <h3>姓名</h3>
                <h3>連線紀錄</h3>
                <h3>時間</h3>
            </div>}
            {logDBLength === 0 && <div style={{ textAlign: 'center', padding: '10px' }}><h2>平台登入無資料</h2></div>}
            {rangePageLogDB.map((item, index) => (
                <div className="login-log-list" key={index}>
                    <p>{page * rowsPerPage >= rowsPerPage ? page * rowsPerPage + index + 1 : index + 1}</p>
                    <p>{item.user}</p>
                    <p>{item.name}</p>
                    <p>{item.connect}</p>
                    <p>{item.time}</p>
                </div>
            ))}
        </div>
    )
}

export default LoginLogList