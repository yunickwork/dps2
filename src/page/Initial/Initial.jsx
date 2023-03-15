import React, { useState } from 'react'
import './Initial.scss'
import InitialOne from './InitialOne/InitialOne'
import InitialTwo from './InitialTwo/InitialTwo'

const Initial = () => {

  // ***** 表單一 *****//

  // 單位 || 學校
  const [name, setName] = useState('')
  const [nameCheck, setNameCheck] = useState(false)

  // 合約到期日
  const [contractExpirationDate, setContractExpirationDate] = useState('')
  const [date, setDate] = useState('')
  const [dateCheck, setDateCheck] = useState(false)
  const [time, setTime] = useState('')
  const [timeCheck, setTimeCheck] = useState(false)
  const [start, setStart] = useState(false)
  const [currentCount, setCurrentCount] = useState(1)

  // 電腦 mac
  const [mac, setMac] = useState('')

  // mqtt 帳號 || 密碼
  const [mqttAccount, setMqttAccount] = useState('')
  const [mqttAccountCheck, setMqttAccountCheck] = useState(false)

  const [mqttPwd, setMqttPwd] = useState('')
  const [mqttPwdCheck, setMqttPwdCheck] = useState(false)

  // ***** 表單二 *****//



  // 下一頁
  const nextHandle = (e) => {
    e.preventDefault()
    let isValid = true
    if (name === '') {
      setNameCheck(true)
      isValid = false
    }
    if (date === '') {
      setDateCheck(true)
      isValid = false
    }
    if (time === '') {
      setTimeCheck(true)
      isValid = false
    }
    if (mac === '') {
      setMac(true)
      isValid = false
    }
    if (mqttAccount === '') {
      setMqttAccountCheck(true)
      isValid = false
    }
    if (mqttPwd === '') {
      setMqttPwdCheck(true)
      isValid = false
    }
    if (isValid) {
      setCurrentCount(2)
    }
    setCurrentCount(isValid === false ? 1 : 2)
  }

  // 傳送選單
  const submitHandle = (e) => {
    e.preventDefault()
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
            />
            {/* 設定頁面 2 */}
            <InitialTwo currentCount={currentCount} style={{ display: `${currentCount === 2 ? 'block' : 'none'}` }} />
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