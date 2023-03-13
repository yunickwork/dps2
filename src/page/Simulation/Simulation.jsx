import React, { useState, useEffect } from 'react'
import './Simulation.scss'
import SimulationReserve from './SimulationReserve/SimulationReserve'
import Audio from '../../components/Audio/Audio'

const Simulation = () => {
    // User
    const myName = localStorage.getItem('myName')
    //選擇地震震級
    const [eqLevel, setEQLevel] = useState('3')
    //選擇 預約模式 && 即時模式
    const [type, setType] = useState(false)
    const [db, setDB] = useState()
    // 現在日期 & 時間
    const nowYear = new Date().getFullYear()
    const nowMount = new Date().getMonth() + 1
    const nowDate = new Date().getDate()

    const nowFullYearDayDate = `${nowYear}-${nowMount < 10 ? '0' : ''}${nowMount}-${nowDate < 10 ? '0' : ''}${nowDate}`
    const [submitFinish, setSubmitFinish] = useState()
    const [submitDate, setSubmitDate] = useState(nowFullYearDayDate)
    const [submitTime, setSubmitTime] = useState('')

    useEffect(() => {
        //預約資料
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        };
        fetch(`http://10.100.105.103:4000/get/simulation/delay`, requestOptions)
            .then(response => response.json())
            .then(data => setDB(data));
    }, [])

    const submitHandle = (e) => {
        e.preventDefault()
        if (type === true && submitTime === '') return alert('時間單位不得為空')
        if (submitFinish === undefined) return alert('持續時間不得為空')

        //確定要送出嗎?
        if (window.confirm('確定要發佈嗎?')) {
        } else {
            return
        }

        //判斷預約時間是否有重複
        let dateCheck = db.filter(item => item.settime === `${submitDate} ${submitTime}:00`)
        if (type === 'Delay' && dateCheck.length !== 0) return alert('預約時間不得重複')

        //不能預約現在時間 + 3分鐘時間
        const nowTime = new Date().getTime()
        const timePlus_ts = new Date(nowTime + 3 * 1000 * 60).getTime()
        const submitTime_ts = new Date(`${submitDate} ${submitTime}:00`).getTime()
        if (type === 'Delay' && timePlus_ts > submitTime_ts) return alert('不能小於現在時間 + 5分鐘')

        //確認無誤後發送 API
        const postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: `${myName}`,
                mag: eqLevel,
                type: type === false ? "Now" : "Delay",
                time: type === false ? "即時" : `${submitDate} ${submitTime}:00`,
                finish: submitFinish
            })
        }

        fetch(`http://10.100.105.103:4000/settings/Simulation`, postData)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

    return (
        <div className='simulation-container'>
            <Audio />
            <h1>模擬發報設定</h1>
            <form className='simulation-form' onSubmit={submitHandle}>
                <div className='simulation-form-wrapper'>
                    <div className='simulation-form-setting-wrapper'>
                        <div className='simulation-eq-level-btns-wrapper'>
                            <h3>設定級數</h3>
                            <button type='button' style={{ backgroundColor: `${eqLevel === '3' ? 'rgb(255, 208, 0)' : ''}` }} onClick={() => setEQLevel('3')}>3</button>
                            <button type='button' style={{ backgroundColor: `${eqLevel === '4' ? 'rgb(255, 208, 0)' : ''}` }} onClick={() => setEQLevel('4')}>4</button>
                            <button type='button' style={{ backgroundColor: `${eqLevel === '5-' ? 'rgb(255, 208, 0)' : ''}` }} onClick={() => setEQLevel('5-')}>5弱</button>
                            <button type='button' style={{ backgroundColor: `${eqLevel === '5+' ? 'rgb(255, 208, 0)' : ''}` }} onClick={() => setEQLevel('5+')}>5強</button>
                            <button type='button' style={{ backgroundColor: `${eqLevel === '6-' ? 'rgb(255, 208, 0)' : ''}` }} onClick={() => setEQLevel('6-')}>6弱</button>
                            <button type='button' style={{ backgroundColor: `${eqLevel === '6+' ? 'rgb(255, 208, 0)' : ''}` }} onClick={() => setEQLevel('6+')}>6強</button>
                            <button type='button' style={{ backgroundColor: `${eqLevel === '7' ? 'rgb(255, 208, 0)' : ''}` }} onClick={() => setEQLevel('7')}>7</button>
                        </div>
                        <div className='simulation-type-wrapper'>
                            <h3>設定模式</h3>
                            <select className='simulation-type' onChange={(e) => e.target.value === 'Delay' ? setType(true) : setType(false)}>
                                <option value="NOW">即時</option>
                                <option value="Delay">預約</option>
                            </select>
                        </div>
                        <div className='simulation-set-time-wrapper'>
                            <h3>持續時間</h3>
                            <input placeholder='5 ~ 120' className='simulation-set-time-input' type="number" min={5} max={120} onChange={(e) => setSubmitFinish(e.target.value)} />
                            <h3>秒</h3>
                        </div>
                        {type === true && <div className='simulation-set-date-wrapper'>
                            <h3>預約日期</h3>
                            <input type="date" min={nowFullYearDayDate} value={submitDate} onChange={(e) => setSubmitDate(e.target.value)} />
                            <h3>預約時間</h3>
                            <input type="time" onChange={(e) => setSubmitTime(e.target.value)} />
                        </div>
                        }
                    </div>
                </div>
                <div className='simulation-submit-btn-wrapper'>
                    <button type='submit'>立即發布</button>
                </div>
            </form >

            <SimulationReserve nowFullYearDayDate={nowFullYearDayDate} />
        </div >
    )
}

export default Simulation