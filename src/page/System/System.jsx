import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import './System.scss'

const System = ({ appGrayColorMin, appMqttMin, appLoginCount, appLockMin }) => {
    // 地震便灰色時間設定
    const [grayColorMin, setGrayColorMin] = useState(Number(appGrayColorMin))
    const [grayColorMinCheck, setGrayColorMinCheck] = useState(false)

    // 複合式連線間格設定
    const [mqttMin, setMqttMin] = useState(Number(appMqttMin))
    const [mqttMinCheck, setMqttMinCheck] = useState(false)

    // 設定登入次數
    const [loginCount, setLoginCount] = useState(Number(appLoginCount))
    const [loginCountCheck, setLoginCountCheck] = useState(false)

    // 設定登入分鐘
    const [loginLockMin, setLoginLockMin] = useState(Number(appLockMin))
    const [loginLockMinCheck, setLoginLockMinCheck] = useState(false)

    const submitHandle = (e) => {
        e.preventDefault()
        let check = false

        grayColorMin < 1 || grayColorMin === '' ? setGrayColorMinCheck(true) : setGrayColorMinCheck(false)
        mqttMin < 1 || mqttMin === '' ? setMqttMinCheck(true) : setMqttMinCheck(false)
        loginCount < 1 || loginCount === '' ? setLoginCountCheck(true) : setLoginCountCheck(false)
        loginLockMin < 1 || loginLockMin === '' ? setLoginLockMinCheck(true) : setLoginLockMinCheck(false)

        if (grayColorMin < 1 || grayColorMin === '') return
        if (mqttMin < 1 || mqttMin === '') return
        if (loginCount < 1 || loginCount === '') return
        if (loginLockMin < 1 || loginLockMin === '') return

        check = true

        const UpdateSystemSetting = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ grayColorMin: grayColorMin, mqttMin: mqttMin, loginCount: loginCount, lockMin: loginLockMin })
        }
        fetch(`http://10.100.105.103:4000/system/setting/update`, UpdateSystemSetting)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

        if (check === true) setTimeout((() => window.location.href = '/'), 500);

    }
    return (
        <div className='system-container'>
            <h1 className='system-title'>系統設定</h1>
            <div className='system-wrapper'>
                <form className='system-form' onSubmit={(e) => submitHandle(e)}>
                    <h3>主頁設定</h3>
                    <div className='system-home-wrapper'>
                        <div>
                            <label>震度顏色轉換灰色</label>
                            <TextField
                                error={grayColorMinCheck === true ? true : false}
                                defaultValue={`${appGrayColorMin}`}
                                type="number"
                                onChange={(e) => setGrayColorMin(Number(e.target.value))}
                                helperText={grayColorMinCheck === true && '不得為空或小於1'}
                            />
                            <h3>分鐘</h3>
                        </div>
                        <div>
                            <label>複合式平台連線狀況</label>
                            <TextField
                                error={mqttMinCheck === true ? true : false}
                                defaultValue={`${appMqttMin}`}
                                type="number"
                                onChange={(e) => setMqttMin(Number(e.target.value))}
                                helperText={mqttMinCheck === true && '不得為空或小於1'}
                            />
                            <h3>分鐘監聽一次</h3>
                        </div>
                    </div>
                    <h3>登入設定</h3>
                    <div className='system-user-wrapper'>
                        <div>
                            <label>安全登入次數(次)</label>
                            <TextField
                                error={loginCountCheck === true ? true : false}
                                defaultValue={`${appLoginCount}`}
                                type="number"
                                onChange={(e) => setLoginCount(Number(e.target.value))}
                                helperText={loginCountCheck === true && '不得為空或小於1'}
                            />
                            <h3>一次</h3>
                        </div>
                        <div>
                            <label>鎖定時間</label>
                            <TextField
                                error={loginLockMinCheck === true ? true : false}
                                defaultValue={`${appLockMin}`}
                                type="number"
                                onChange={(e) => setLoginLockMin(Number(e.target.value))}
                                helperText={loginLockMinCheck === true && '不得為空或小於1'}
                            />
                            <h3>分鐘</h3>
                        </div>
                    </div>
                    <div className='system-form-wrapper'>
                        <button className='system-form-btn'>取消</button>
                        <button className='system-form-btn'>確定</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default System