import React, { useState } from 'react'
import { DOArrayDB } from '../../../db/DOArray.js'
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';

const AdamForm = () => {
    const [settingDB, setSettingDB] = useState([...DOArrayDB])
    const submitHandle = (e) => {
        e.preventDefault()
        fetch(`http://10.100.105.103:4000/settings/eqcheck`, { method: "GET" })
            .then(res => res.json())
            .then(eqCheck => {
                if (eqCheck === 'nok') {
                    setSettingDB([])
                    alert('現在正在發生地震請稍後在傳送')
                    return Promise.reject('地震發生中，取消傳送資料')
                }
                if (eqCheck === 'ok') {
                    if (window.confirm('確定要送出嗎?')) {
                        const postData = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(DOArrayDB)
                        }
                        return fetch(`http://10.100.105.103:4000/settings/Adam_settings`, postData)
                            .then(response => response.json())
                            // .then(data => console.log(data))
                    } else {
                        return Promise.reject('使用者取消傳送資料')
                    }
                }
            })
            .then(() => {
                setTimeout(() => window.location.href = '/Adam', 500)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const changeType = (item, value) => {
        item.type = value
        if (item.type === 'Pulse') {
            item.ms = '1000'
        } else if (item.type === 'Finish') {
            item.ms = '0'
        }
        setSettingDB([...DOArrayDB])
    }

    const changeLevel = (level, value) => {
        level.eq_level = value
        setSettingDB([...DOArrayDB])
    }

    const changeMs = (ms, value) => {
        ms.ms = value
        setSettingDB([...DOArrayDB])
    }

    return (
        <form className='adam-form' onSubmit={submitHandle} >
            <section className='adam-form-wrapper'>
                <div className='adam-type'>
                    <h3 style={{ marginLeft: '50px' }}>開關</h3>
                    {DOArrayDB.map((item, index) => (
                        <div className='do-wrapper' key={index}>
                            <InputLabel>{item.id}</InputLabel>
                            <NativeSelect
                                onClick={(e) => changeType(item, e.target.value)}
                                defaultValue="Finish"
                            >
                                <option value="Finish">ON</option>
                                <option value="Pulse">Pulse</option>
                            </NativeSelect>
                        </div>
                    ))}
                </div>
                <div className='adam-eq-level'>
                    <h3>觸發地震級數</h3>
                    {DOArrayDB.map((level, index) => (
                        <div className='do-wrapper-2' key={index}>
                            <NativeSelect
                                onClick={(e) => changeLevel(level, e.target.value)}
                                defaultValue="3"
                            >
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5-">5弱</option>
                                <option value="5+">5強</option>
                                <option value="6-">6弱</option>
                                <option value="6+">6強</option>
                                <option value="7">7</option>
                            </NativeSelect>
                        </div>
                    ))}
                </div>

                <div className='adam-time-ms'>
                    <h3>觸發秒數</h3>
                    {settingDB.map((ms, index) => (
                        <div className='do-wrapper-2' key={index}>
                            <InputLabel></InputLabel>
                            <NativeSelect
                                disabled={ms.type === 'Pulse' ? false : true}
                                onClick={(e) => changeMs(ms, e.target.value)}
                            >
                                <option value={ms.type === 'Pulse' ? '1000' : ''}>1秒</option>
                                <option value={ms.type === 'Pulse' ? '2000' : ''}>2秒</option>
                                <option value={ms.type === 'Pulse' ? '3000' : ''}>3秒</option>
                                <option value={ms.type === 'Pulse' ? '4000' : ''}>4秒</option>
                                <option value={ms.type === 'Pulse' ? '5000' : ''}>5秒</option>
                            </NativeSelect>
                        </div>
                    ))}
                </div>
            </section>

            <div className='adam-btn-submit-wrapper'>
                <button className='adam-btn-submit' type='submit'>
                    送出表單
                </button>
            </div>
        </form >
    )
}

export default AdamForm