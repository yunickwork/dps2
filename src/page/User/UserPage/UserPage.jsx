import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './UserPage.scss'
import { Link } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import NotFound from '../../NotFound/NotFound';

const UserPage = () => {
    const myAuthority = localStorage.getItem('myAuthority')
    const myId = localStorage.getItem('myId')

    // 傳送表單
    let params = useParams()
    let userId = params.id

    // 個人資料
    const [userDB, setUserDB] = useState(null)

    //密碼
    const [pwd, setPwd] = useState('')
    const [pwdCheck, setPwdCheck] = useState(false)

    //確定是否要更換密碼
    const [needChangePwd, setNeedChangePwd] = useState(null)
    const [needChangePwdCheck, setNeedChangePwdCheck] = useState(false)

    //再次檢查密碼
    const [pwd2, setPwd2] = useState('')
    const [pwd2Check, setPwd2Check] = useState(false)

    //權限
    const [authority, setAuthority] = useState(`${myAuthority}`)
    const [checkauthority , setCheckAuthority] = useState('')

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

    useEffect(() => {
        const getUserInformation = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: userId })
        }

        fetch(`http://10.100.105.103:4000/user/information`, getUserInformation)
            .then(response => response.json())
            .then(data => {
                setUserDB([...data])
                setName(data[0].name)
                setEmail(data[0].email)
                setPhone(data[0].phone)
                setLocation(data[0].location)
                setCheckAuthority(data[0].authority)
                setNeedChangePwd(data[0].needChangePwd)
            })
            .catch(err => console.log(err))

    }, [userId])

    //權限判斷
    if(myAuthority === 'client' && myId !== userId) return <NotFound/>
    if(checkauthority === 'system-staff' && myAuthority === 'client-system-staff') return <NotFound/>
    if (userDB === null) return

    const submitHandle = (e) => {
        e.preventDefault()
        let check = false
        const hasUppercase = /[A-Z]/.test(pwd);
        const hasNumber = /\d/.test(pwd);
        const isEightChars = pwd.length >= 8;
        const isEightChars2 = pwd.length <= 0;

        needChangePwd === 'true' && pwd.length === 0 ? setNeedChangePwdCheck(true) : setNeedChangePwdCheck(false)

        if (hasNumber && hasUppercase && isEightChars === true) {
            setPwdCheck(false)
        } else if (isEightChars2 === true) {
            setPwdCheck(false)
        } else {
            setPwdCheck(true)
        }

        pwd2.length < 0 || pwd2 !== pwd ? setPwd2Check(true) : setPwd2Check(false)
        name.length <= 0 ? setNameCheck(true) : setNameCheck(false)
        phone.length <= 0 ? setPhoneCheck(true) : setPhoneCheck(false)
        email.length <= 0 ? setEmailCheck(true) : setEmailCheck(false)
        location.length <= 0 ? setLocationCheck(true) : setLocationCheck(false)

        if (hasNumber && hasUppercase && isEightChars === false) return
        if (needChangePwd === 'true' && pwd.length === 0) return
        if (pwd2.length > 0) {
            if (pwd2.length <= 8) {
                return
            }
        }
        if (pwd2 !== pwd) return
        if (name.length <= 0) return
        if (phone.length <= 0) return
        if (email.length <= 0) return
        if (location.length <= 0) return
        check = true

        const UpdateUserInformation = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: userId, name: name, pwd: pwd, authority: authority, phone: phone, email: email, location: location, needChangePwd: 'false' })
        }
        fetch(`http://10.100.105.103:4000/user/update/information`, UpdateUserInformation)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

        if (myId === userId) {
            localStorage.removeItem('myName')
            localStorage.setItem('myName', name);
        }

        if (check === true && myAuthority !== 'client') {
            setTimeout((() => window.location.href = '/UserManagement'), 500);
        } else {
            setTimeout((() => window.location.href = '/'), 500);
        }
    }

    return (
        <div className='user-page-container'>
            <h1 className='user-page-title'>帳號資料管理</h1>
            <div className='user-page-wrapper'>
                {userDB.map((item) => (
                    <div key={userId}>
                        <form className='user-page-form' onSubmit={() => submitHandle()}>
                            <div className='user-page-form-user-wrapper'>
                                <h3>帳號 : {item.user}</h3>
                            </div>
                            <div className='user-page-form-pwd-wrapper'>
                                <h3>密碼</h3>
                                <TextField
                                    error={needChangePwdCheck === true ? true : pwdCheck === true ? true : false}
                                    type="password"
                                    label="密碼"
                                    variant="outlined"
                                    onChange={(e) => setPwd(e.target.value)}
                                    helperText={
                                        pwd.length === 0 && needChangePwd === 'true' ? '這次登入您需要更換密碼' :
                                            pwd.length !== 0 && needChangePwd === '' ? '' :
                                                pwdCheck === true ? '請檢查輸入的是否為超過8字元、含有大小寫和數字' : ''}
                                />
                                <TextField
                                    error={pwd2Check === true ? true : false}
                                    type="password"
                                    label="確認密碼"
                                    variant="outlined"
                                    onChange={(e) => setPwd2(e.target.value)}
                                    helperText={pwd2Check === true ? '密碼錯誤' : ''}
                                />
                            </div>
                            <div className='user-page-form-authority-wrapper'>
                                <h3>權限</h3>
                                <NativeSelect
                                    onChange={(e) => setAuthority(e.target.value)}
                                >
                                    {myAuthority === 'system-staff' && <option value={`${myAuthority}`}>{myAuthority === 'system-staff' ? '系統管理員' : '管理使用者'}</option>}
                                    {myAuthority !== 'client' && <option value='client-system-staff'>管理使用者</option>}
                                    <option value='client'>一般使用者</option>
                                </NativeSelect>
                            </div>
                            <div className='user-page-form-name-wrapper'>
                                <h3>姓名</h3>
                                <TextField
                                    error={nameCheck === true ? true : false}
                                    style={{ borderColor: 'red' }}
                                    defaultValue={`${item.name}`}
                                    onChange={(e) => setName(e.target.value)}
                                    helperText={nameCheck && '姓名不得為空'}
                                />
                            </div>
                            <div className='user-page-form-phone-wrapper'>
                                <h3>電話</h3>
                                <TextField
                                    error={phoneCheck === true ? true : false}
                                    defaultValue={`${item.phone}`}
                                    type="phone"
                                    onChange={(e) => setPhone(e.target.value)}
                                    helperText={phoneCheck && '電話不得為空'}
                                />
                            </div>
                            <div className='user-page-form-email-wrapper'>
                                <h3>Email</h3>
                                <TextField
                                    error={emailCheck === true ? true : false}
                                    defaultValue={`${item.email}`}
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    helperText={emailCheck && '信箱不得為空'}
                                />
                            </div>
                            <div className='user-page-form-location-wrapper'>
                                <h3>公司/學校</h3>
                                <TextField
                                    error={locationCheck === true ? true : false}
                                    type="text"
                                    defaultValue={`${item.location}`}
                                    onChange={((e) => setLocation(e.target.value))}
                                    helperText={locationCheck && '信箱不得為空'}
                                />
                            </div>
                            <div className='user-page-btns-wrapper'>
                                <Link to="/">取消</Link>
                                <button onClick={(e) => submitHandle(e)}>更新</button>
                            </div>
                        </form>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default UserPage