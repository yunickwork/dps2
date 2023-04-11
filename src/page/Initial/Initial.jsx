import React, { useState } from 'react'
import './Initial.scss'
import InitialOne from './InitialOne/InitialOne'
import InitialTwo from './InitialTwo/InitialTwo'
import { useDomain } from '../../components/DomainContext/DomainContext.jsx';

const Initial = () => {
  // Domain
  const { domain } = useDomain();

  // ***** 表單一 *****//

  // 單位 || 學校
  const [name, setName] = useState('')
  const [nameCheck, setNameCheck] = useState(false)

  // 合約到期日
  const [date, setDate] = useState('')
  const [dateCheck, setDateCheck] = useState(false)
  const [time, setTime] = useState('')
  const [timeCheck, setTimeCheck] = useState(false)
  const [start, setStart] = useState(false)
  const [currentCount, setCurrentCount] = useState(1)

  // 電腦 mac
  const [mac, setMac] = useState('')

  // mqtt 帳號 
  const [mqttAccount, setMqttAccount] = useState('')
  const [mqttAccountCheck, setMqttAccountCheck] = useState(false)

  // mqtt 密碼
  const [mqttPwd, setMqttPwd] = useState('')
  const [mqttPwdCheck, setMqttPwdCheck] = useState(false)

  // Cwb 帳號 || 密碼
  const [cwbAccount, setCwbAccount] = useState('')
  const [cwbPwd, setCwbPwd] = useState('')

  // ***** 表單二 *****//

  //我選擇的鄉鎮
  const [myTowns, setMyTowns] = useState([])

  // 下一頁
  const nextHandle = (e) => {
    e.preventDefault();
    let isValid = true;
    const inputFields = [name, date, time, mqttAccount, mqttPwd];
    const errorChecks = [
      setNameCheck,
      setDateCheck,
      setTimeCheck,
      setMqttAccountCheck,
      setMqttPwdCheck,
    ];

    inputFields.forEach((value, index) => {
      if (!value) {
        errorChecks[index](true);
        isValid = false;
      } else {
        errorChecks[index](false);
      }
    });

    if (isValid) {
      setCurrentCount(2);
    } else {
      setCurrentCount(1);
    }
  };


  // 傳送選單
  const submitHandle = (e) => {
    e.preventDefault()

    // 整理我選擇的警報地區
    const submitTowns = myTowns.map(item => ({ Areacode: item.id }))

    // 機器出廠時間
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const nowMonth = ('0' + (nowDate.getMonth() + 1)).slice(-2);
    const nowDay = ('0' + nowDate.getDate()).slice(-2);
    const nowHour = ('0' + nowDate.getHours()).slice(-2);
    const nowMinute = ('0' + nowDate.getMinutes()).slice(-2);
    const nowSecond = ('0' + nowDate.getSeconds()).slice(-2);
    const formattedDate = `${nowYear}-${nowMonth}-${nowDay} ${nowHour}:${nowMinute}:${nowSecond}`;

    const isConfirmed = window.confirm('您確定要送出嗎？');
    if (!isConfirmed) {
      return;
    }

    // 表單一 傳送我輸入的表單一資訊給後端
    const form_one_http = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        information: [
          {
            unitName: name,
            CED: `${date} ${time}:00`,
            machineID: `${mac}`,
            machineDate: `${formattedDate}`,
            initialSetup: true
          }
        ],
        mqtt: [
          {
            ID: mac,
            ACC: mqttAccount,
            PSW: mqttPwd
          }
        ],
        cwb: [
          {
            ACC: cwbAccount === '' ? null : cwbAccount,
            PSW: cwbPwd === '' ? null : cwbPwd
          }
        ]
      })
    };

    fetch(`http://${domain}:4000/initial/formOne`, form_one_http)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))

    // 表單二 傳送我選擇的警報地區給後端
    const alert_towns_http = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ area_code: JSON.stringify(submitTowns) })
    };

    fetch(`http://${domain}:4000/initial/Alarm_towns`, alert_towns_http)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))

    // 等待 500 毫秒送出
    setTimeout((() => window.location.href = '/'), 500);
  }

  return (
    <div className='initial-container'>
      <div className='initial-wrapper'>
        <header className='initial-header' style={{ transform: `translateY(${start === true ? -100 : 0}%)`, zIndex: `${start === true ? -1 : 999}` }}>
          <h1>您好~歡迎安裝地震預警平台</h1>
          <button className='initial-start-button' onClick={() => setStart(true)}>開始進行初始化設定</button>
        </header>
        {/* 設定畫面 */}
        <section className='initial-section-container' style={{ maxWidth: `${currentCount === 1 ? '600px' : '1280px'}` }}>
          <h2 className='initial-step-title'>步驟{currentCount === 1 ? '一' : '二'}</h2>
          <form onSubmit={(e) => submitHandle(e)} className='initial-form' action="">
            {/* 設定頁面 1 */}
            <InitialOne
              currentCount={currentCount}
              setName={setName}
              nameCheck={nameCheck}
              setDate={setDate}
              dateCheck={dateCheck}
              setTime={setTime}
              timeCheck={timeCheck}
              setMac={setMac}
              mac={mac}
              setMqttAccount={setMqttAccount}
              mqttAccountCheck={mqttAccountCheck}
              setMqttPwd={setMqttPwd}
              mqttPwdCheck={mqttPwdCheck}
              setCwbAccount={setCwbAccount}
              setCwbPwd={setCwbPwd}
            />
            {/* 設定頁面 2 */}
            <InitialTwo currentCount={currentCount} setMyTowns={setMyTowns} myTowns={myTowns} style={{ display: `${currentCount === 2 ? 'block' : 'none'}` }} />
            {/* button wrapper 下一步 || 上一步 || 完成 */}
            <footer className='initial-btn-wrapper'>
              {currentCount === 1 ? '' : <button className='initial-prev-btn' onClick={(e) => { e.preventDefault(); setCurrentCount(1) }}>上一步</button>}
              {currentCount === 2 ? '' : <button className='initial-next-btn' onClick={(e) => nextHandle(e)}>下一步</button>}
              {currentCount === 2 ? <button className='initial-finishes-btn'>完成</button> : ''}
            </footer>
          </form>
        </section>
      </div>
    </div >
  )
}

export default Initial