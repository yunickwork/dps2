import React, { useEffect, useState } from 'react'
import { AiOutlineReload } from "react-icons/ai";
import TextField from '@mui/material/TextField';

const InitialOne = ({ currentCount }) => {
    // 單位 || 學校
    const [name, setName] = useState('')
    const [nameCheck, setNameCheck] = useState(false)

    // 合約到期日
    const [contractExpirationDate, setContractExpirationDate] = useState('')
    const [date, setDate] = useState('')
    const [dateCheck, setDateCheck] = useState(false)
    const [time, setTime] = useState('')
    const [timeCheck, setTimeCheck] = useState(false)

    // 電腦 mac
    const [mac, setMac] = useState('')

    // mqtt 帳號 || 密碼
    const [mqttAccount, setMqttAccount] = useState('')
    const [mqttAccountCheck, setMqttAccountCheck] = useState(false)

    const [mqttPwd, setMqttPwd] = useState('')
    const [mqttPwdCheck, setMqttPwdCheck] = useState(false)


    // Cwb 帳號 || 密碼
    const [cwbAccount, setCwbAccount] = useState('')
    const [cwbPwd, setCwbPwd] = useState('')

    useEffect(() => {
        fetch(`http://10.100.105.103:4000/initial/get/mac`, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                setMac(data[0].ID)
            })
            .catch(e => {
                console.log(e);
            })
    }, [])

    const getMacHandler = () => {
        fetch(`http://10.100.105.103:4000/initial/get/mac`, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                setMac(data[0].ID)
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <div style={{ display: `${currentCount === 1 ? 'block' : 'none'}` }} className='initial-section-one'>
            <article>
                <p>簽約學校 or 單位</p>
                <div className='initial-section-one-setting-wrapper'>
                    <div>
                        <p>名稱</p>
                        <TextField
                            error={nameCheck === true ? true : false}
                            type="text"
                            variant="outlined"
                            // value={}
                            onChange={(e) => console.log(e)}
                            helperText={nameCheck === true ? '名稱不得為空' : ''}
                        />
                    </div>
                </div>
            </article>
            <article>
                <p>合約到期日</p>
                <div className='initial-section-one-setting-wrapper'>
                    <div>
                        <p>日期</p>
                        <TextField
                            error={dateCheck === true ? true : false}
                            type="date"
                            variant="outlined"
                            onChange={(e) => setDate(e.target.value)}
                            helperText={dateCheck === true ? '日期不得為空' : ''}
                        />
                    </div>
                    <div>
                        <p>時間</p>
                        <TextField
                            error={timeCheck === true ? true : false}
                            type="time"
                            variant="outlined"
                            onChange={(e) => setTime(e.target.value)}
                            helperText={timeCheck === true ? '時間不得為空' : ''}
                        />
                    </div>
                </div>
            </article>
            <article>
                <p>複合式平台 Mqtt 帳號</p>
                <div className='initial-section-one-setting-wrapper'>
                    <div>
                        <p>ID</p>
                        <TextField
                            error={mac === '' ? true : false}
                            type="text"
                            variant="outlined"
                            value={mac}
                            onChange={(e) => console.log(e)}
                            helperText={mac === '' ? 'mac不得為空' : ''}
                        />
                    </div>
                    <div>
                        <button onClick={getMacHandler} className='initial-section-one-reload-btn'><AiOutlineReload /></button>
                        <h5>沒有顯示ID的話, 請案Reload鍵</h5>
                    </div>
                    <div>
                        <p>帳號</p>
                        <TextField
                            error={mqttAccountCheck === '' ? true : false}
                            type="text"
                            variant="outlined"
                            onChange={(e) => console.log(e.target.value.trim())}
                            helperText={mqttAccountCheck === '' ? '帳號' : ''}
                        />
                    </div>
                    <div>
                        <p>密碼</p>
                        <TextField
                            error={mqttPwdCheck === '' ? true : false}
                            type="text"
                            variant="outlined"
                            onChange={(e) => console.log(e.target.value.trim())}
                            helperText={mqttPwdCheck === '' ? '帳號' : ''}
                        />
                    </div>
                </div>
            </article>
            <article>
                <p>CWB MQTT 帳號 (可略過)</p>
                <div className='initial-section-one-setting-wrapper'>
                    <div>
                        <p>帳號</p>
                        <TextField
                            type="text"
                            variant="outlined"
                            onChange={(e) => console.log(e.target.value.trim())}
                        />
                    </div>
                    <div>
                        <p>密碼</p>
                        <TextField
                            type="text"
                            variant="outlined"
                            onChange={(e) => console.log(e.target.value.trim())}
                        />
                    </div>
                </div>
            </article>
        </div>
    )
}

export default InitialOne