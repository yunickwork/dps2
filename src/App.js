import React, { useState, useEffect } from 'react'
import './App.css'

// React Router V6
import {
  Route,
  Routes,
} from "react-router-dom";

// Page Location
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
  let [appInitialSetup, setAppInitialSetup] = useState(undefined)
  let [appUnitName, setAppUnitName] = useState(undefined)
  let [appMachineName, setAppMachineName] = useState(undefined)
  let [appMachineDate, setAppMachineDate] = useState(undefined)
  let [appCED, setAppCED] = useState(undefined)

  // Domain Name
  const domain = '10.100.105.103';

  useEffect(() => {
    // API 函數集中存放
    const api = {
      fetchListenTowns: () => fetch(`http://${domain}:4000/settings/Listen_towns`),
      fetchConnectLogs: () => fetch(`http://${domain}:4000/logs/connect`),
      fetchAreaData: () => fetch(`http://${domain}:4000/data/area_data`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify() }),
      fetchReport: () => fetch(`http://${domain}:4000/data/Report`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify() }),
      fetchPReport: () => fetch(`http://${domain}:4000/data/PReport`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify() }),
      fetchSystemSettings: () => fetch(`http://${domain}:4000/system/setting`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify() }),
    };

    async function fetchData() {
      try {
        // 監聽城市 & 鄉鎮 API
        const listenTownsData = await api.fetchListenTowns().then(res => res.json());
        setListenCity(listenTownsData[0].Areacode.slice(0, 5));
        setListenTowns(listenTownsData);

        // 複合式連接狀態 API
        const connectLogsData = await api.fetchConnectLogs().then(res => res.json());
        if (connectLogsData.length === 0);
        setAppMqtt(connectLogsData);

        // 鄉鎮地震事件
        const areaData = await api.fetchAreaData().then(res => res.json());
        setEqData(areaData);

        // 氣象局報告
        const reportData = await api.fetchReport().then(res => res.json());
        setAppCwbReport(reportData.length === 0 ? [
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
        ] : reportData);

        // 氣象局速報
        const pReportData = await api.fetchPReport().then(res => res.json());
        setAppCwbPReport(pReportData.length === 0 ? [
          {
            "id": "no_data",
            "depth": "",
            "mag": "",
            "origintime": "2022-04-18 00:00:00",
            "lon": "0",
            "lat": "0",
            "xml": null
          }
        ] : pReportData);

        // 系統設定
        const systemSettingsData = await api.fetchSystemSettings().then(res => res.json());
        const settings = systemSettingsData[0];
        // 系統設定
        setAppGrayColorMin(settings.eqGrayColorMin);
        setAppMqttMin(settings.mqttMin);
        setAppLoginCount(settings.loginCount);
        setAppLockMin(settings.lockMin);
        // 系統資訊
        setAppInitialSetup(settings.initialSetup);
        setAppUnitName(settings.unitName);
        setAppMachineName(settings.machineID);
        setAppMachineDate(settings.machineDate);
        setAppCED(settings.CED);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  // 需要填寫初始化
  if (appInitialSetup === 'false') {
    return <Initial />;
  }

  // 我的 token 不是空的
  if (localStorage.getItem('myToken') === null) {
    return <Login appLoginCount={appLoginCount} appLockMin={appLockMin} />;
  }

  // 讀取 Loading 畫面
  if (listenCity === '' || !listenTowns || eqData === undefined || appCwbReport === null || appCwbPReport === null || appLockMin === null || appLockMin === null) {
    if (eqData === undefined) {
      return <Loading height={100} />;
    }
    return null;
  }

  // 我的權限
  const myAuthority = localStorage.getItem('myAuthority');

  return (
    <main className='app-container'>
      <div className='app-wrapper'>
        {/* 導航欄 */}
        <Navbar sideStatus={sideStatus} setSideStatus={setSideStatus} />
        {/* 側邊欄 */}
        <SideNav sideStatus={sideStatus} />
        <section className='app-page-wrapper'>
          <Routes>
            {/* 首頁 */}
            <Route path='/' element={<Home appMqttMin={appMqttMin} appGrayColorMin={appGrayColorMin} listenCity={listenCity} listenTowns={listenTowns} appMqtt={appMqtt} eqData={eqData} appCwbReport={appCwbReport} appCwbPReport={appCwbPReport} />} />
            {/* 選擇本機位置頁面 */}
            {myAuthority === 'system-staff' ? <Route path='/SelectLocal' element={<SelectLocal />} /> : <Route path='*' element={<NotFound />} />}
            {/* 移報設定頁面 */}
            {myAuthority === 'system-staff' ? <Route path='/Adam' element={<Adam />} /> : <Route path='*' element={<NotFound />} />}
            {/* 模擬發報頁面 */}
            <Route path='/Simulation' element={<Simulation domain={domain} />} />
            {/* 使用者管理頁面 */}
            {myAuthority === 'system-staff' || myAuthority === 'client-system-staff' ? <Route path='/UserManagement' element={<UserManagement />} /> : <Route path='*' element={<NotFound />} />}
            {myAuthority === 'system-staff' || myAuthority === 'client-system-staff' ? <Route path='/UserSignUp' element={<UserSignUp />} /> : <Route path='*' element={<NotFound />} />}
            <Route path='/UserPage/:id' element={<UserPage />} />
            {/* 各種 LOG 頁面 */}
            <Route path='/AreaEqLog' element={<AreaEqLog />} />
            <Route path='/CwbEqLog' element={<CwbEqLog />} />
            <Route path='/SimulationLog' element={<SimulationLog />} />
            <Route path='/LoginLog' element={<LoginLog />} />
            {/* 系統設定頁面 */}
            {myAuthority === 'system-staff' || myAuthority === 'client-system-staff' ? <Route path='/System' element={<System appGrayColorMin={appGrayColorMin} appMqttMin={appMqttMin} appLoginCount={appLoginCount} appLockMin={appLockMin} />} /> : <Route path='*' element={<NotFound />} />}
            {/* 關於系統頁面 */}
            <Route path='/About' element={<About appUnitName={appUnitName} appMachineName={appMachineName} appMachineDate={appMachineDate} appCED={appCED} />} />
            {/* Not Found 頁面 */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </section>
      </div>
    </main >
  )
}

export default App
