import React from 'react'
import './Navbar.scss'
import IconButton from '@mui/material/IconButton';
import { FaBars } from "react-icons/fa";
import { RiUserShared2Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useDomain } from '../DomainContext/DomainContext.jsx';

const Navbar = ({ sideStatus, setSideStatus }) => {
    // 使用者名稱
    const myName = localStorage.getItem('myName')
    // 使用者ID
    const id = localStorage.getItem('myId')
    // 使用者帳戶
    const myUser = localStorage.getItem('myUser')
    const { domain } = useDomain();
    // 登出
    const signOutHandle = () => {
        const logHTTP = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: myName, user: myUser })
        };

        fetch(`http://${domain}/user/sign-out`, logHTTP)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

        // 登出
        localStorage.clear();
        setTimeout((() => window.location.href = '/'), 500)
    }
    return (
        <nav className='navbar-container'>
            <div className='navbar-wrapper'>
                <div className='navbar-left'>
                    <IconButton
                        size="large"
                        onClick={() => setSideStatus(!sideStatus)}
                    >
                        <FaBars />
                    </IconButton>
                    <h2>地震速報平台</h2>
                </div>
                <div className='navbar-right'>
                    <h3>使用者 : <Link to={`/UserPage/${id}`}>{myName}</Link> </h3>
                    <button onClick={() => signOutHandle()}><RiUserShared2Fill /> 登出</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar