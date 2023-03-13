import React, { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import './UserSignUp.scss';

const UserSignUp = () => {
    //權限
    const myAuthority = localStorage.getItem('myAuthority')
    //帳號
    const [user, setUser] = useState('')
    const [userCheck, setUserCheck] = useState(false)
    //密碼
    const [pwd, setPwd] = useState('')
    const [pwdCheck, setPwdCheck] = useState(false)
    //再次檢查密碼
    const [pwd2, setPwd2] = useState('')
    const [pwd2Check, setPwd2Check] = useState(false)
    //Next Login Need Change Password
    const [needChangePwd, setNeedChangePwd] = useState(false)
    //權限
    const [authority, setAuthority] = useState('client')
    //姓名
    const [name, setName] = useState('')
    const [nameCheck, setNameCheck] = useState(false)
    //電話
    const [phone, setPhone] = useState('')
    const [phoneCheck, setPhoneCheck] = useState(false)
    //信箱
    const [email, setEmail] = useState('')
    const [emailCheck, setEmailCheck] = useState(false)
    //公司 || 學校
    const [location, setLocation] = useState('')
    const [locationCheck, setLocationCheck] = useState(false)
    //確認帳號是否已存在
    const [already, setAlready] = useState([{ user: '' }])
    const [alreadyCheck, setAlreadyCheck] = useState(false)

    // 抓取所有的帳戶
    useEffect(() => {
        const getUserData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        }

        fetch(`http://10.100.105.103:4000/userDB`, getUserData)
            .then(response => response.json())
            .then(data => setAlready([...data]))
            .catch(err => console.log(err))
    }, [])

    //表單傳送動作
    const submitHandle = (e) => {
        e.preventDefault()
        //清空上次的值
        setPwd2Check(false)
        setNameCheck(false)
        setPhoneCheck(false)
        setEmailCheck(false)
        setLocationCheck(false)
        setAlreadyCheck(false)
        // 使用者密碼沒有 >= 5 提出 warning
        user.length < 5 ? setUserCheck(true) : setUserCheck(false)
        const hasUppercase = /[A-Z]/.test(pwd);
        const hasNumber = /\d/.test(pwd);
        const isEightChars = pwd.length >= 5;
        if (hasNumber && hasUppercase && isEightChars === true) {
            setPwdCheck(false)
        } else {
            setPwdCheck(true)
        }
        pwd2.length < 0 || pwd2 !== pwd ? setPwd2Check(true) : setPwd2Check(false)
        name.length <= 0 ? setNameCheck(true) : setNameCheck(false)
        phone.length <= 0 ? setPhoneCheck(true) : setPhoneCheck(false)
        email.length <= 0 ? setEmailCheck(true) : setEmailCheck(false)
        location.length <= 0 ? setLocationCheck(true) : setLocationCheck(false)

        let alreadyFilter = already.filter(item => item.user === user)
        alreadyFilter.length > 0 ? setAlreadyCheck(true) : setAlreadyCheck(false)

        if (user.length < 5) return
        if (hasNumber && hasUppercase && isEightChars === false) return
        if (pwd2 !== pwd) return
        if (name.length <= 0) return
        if (phone.length <= 0) return
        if (email.length <= 0) return
        if (location.length <= 0) return
        if (alreadyFilter.length > 0) return

        if (window.confirm('確定要送出嗎?')) {
            alert('已送出')
        } else {
            return
        }

        // 確認是否帳戶已存在
        const getUserData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        }

        fetch(`http://10.100.105.103:4000/userDB`, getUserData)
            .then(response => response.json())
            .then(data => setAlready([...data]))
            .catch(err => console.log(err))

        // 註冊帳號
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: `${user.toLowerCase()}`, pwd: `${pwd}`, authority: `${authority}`, name: `${name}`, phone: `${phone}`, email: `${email}`, location: `${location}`, needChangePwd: `${needChangePwd}` })
        };

        fetch(`http://10.100.105.103:4000/user/signUp`, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

        setTimeout((() => window.location.href = '/UserManagement'), 500);
    }

    const userHandle = (e) => {
        let onlyEnglishAndNumber = e.replace(/[^\w_]/g, '')
        setUser(onlyEnglishAndNumber)
    }

    return (
        <div className='user-sign-up-container'>
            <form className='user-sign-up-form' onSubmit={submitHandle}>
                <div>
                    <h2>使用者註冊</h2>
                    <div>
                        <label >帳號</label>
                        <input type="text" style={{ textTransform: 'lowercase' }} placeholder='請輸入帳號 (必須是5個字元以上、英文、數字、可有下底線)' value={user} onChange={(e) => userHandle(e.target.value.toLowerCase())} />
                    </div>
                    {userCheck && <p>請檢查輸入的是否為超過5字元、英文、數字、下底線</p>}
                    {alreadyCheck && <p>此帳號已經存在</p>}
                    <div>
                        <label>密碼</label>
                        <input type="password" placeholder='請輸入密碼 (必須要有大小寫、超過8字元)' value={pwd} onChange={(e) => setPwd(e.target.value)} />
                    </div>
                    {pwdCheck && <p>請檢查輸入的是否為超過8字元、含有大小寫</p>}
                    <div>
                        <label>檢查密碼</label>
                        <input type="password" placeholder='再次輸入密碼' value={pwd2} onChange={(e) => setPwd2(e.target.value)} />
                    </div>
                    {pwd2Check && <p>密碼不符</p>}
                    <article className='user-sign-up-need-change-password-wrap'>
                        <label>下次登入需更換密碼</label>
                        <Checkbox
                            type="checkbox"
                            onClick={(e) => setNeedChangePwd(!needChangePwd)}
                        />
                    </article>
                    <div>
                        <label>權限</label>
                        <select onChange={(e) => setAuthority(e.target.value)}>
                            <option className='user-sign-up-option' value="client">一般使用者</option>
                            <option className='user-sign-up-option' value="client-system-staff">管理使用者</option>
                            {myAuthority === 'system-staff' && <option className='user-sign-up-option' value="system-staff">系統管理員</option>}
                        </select>
                    </div>
                </div>
                <div>
                    <div>
                        <label>姓名</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    {nameCheck && <p>姓名不得為空</p>}
                    <div>
                        <label>電話</label>
                        <input className='user-sign-up-phone-input' type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    {phoneCheck && <p>電話不得為空，且只能是數字</p>}
                    <div>
                        <label>信箱</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    {emailCheck && <p>信箱不得為空</p>}
                    <div>
                        <label>公司/學校</label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    {locationCheck && <p>這行不得為空</p>}
                </div>
                <div className='user-sign-up-btn-wrap'>
                    <button>傳送表單</button>
                </div>
            </form>
        </div>
    )
}

export default UserSignUp