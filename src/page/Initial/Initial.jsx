import React, { useState } from 'react'
import './Initial.scss'
import InitialOne from './InitialOne/InitialOne'
import InitialTwo from './InitialTwo/InitialTwo'

const Initial = () => {

  const [start, setStart] = useState(false)
  const [currentCount, setCurrentCount] = useState(1)

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
            <InitialOne currentCount={currentCount} />
            {/* 設定頁面 2 */}
            <InitialTwo currentCount={currentCount} style={{ display: `${currentCount === 2 ? 'block' : 'none'}` }} />
            {/* button wrapper 下一步 || 上一步 || 完成 */}
            <footer className='initial-btn-wrapper'>
              {currentCount === 1 ? '' : <button className='initial-prev-btn' onClick={(e) => {
                e.preventDefault()
                setCurrentCount(1)
              }}>上一步</button>}
              {currentCount === 2 ? '' : <button className='initial-next-btn' onClick={(e) => {
                e.preventDefault()
                setCurrentCount(2)
              }}>下一步</button>}
              {currentCount === 2 ? <button className='initial-finishes-btn'>完成</button> : ''}
            </footer>
          </form>
        </section>
      </div>
    </div >
  )
}

export default Initial