import React, { useState, useEffect } from 'react'
import './Home.scss'
// 這個是為惹抓取鄉鎮中文名稱
import { TaiwanCityTown_DB1 } from '../../db/TaiwanCityTownDB/TaiwanCityTown_DB1.js'
import Map from '../../components/Map/Map.jsx'
import EqReport from './EqReport/EqReport'
import DpsMqtt from './DpsMqtt/DpsMqtt'
import Loading from '../../components/Loading/Loading'
import { useDomain } from '../../components/DomainContext/DomainContext.jsx';

// mui
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Home = ({ listenCity, listenTowns, appMqtt, eqData, appCwbReport, appCwbPReport, appGrayColorMin, appMqttMin, appCED, setCeoOnClose, ceoOnClose }) => {
    // appCED
    const appCED_ts = new Date(appCED).getTime()

    // 現在時間
    const now_ts = new Date().getTime()

    // Domain
    const { domain } = useDomain();

    // 複製城市 & 鄉鎮資料
    const taiwanCityTown = [...TaiwanCityTown_DB1]

    // 篩選出監聽的城市
    const filterSelectCity = taiwanCityTown.filter(city => city.id === listenCity)
    const zoom = filterSelectCity[0].zoom
    const center = filterSelectCity[0].center

    // 篩選出訂閱的鄉鎮
    const filterTowns = []
    listenTowns.map((code) => {
        filterSelectCity[0].towns.map((town) => {
            if (town.id === code.Areacode) {
                filterTowns.push({ id: town.id, name: town.name, subscribe: !town.subscribe })
            }
            return null
        })
        return null
    })

    // 地震事件的值
    const [eqTownEvt, setEqTownEvt] = useState(undefined)

    //監聽地震事件 HeartBeat
    useEffect(() => {

        //區域地震報告
        let getAreaData = setInterval(() => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify()
            };
            fetch(`http://${domain}:4000/data/area_data`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setEqTownEvt(data)
                });
        }, 5000)
        return () => clearInterval(getAreaData)

    }, [domain]);

    // 如果地震事件等於 undefined
    if (appMqtt === undefined) return
    if (eqData === undefined) return
    if (eqTownEvt === undefined) setEqTownEvt([...eqData])
    if (eqTownEvt === undefined) return <Loading height={95} />
    let eqTownEvtCheck = eqTownEvt.filter((evt) => evt.id !== undefined)

    //最新地震鄉鎮資訊
    let townArray = []

    //這邊是在做資料轉換並讓 areacode 含有中文
    eqTownEvtCheck.map((evt) => {
        filterTowns.map((town) => {
            if (evt.areacode.toString() === town.id.toString()) {
                town.subscribe = true
                townArray.push({ id: town.id, name: town.name, inx: evt.inx, subscribe: town.subscribe })
            }
            return null
        })
        return null
    })

    // 如果鄉鎮有訂閱 town.subscribe 如果是 true === 沒訂閱 , 如果是 false 則有訂閱
    filterTowns.filter((town) => {
        if (town.subscribe === false) {
            townArray.push({ id: town.id, name: town.name, inx: '', subscribe: town.subscribe })
        }
        return null
    })

    // 取最大的地震值
    let maxInxTownSortArray = townArray.sort((a, b) => {
        return b.inx - a.inx
    })

    //取最大得 pgax 值
    let maxPgaTownSortArray = eqTownEvtCheck.sort((a, b) => b.pgax - a.pgax)

    // 如果沒地震事件不讓 eventtime 變成空值 (原因 : 要判斷地震區域是否要呈現灰色, 如果 eventtime 不是數字會抱錯)
    if (eqTownEvtCheck.length === 0) eqTownEvtCheck.push({ eventtime: 0 })

    //整理數據
    let townArraySort = townArray.slice().sort(function (a, b) {
        let areacodeA = parseInt(a.id);
        let areacodeB = parseInt(b.id);

        // 判斷地震值
        if (a.inx !== '' && b.inx !== '' && a.inx > b.inx) {
            return -1;
        } else if (a.inx < b.inx) {
            return 1;
        }

        // 判斷相等的情况
        if (areacodeA === areacodeB && a.inx === b.inx) {
            return 0;
        }

        // 如果兩個 areacode 和 inx 值都相同，則按 areacode 值降序排序
        if (a.inx === b.inx && areacodeA > areacodeB) {
            return -1;
        } else if (a.inx === b.inx && areacodeA < areacodeB) {
            return 1;
        }

        // 按 areacode 值升序排序
        if (areacodeA < areacodeB) {
            return -1;
        } else if (areacodeA > areacodeB) {
            return 1;
        }

        // 如果兩個數據完全相同，則保持原樣
        return 0;
    });

    // 判斷是否超過設定時間要變成灰色
    let eqEvtDate = new Date(eqTownEvtCheck[0].eventtime)
    let eqEvtDate_ts = eqEvtDate.getTime() + 1 * 1000 * 60 * appGrayColorMin;
    let nowDate_ts = new Date().getTime()

    return (
        <div className='home-container'>
            {/* 合約日過期判斷 */}
            <div className="home-ced-alert">
                <Stack sx={{ width: "100%" }} spacing={2}>
                    {!ceoOnClose && (
                        <>
                            {now_ts >= appCED_ts ? (
                                <Alert
                                    variant="filled"
                                    onClose={() => setCeoOnClose(true)}
                                    severity="error"
                                >
                                    合約已到期 : {appCED}
                                </Alert>
                            ) : now_ts >= appCED_ts - 30 * 24 * 60 * 60 * 1000 ? (
                                <Alert
                                    variant="filled"
                                    severity="info"
                                >
                                    合約到期日剩餘時間 {Math.ceil((appCED_ts - now_ts) / (24 * 60 * 60 * 1000))} 天
                                </Alert>
                            ) : null}
                        </>
                    )}
                </Stack>
            </div>
            <div className='home-wrapper'>
                <div className='home-map'>
                    <div className='home-location-wrapper'>
                        <p>目前本機位置 / {filterSelectCity[0].city.slice(0, 2) === '新竹' ? '新竹縣/市' :
                            filterSelectCity[0].city.slice(0, 2) === '嘉義' ? '嘉義縣/市' :
                                filterSelectCity[0].city}
                        </p>
                        <DpsMqtt appMqtt={appMqtt} appMqttMin={appMqttMin} />
                    </div>
                    <Map listenCity={listenCity} zoom={zoom} center={center} townArray={townArray} eqEvtDate_ts={eqEvtDate_ts} nowDate_ts={nowDate_ts} />
                </div>

                <div className='home-eq-event-container'>
                    <article className='home-eq-event-wrapper'>
                        <div className='home-now-status-eq-event'>
                            <p>全國最新地震事件</p>
                        </div>
                        <EqReport appGrayColorMin={appGrayColorMin} nowDate_ts={nowDate_ts} appCwbReport={appCwbReport} appCwbPReport={appCwbPReport} />
                    </article>
                    <article className='home-eq-town-wrapper'>
                        <div className='home-now-status-eq-town'>
                            <p>{filterSelectCity[0].city.slice(0, 2) === '新竹' ? '新竹縣/市' :
                                filterSelectCity[0].city.slice(0, 2) === '嘉義' ? '嘉義縣/市' :
                                    filterSelectCity[0].city}的最近地震事件</p>
                        </div>
                        <div className='home-eq-town-event'>
                            <div className='home-eq-town-event-detail-wrapper'>
                                <div
                                    className='home-eq-town-richter-scale'
                                    style={{
                                        backgroundColor: `${maxInxTownSortArray[0].inx > 0 && nowDate_ts > eqEvtDate_ts ? 'rgb(119, 119, 119)' :
                                            maxInxTownSortArray[0].inx >= 7.0 ? 'rgb(163, 10, 194)' :
                                                maxInxTownSortArray[0].inx >= 6.5 ? 'rgb(130, 76, 139)' :
                                                    maxInxTownSortArray[0].inx >= 6.0 ? 'rgb(94, 65, 60)' :
                                                        maxInxTownSortArray[0].inx >= 5.5 ? 'rgb(184, 65, 10)' :
                                                            maxInxTownSortArray[0].inx >= 5.0 ? 'rgb(255, 81, 0)' :
                                                                maxInxTownSortArray[0].inx >= 4.0 ? 'rgb(255, 166, 0)' :
                                                                    maxInxTownSortArray[0].inx >= 3.0 ? 'rgb(248, 252, 26)' :
                                                                        maxInxTownSortArray[0].inx >= 2.0 ? 'rgb(105, 248, 62)' :
                                                                            maxInxTownSortArray[0].inx >= 1.0 ? 'rgb(216, 255, 194)' : ''
                                            }`,
                                        color: `${nowDate_ts < eqEvtDate_ts && maxInxTownSortArray[0].inx >= 5.0 ? 'white' : 'black'}`
                                    }}
                                >
                                    <h3>{maxInxTownSortArray[0].inx === '' ? '目前無資料' : '最大地震'}</h3>

                                    <h3>{maxInxTownSortArray[0].inx >= 7.0 ? '7級' :
                                        maxInxTownSortArray[0].inx >= 6.5 ? '6強' :
                                            maxInxTownSortArray[0].inx >= 6.0 ? '6弱' :
                                                maxInxTownSortArray[0].inx >= 5.5 ? '5強' :
                                                    maxInxTownSortArray[0].inx >= 5.0 ? '5弱' :
                                                        maxInxTownSortArray[0].inx >= 4.0 ? '4級' :
                                                            maxInxTownSortArray[0].inx >= 3.0 ? '3級' :
                                                                maxInxTownSortArray[0].inx >= 2.0 ? '2級' :
                                                                    maxInxTownSortArray[0].inx >= 1.0 ? '1級' : ''}
                                    </h3>
                                </div>
                                <div className='home-eq-town-event-detail'>
                                    <p>地震編號 : {eqTownEvtCheck.eventtime !== 0 ? eqTownEvtCheck[0].messageID : ''}</p>
                                    <p>地震時間 : {eqTownEvtCheck.eventtime !== 0 ? eqTownEvtCheck[0].eventtime === 0 ? '' : eqTownEvtCheck[0].eventtime : ''}</p>
                                    <p>最大PGA : {eqTownEvtCheck.eventtime !== 0 ? maxPgaTownSortArray[0].pgax : ''} </p>
                                    <p>監聽鄉鎮數量 : {townArray.length}</p>
                                </div>
                            </div>
                            <div className='home-eq-town-inx-container'>
                                {townArraySort.map((town, id) => (
                                    <div
                                        style={{
                                            backgroundColor: `
                                        ${town.inx > 0 && nowDate_ts > eqEvtDate_ts ? 'rgb(119, 119, 119)' :
                                                    town.inx >= 7.0 ? 'rgb(163, 10, 194)' :
                                                        town.inx >= 6.5 ? 'rgb(130, 76, 139)' :
                                                            town.inx >= 6.0 ? 'rgb(94, 65, 60)' :
                                                                town.inx >= 5.5 ? 'rgb(184, 65, 10)' :
                                                                    town.inx >= 5.0 ? 'rgb(255, 81, 0)' :
                                                                        town.inx >= 4.0 ? 'rgb(255, 166, 0) ' :
                                                                            town.inx >= 3.0 ? 'rgb(248, 252, 26) ' :
                                                                                town.inx >= 2.0 ? 'rgb(105, 248, 62) ' :
                                                                                    town.inx >= 1.0 ? 'rgb(216, 255, 194) ' : ''
                                                }
                                        `,
                                            color: `${nowDate_ts < eqEvtDate_ts && town.inx >= 5.0 ? 'white' : 'black'}`
                                        }}
                                        className='home-eq-event-town'
                                        key={id}>
                                        <p>{town.name}</p>
                                        <p>{town.inx >= 7.0 ? '7級' :
                                            town.inx >= 6.5 ? '6強' :
                                                town.inx >= 6.0 ? '6弱' :
                                                    town.inx >= 5.5 ? '5強' :
                                                        town.inx >= 5.0 ? '5弱' :
                                                            town.inx >= 4.0 ? '4級' :
                                                                town.inx >= 3.0 ? '3級' :
                                                                    town.inx >= 2.0 ? '2級' :
                                                                        town.inx >= 1.0 ? '1級' : ''}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>
                </div>
            </div >
        </div >
    )
}

export default Home