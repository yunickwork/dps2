import React, { useEffect, useState, useCallback } from 'react';
import './About.scss'
import logo from './logo.png'
import { useDomain } from '../../components/DomainContext/DomainContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const About = ({ appUnitName, appMachineName, appMachineDate, appCED }) => {
    // 當前版本
    const [currentVersion, setCurrentVersion] = useState('')
    // 最新版本
    const [newVersion, setNewVersion] = useState('')
    // Domain
    const { domain } = useDomain();
    // 新增 isLoading 狀態
    const [isLoading, setIsLoading] = useState(false);

    // 抓取目前版本的函數
    const fetchVersions = useCallback(() => {
        // 當前版本
        fetch(`http://${domain}:4000/machine/currentVersion`, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                setCurrentVersion(data[4].version);
            })
            .catch(e => {
                console.log(e);
            });

        // 最新資料包抓取
        fetch(`http://${domain}:4000/machine/newVersion`, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                setNewVersion(data[0].package_name);
            })
            .catch(e => {
                console.log(e);
            });
    }, [domain]);

    useEffect(() => {
        fetchVersions();
    }, [fetchVersions]);

    const checkUpdateHandle = () => {
        // 當前版本
        fetch(`http://${domain}:4000/machine/currentVersion`, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                setCurrentVersion(data[4].version)
            })
            .catch(e => {
                console.log(e);
            })
        // 查看最新資料包
        fetch(`http://${domain}:4000/machine/newVersion`, { method: "GET" })
            .then(res => res.json())
            .then(data => {
                const latestPackageName = data[0].package_name;
                if (currentVersion !== latestPackageName) {
                    // 更新操作
                    alert('需要更新');
                } else {
                    alert('不需要更新');
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

        // 開始更新，顯示 loading
        setIsLoading(true);

        // 發送更新
        const eqEvtHttp = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ update: 'go-to-update' })
        };

        fetch(`http://${domain}:1880/buildingews/update/trigger`, eqEvtHttp)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));

        // 設置一個定時器，一分鐘後重新檢查
        setTimeout(() => {
            fetchVersions();
            setIsLoading(false); // 結束 loading
        }, 60000);
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
                    {isLoading && <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>}
                    {isLoading !== true && <p>{currentVersion}</p>}
                    {isLoading !== true && <button onClick={checkUpdateHandle} className='app-update-check'>檢查更新</button>}
                    {currentVersion !== newVersion && !isLoading && (
                        <button onClick={goToUpdateHandle} className='app-update'>
                            手動更新
                        </button>
                    )}
                </div>
                <div>
                    <h3>機器出廠時間</h3>
                    <p>{appMachineDate}</p>
                </div>
                <div>
                    <h3>合約到期日</h3>
                    <p>{appCED}</p>
                </div>
            </div >
        </div >
    )
}

export default About