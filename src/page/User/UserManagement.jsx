import React, { useState, useEffect } from 'react'
import './UserManagement.scss'
import { BsPencilSquare } from "react-icons/bs";
import { Link } from 'react-router-dom';

const UserManagement = () => {
    // 權限
    const myAuthority = localStorage.getItem('myAuthority')
    
    // 所有使用者
    const [userDB, setUserDB] = useState(null)

    // 選擇權限
    const [select, setSelect] = useState(myAuthority === 'system-staff' ? false : true)

    useEffect(() => {
        const getData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        }

        fetch(`http://10.100.105.103:4000/show/user`, getData)
            .then(response => response.json())
            .then(data => setUserDB(data))
            .catch(err => console.log(err))
    }, [])

    if (userDB === null) return

    //系統管理者
    const systemUser = userDB.filter((user) => user.authority === 'system-staff')

    //客戶
    const clientUser = userDB.filter((user) => user.authority === 'client' || user.authority === 'client-system-staff')

    const deleteHandler = (id) => {
        const deleteUser = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: `${id}` })
        }

        fetch(`http://10.100.105.103:4000/delect/user`, deleteUser)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

        setTimeout((() => window.location.href = '/UserManagement'), 300);
    }

    return (
        <div className='user-management-container'>
            <div className='user-management-wrapper'>
                <h1>{select === false ? '系統帳戶管理' : '使用者帳戶管理'}</h1>
                <div className='user-management-btn-wrapper'>
                    <div className='user-management-type-btn-wrapper'>
                        {myAuthority === 'system-staff' && <button style={{ backgroundColor: `${select === false ? 'rgb(54, 108, 139)' : ''}`, color: `${select === false ? 'white' : 'black'}` }} onClick={() => setSelect(false)}>系統管理員</button>}
                        <button style={{ backgroundColor: `${select === true ? 'rgb(54, 108, 139)' : ''}`, color: `${select === true ? 'white' : 'black'}` }} onClick={() => setSelect(true)}>使用者</button>
                    </div>
                    <div>
                        {myAuthority !== 'client' && <a className='user-sign-up-btn' href="/UserSignUp">創建帳戶</a>}
                    </div>
                </div>
                <section className='user-management-users-wrapper'>
                    <div className='user-management-users-wrapper'>
                        <div className='user-management-users-title'>
                            <h3>序號</h3>
                            <h3>帳號</h3>
                            <h3>姓名</h3>
                            <h3>權限</h3>
                            <h3>編輯</h3>
                        </div>

                        {myAuthority === 'system-staff' && select === false &&
                            <div className='user-management-users-list-wrapper'>
                                {systemUser.map((user, index) => (
                                    <div className='user-management-users-list' key={user.id}>
                                        <h4>{index}</h4>
                                        <h4>{user.user}</h4>
                                        <h4>{user.name}</h4>
                                        <h4>{user.authority === 'system-staff' && '系統管理者'}</h4>
                                        <h4 className='user-management-users-edit'>
                                            <i>
                                                <BsPencilSquare />
                                                <div className='user-management-users-edit-wrapper'>
                                                    <div>
                                                        <Link onClick={() => localStorage.setItem('assignID',user.id)} to={`/UserPage/${user.id}`}>編輯</Link>
                                                        <button onClick={() => deleteHandler(user.id)}>刪除</button>
                                                    </div>
                                                </div>
                                            </i>
                                        </h4>
                                    </div>
                                ))}
                                {systemUser.length === 0 && <h4 className='user-management-no-data' style={{ boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}> 系統管理員無帳戶</h4>}
                            </div>
                        }

                        {select === true &&
                            <div className='user-management-users-list-wrapper'>
                                {clientUser.map((user, index) => (
                                    <div className='user-management-users-list' key={user.id}>
                                        <h4>{index}</h4>
                                        <h4>{user.user}</h4>
                                        <h4>{user.name}</h4>
                                        <h4>{user.authority === 'client' ? '一般使用者' : '管理使用者'}</h4>
                                        <h4 className='user-management-users-edit'>
                                            <i>
                                                <BsPencilSquare />
                                                <div className='user-management-users-edit-wrapper'>
                                                    <div>
                                                        <Link to={`/UserPage/${user.id}`}>編輯</Link>
                                                        <button onClick={() => deleteHandler(user.id)}>刪除</button>
                                                    </div>
                                                </div>
                                            </i>
                                        </h4>
                                    </div>
                                ))}
                                {clientUser.length === 0 && <h4 className='user-management-no-data' style={{ boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}>使用者無帳戶</h4>}
                            </div>
                        }
                    </div>
                </section>
            </div >
        </div >
    )
}

export default UserManagement