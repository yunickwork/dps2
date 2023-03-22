import React, { useEffect, useState } from 'react'
import './About.scss'
import logo from './logo.png'


const About = ({ appUnitName, appMachineName, appMachineDate, appCED }) => {
    // 當前版本
    const [currentVersion, setCurrentVersion] = useState('')
    // 最新版本
    const [newVersion, setNewVersion] = useState('')

    // 抓取目前版本
    useEffect(() => {
        // 當前版本
        fetch(`http://10.100.105.103:4000/machine/currentVersion`, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                setCurrentVersion(data[5].version)
            })
            .catch(e => {
                console.log(e);
            })
        // 最新資料包抓取
        fetch(`http://10.100.105.103:4000/machine/newVersion`, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                setNewVersion(data[0].package_name)
            })
            .catch(e => {
                console.log(e);
            })
    }, [])

    const checkUpdateHandle = () => {
        // 當前版本
        fetch(`http://10.100.105.103:4000/machine/currentVersion`, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                setCurrentVersion(data[5].version)
            })
            .catch(e => {
                console.log(e);
            })
        //查看最新資料包
        fetch(`http://10.100.105.103:4000/machine/newVersion`, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                if (currentVersion !== data[0].package_name) {
                    alert('可以進行更新最新版本')
                    setNewVersion(data[0].package_name)
                } else if (currentVersion === data[0].package_name) {
                    alert('目前已經是最新的版本')
                    setNewVersion(data[0].package_name)
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    const goToUpdateHandle = () => {
        // 確定要送出嗎?
        if (!window.confirm('確定要送出嗎?')) {
            return;
        }
        // 發送更新
        const eqEvtHttp = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ update: 'go-to-update' })
        };

        fetch(`http://10.100.105.103:1880/buildingews/update/trigger`, eqEvtHttp)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    return (
        <div className='about-container'>
            <h2 className='about-title'>關於系統</h2>
            <p className='about-text'>這款系統整合氣象局、國震中心地震資料，可選擇關注城市，實現地震廣播通知。提供模擬地震演練，加強應對能力，並可查詢過去地震紀錄，提高用戶的地震防護意識，中保防災科技守護您生命與財產安全。</p>
            <img className='about-company-logo' src={logo} alt="Logo" />
            <div className='about-wrapper'>
                <p>系統資訊欄</p>
                <div>
                    <h3>簽約學校 or 廠商</h3>
                    <p>{appUnitName}</p>
                </div>
                <div>
                    <h3>機器ID</h3>
                    <p>{appMachineName}</p>
                </div>
                <div>
                    <h3>機器版本</h3>
                    <p>{currentVersion}</p>
                    <button onClick={checkUpdateHandle} className='app-update-check'>檢查更新</button>
                    {currentVersion !== newVersion && <button onClick={goToUpdateHandle} className='app-update'>手動更新</button>}
                </div>
                <div>
                    <h3>機器出廠時間</h3>
                    <p>{appMachineDate}</p>
                </div>
                <div>
                    <h3>合約到期日</h3>
                    <p>{appCED}</p>
                </div>
            </div>
        </div>
    )
}

export default About