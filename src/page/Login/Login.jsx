import React, { useState } from 'react'
import './Login.scss'
import Loading from '../../components/Loading/Loading.jsx'
//domain
import { useDomain } from '../../components/DomainContext/DomainContext';
const Login = ({ appLoginCount, appLockMin }) => {
  // Domain
  const { domain } = useDomain();
  //抓取帳號
  const [user, setUser] = useState(null)
  const [pwd, setPwd] = useState(null)
  const [loading, setLoading] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0)

  const submitHandle = (e) => {
    e.preventDefault()

    let currentCount = parseInt(sessionStorage.getItem('myCount')) || 0;

    const pushLoginSubmit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: `${user} `, pwd: `${pwd} ` })
    }

    const lockTime_ts = new Date().getTime() + 1 * 1000 * 60 * appLockMin;

    if (localStorage.getItem('myLock') && lockTime_ts <= new Date().getTime()) {
      localStorage.removeItem('myLock');
    }

    if (localStorage.getItem('myLock') && localStorage.getItem('myLock') >= new Date().getTime()) {
      return alert(`登入系統上鎖至 ${new Date().toLocaleDateString()} ${new Date(Number(localStorage.getItem('myLock'))).toLocaleTimeString()}, 請稍後登入`)
    }

    fetch(`http://${domain}:4000/user/login`, pushLoginSubmit)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          currentCount += 1;
          sessionStorage.setItem('myCount', currentCount);
          setCount(currentCount);
          alert(`檢察帳號密碼是否有誤 ${currentCount} 次`);

          if (appLoginCount <= currentCount) {
            localStorage.setItem('myLock', lockTime_ts);
          }

          return;
        }

        // 登入等待
        setLoading(null)

        if (data[0].token !== null) {
          localStorage.setItem('myToken', data[0].token);
          localStorage.setItem('myName', data[0].name);
          localStorage.setItem('myId', data[0].id);
          localStorage.setItem('myUser', data[0].user);
          localStorage.setItem('myExp', new Date().getTime() + 1 * 1000 * 60 * 60 * 7);
          localStorage.setItem('myAuthority', data[0].authority);
          localStorage.removeItem('myCount');

          if (data[0].needChangePwd === 'true') {
            // 驗證使用者 ID 的格式，確保其為合法的數字或字母
            const userId = data[0].id;
            const idRegex = /^[a-zA-Z0-9]+$/;
            if (!idRegex.test(userId)) {
              // 使用者 ID 不合法，顯示錯誤訊息或導向錯誤頁面
              console.error('Invalid user ID');
              return;
            }

            // 將使用者導向 UserPage 頁面
            window.location.href = `/UserPage/${userId}`;
          } else {
            // 將使用者導向首頁
            window.location.href = '/';
          }
        } else if (data[0].token === null) {
          localStorage.clear();
          setTimeout(() => {
            window.location.href = '/';
          }, 5000); // 5秒後跳轉
        }
      })
      .catch(err => alert(err + ' 連線異常請檢察網路問題 or 資料庫 or Api'))
  }

  return (
    <div className="login-container">
      <div className='login-wrapper'>
        <h1 className='login-title'>地震速報系統</h1>
        <form className='login-form-wrapper' onSubmit={submitHandle}>
          <div className='login-input-wrapper'>
            <label>使用者</label>
            <input type="text" onChange={(e) => setUser(e.target.value)} />
          </div>
          <div className='login-input-wrapper'>
            <label>密碼</label>
            <input type="password" onChange={(e) => setPwd(e.target.value)} />
          </div>
          <div className='login-submit-wrapper'>
            {loading !== null && <button className='login-submit-btn' type="submit"> 登入 </button>}
            {loading === null && <Loading height={20} />}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login