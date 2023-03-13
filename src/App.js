import React, { useState, useEffect } from 'react'
import './App.css'

// React Router V6
import {
  Route,
  Routes,
} from "react-router-dom";

// Page File
import Home from './page/Home/Home.jsx'
import Navbar from './components/Navbar/Navbar.jsx';
import SideNav from './components/SideNav/SideNav.jsx';
import SelectLocal from './page/SelectLocal/SelectLocal';
import Adam from './page/Adam/Adam';
import Simulation from './page/Simulation/Simulation';
import UserManagement from './page/User/UserManagement';
import UserSignUp from './page/User/UserSignUp/UserSignUp';
import System from './page/System/System';
import SimulationLog from './page/Log/SimulationLog/SimulationLog';
import AreaEqLog from './page/Log/AreaEqLog/AreaEqLog';
import CwbEqLog from './page/Log/CwbEqLog/CwbEqLog';
import UserPage from './page/User/UserPage/UserPage';
import Login from './page/Login/Login';
import Loading from './components/Loading/Loading';
import About from './page/About/About';
import NotFound from './page/NotFound/NotFound';
import LoginLog from './page/Log/LoginLog/LoginLog';
import Initial from './page/Initial/Initial';

const App = () => {
  // 導航欄開關
  const [sideStatus, setSideStatus] = useState(false);

  // 監聽城市 & 鄉鎮
  const [listenCity, setListenCity] = useState('');
  const [listenTowns, setListenTowns] = useState(null);

  // Mqtt 連線狀況
  const [appMqtt, setAppMqtt] = useState(undefined)

  // 地震事件
  let [eqData, setEqData] = useState(undefined)

  // 氣象局報告 & 速報
  let [appCwbReport, setAppCwbReport] = useState(null)
  let [appCwbPReport, setAppCwbPReport] = useState(null)

  // 系統設定
  let [appGrayColorMin, setAppGrayColorMin] = useState(60)
  let [appMqttMin, setAppMqttMin] = useState(60)

  // 登入鎖定次數 & 分鐘
  let [appLoginCount, setAppLoginCount] = useState(null)
  let [appLockMin, setAppLockMin] = useState(null)

  // 初始化確認
  let [appInitialSetup, setAppInitialSetup] = useState('')

  useEffect(() => {
    // 監聽城市 & 鄉鎮 API
    fetch(`http://10.100.105.103:4000/settings/Listen_towns`, { method: "GET" })
      .then(res => res.json())
      .then(data => {
        setListenCity(data[0].Areacode.slice(0, 5))
        setListenTowns([...data])
      })
      .catch(e => {
        console.log(e);
      })

    // 複合式連接狀態 API
    fetch(`http://10.100.105.103:4000/logs/connect`, { method: "GET" })
      .then(res => res.json())
      .then(data => {
        setAppMqtt(data)
      })
      .catch(e => {
        console.log(e);
      })

    // 鄉鎮地震事件
    const eqEvtHttp = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify()
    };
    fetch(`http://10.100.105.103:4000/data/area_data`, eqEvtHttp)
      .then(response => response.json())
      .then(data => {
        setEqData(data)
      });

    // 氣象局報告
    const reportHTTP = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify()
    };

    fetch(`http://10.100.105.103:4000/data/Report`, reportHTTP)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          setAppCwbReport([
            {
              "id": "no_data",
              "depth": "",
              "mag": "",
              "origintime": "2022-04-18 00:00:00",
              "lon": "",
              "lat": "",
              "Rposition": "",
              "xml": null
            }
          ])
        } else {
          setAppCwbReport(data)
        }
      });

    // 氣象局速報
    const pReportHTTP = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify()
    };
    fetch(`http://10.100.105.103:4000/data/PReport`, pReportHTTP)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          setAppCwbPReport([
            {
              "id": "no_data",
              "depth": "",
              "mag": "",
              "origintime": "2022-04-18 00:00:00",
              "lon": "0",
              "lat": "0",
              "xml": null
            }
          ])
        } else {
          setAppCwbPReport(data)
        }
      });

    // 系統設定
    const systemSettingHTTP = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify()
    };
    fetch(`http://10.100.105.103:4000/system/setting`, systemSettingHTTP)
      .then(response => response.json())
      .then(data => {
        setAppGrayColorMin(data[0].eqGrayColorMin)
        setAppMqttMin(data[0].mqttMin)
        setAppLoginCount(data[0].loginCount)
        setAppLockMin(data[0].lockMin)
        setAppInitialSetup(data[0].initialSetup)
      });
  }, [])

  if (appInitialSetup === 'false') return <Initial />
  if (localStorage.getItem('myToken') === null) return <Login appLoginCount={appLoginCount} appLockMin={appLockMin} />
  if (listenCity === '') return
  if (!listenTowns) return
  if (eqData === undefined) return <Loading height={100} />
  if (appCwbReport === null) return
  if (appCwbPReport === null) return
  if (appLockMin === null || appLockMin === null) return

  const myAuthority = localStorage.getItem('myAuthority')

  return (
    <main className='app-container'>
      <div className='app-wrapper'>
        <Navbar sideStatus={sideStatus} setSideStatus={setSideStatus} />
        <SideNav sideStatus={sideStatus} />
        <section className='app-page-wrapper'>
          <Routes>
            <Route path='/' element={<Home appMqttMin={appMqttMin} appGrayColorMin={appGrayColorMin} listenCity={listenCity} listenTowns={listenTowns} appMqtt={appMqtt} eqData={eqData} appCwbReport={appCwbReport} appCwbPReport={appCwbPReport} />} />
            {myAuthority === 'system-staff' ? <Route path='/SelectLocal' element={<SelectLocal />} /> : <Route path='*' element={<NotFound />} />}
            {myAuthority === 'system-staff' ? <Route path='/Adam' element={<Adam />} /> : <Route path='*' element={<NotFound />} />}
            <Route path='/Simulation' element={<Simulation />} />
            {/* User */}
            {myAuthority === 'system-staff' || myAuthority === 'client-system-staff' ? <Route path='/UserManagement' element={<UserManagement />} /> : <Route path='*' element={<NotFound />} />}
            {myAuthority === 'system-staff' || myAuthority === 'client-system-staff' ? <Route path='/UserSignUp' element={<UserSignUp />} /> : <Route path='*' element={<NotFound />} />}
            <Route path='/UserPage/:id' element={<UserPage />} />
            {/* LOG */}
            <Route path='/AreaEqLog' element={<AreaEqLog />} />
            <Route path='/CwbEqLog' element={<CwbEqLog />} />
            <Route path='/SimulationLog' element={<SimulationLog />} />
            <Route path='/LoginLog' element={<LoginLog />} />
            {/* System Setting */}
            {myAuthority === 'system-staff' ? <Route path='/System' element={<System appGrayColorMin={appGrayColorMin} appMqttMin={appMqttMin} appLoginCount={appLoginCount} appLockMin={appLockMin} />} /> : <Route path='*' element={<NotFound />} />}
            {/* About */}
            <Route path='/About' element={<About />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </section>
      </div>
    </main >
  )
}

export default App
