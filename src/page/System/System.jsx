import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import './System.scss'
import Restore from './Restore/Restore.jsx';
//domain
import { useDomain } from '../../components/DomainContext/DomainContext';
const System = ({ appGrayColorMin, appLoginCount, appLockMin }) => {
    // Domain
    const { domain } = useDomain();
    // 地震便灰色時間設定
    const [grayColorMin, setGrayColorMin] = useState(Number(appGrayColorMin))
    const [grayColorMinCheck, setGrayColorMinCheck] = useState(false)

    // 設定登入次數
    const [loginCount, setLoginCount] = useState(Number(appLoginCount))
    const [loginCountCheck, setLoginCountCheck] = useState(false)

    // 設定登入分鐘
    const [loginLockMin, setLoginLockMin] = useState(Number(appLockMin))
    const [loginLockMinCheck, setLoginLockMinCheck] = useState(false)

    // 機器還原彈窗
    const [restorePage, setRestorePage] = useState(false)

    const myAuthority = localStorage.getItem('myAuthority');

    const submitHandle1 = (e) => {
        e.preventDefault()
        let check = false

        grayColorMin < 1 || grayColorMin === '' ? setGrayColorMinCheck(true) : setGrayColorMinCheck(false)
        loginCount < 1 || loginCount === '' ? setLoginCountCheck(true) : setLoginCountCheck(false)
        loginLockMin < 1 || loginLockMin === '' ? setLoginLockMinCheck(true) : setLoginLockMinCheck(false)

        if (grayColorMin < 1 || grayColorMin === '') return
        if (loginCount < 1 || loginCount === '') return
        if (loginLockMin < 1 || loginLockMin === '') return

        check = true

        const UpdateSystemSetting = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ grayColorMin: grayColorMin, loginCount: loginCount, lockMin: loginLockMin })
        }
        fetch(`http://${domain}:4000/system/setting/update`, UpdateSystemSetting)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

        if (check === true) setTimeout((() => window.location.href = '/System'), 500);
    }
    return (
        <div className='system-container'>
            <h1 className='system-title'>系統設定</h1>
            {myAuthority === 'system-staff' && <div className='system-restore-defaults-wrapper'>
                <button onClick={() => setRestorePage(true)} className='system-restore-defaults-btn'>機器還原預設</button>
                <Restore setRestorePage={setRestorePage} restorePage={restorePage} />
            </div>}
            <div className='system-wrapper'>
                <form id="form1" onSubmit={(e) => submitHandle1(e)} className='system-form'>
                    <h3>主頁設定</h3>
                    <div className='system-home-wrapper'>
                        <div>
                            <label>震度顏色轉換灰色 ( 預設為60分鐘 )</label>
                            <TextField
                                error={grayColorMinCheck === true ? true : false}
                                defaultValue={`${appGrayColorMin}`}
                                type="number"
                                onChange={(e) => setGrayColorMin(Number(e.target.value))}
                                helperText={grayColorMinCheck === true && '不得為空或小於1'}
                            />
                            <h3>分鐘</h3>
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
                        <button type="submit" className='system-form-btn'>更新</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default System