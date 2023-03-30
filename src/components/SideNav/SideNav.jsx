import React from 'react'
import ClientView from './ClientView/ClientView'
import ManagerView from './ManagerView/ManagerView'
import SystemManagerView from './SystemManagerView/SystemManagerView'
import './SideNav.scss'


const SideNav = ({ sideStatus }) => {
    // 權限
    const myAuthority = localStorage.getItem('myAuthority')
    return (
        <aside
            className='sidenav-container'
            style={{ transform: `translateX(-${sideStatus === true ? '0' : '100'}%)`, }}
        >
            <div className='sidenav-wrapper'>
                {myAuthority === 'client' && <ClientView />}
                {myAuthority === 'client-system-staff' && <ManagerView />}
                {myAuthority === 'system-staff' && <SystemManagerView />}
            </div>
            <div className='sidenav-version'>
                <h3>v1.0.3</h3>
            </div>
        </aside>
    )
}

export default SideNav