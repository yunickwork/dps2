import React from 'react'
import './Navbar.scss'
import IconButton from '@mui/material/IconButton';
import { FaBars } from "react-icons/fa";
import { RiUserShared2Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const Navbar = ({ sideStatus, setSideStatus }) => {
    
    const myName = localStorage.getItem('myName')
    const id = localStorage.getItem('myId')
    const myUser = localStorage.getItem('myUser')

    const signOutHandle = () => {
        const logHTTP = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: myName, user: myUser })
        };

        fetch(`http://10.100.105.103:4000/user/sign-out`, logHTTP)
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