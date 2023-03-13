import React, { useState } from 'react'
import { TaiwanCityTown_DB1 } from '../../../db/TaiwanCityTownDB/TaiwanCityTown_DB1'
import './AreaEqLog.scss'
import { MdOutlineClose } from "react-icons/md";

const AreaEqLogBox = ({ openBox, setOpenBox, messageIdDB, eqEvent }) => {
    // 選擇 city id 
    const [cityID, setCityID] = useState('')

    // 先將 areacode 篩選出來
    let allCity = messageIdDB.map((item) => {
        if (item.areacode === null || item.areacode === undefined) item.areacode = "00000"
        return item.areacode.slice(0, 5);
    })
    // 去除掉重複的值
    let cityFilter = allCity.filter((item, index, array) => array.indexOf(item) === index)

    // City 中文
    let cityChineseNameDB = []

    // 將 areacode 轉成中文放置 array
    cityFilter.map((code) => {
        TaiwanCityTown_DB1.map((city) => {
            if (city.id === code) {
                cityChineseNameDB.push({
                    name: city.city,
                    number: city.city === '臺北市' ? 1 :
                        city.city === '新北市' ? 2 :
                            city.city === '基隆市' ? 3 :
                                city.city === '宜蘭縣' ? 4 :
                                    city.city === '桃園市' ? 5 :
                                        city.city === '新竹市' ? 6 :
                                            city.city === '新竹縣' ? 7 :
                                                city.city === '苗栗縣' ? 8 :
                                                    city.city === '臺中市' ? 9 :
                                                        city.city === '彰化縣' ? 10 :
                                                            city.city === '南投縣' ? 11 :
                                                                city.city === '雲林縣' ? 12 :
                                                                    city.city === '嘉義市' ? 13 :
                                                                        city.city === '嘉義縣' ? 14 :
                                                                            city.city === '臺南市' ? 15 :
                                                                                city.city === '高雄市' ? 16 :
                                                                                    city.city === '屏東縣' ? 17 :
                                                                                        city.city === '花蓮縣' ? 18 :
                                                                                            city.city === '臺東縣' ? 19 :
                                                                                                city.city === '湖澎縣' ? 20 :
                                                                                                    city.city === '金門縣' ? 21 :
                                                                                                        city.city === '連江縣' ? 22 : 0
                })
            }
            return null
        })
        return null
    })

    let eqAreaTownChineseNameDB = []

    // DB
    messageIdDB.map((item) => {
        TaiwanCityTown_DB1.map((city) => {
            if (item.areacode === null || item.areacode === undefined) item.areacode = "00000"
            city.towns.map((town) => {
                if (item.areacode === town.id) {
                    if (item.areacode.slice(0, 5) === city.id) {
                        // if(city.city === '臺北市')
                        eqAreaTownChineseNameDB.push({
                            cityName: city.city,
                            townName: town.name,
                            inx: item.inx,
                            number: city.city === '臺北市' ? 1 :
                                city.city === '新北市' ? 2 :
                                    city.city === '基隆市' ? 3 :
                                        city.city === '宜蘭縣' ? 4 :
                                            city.city === '桃園市' ? 5 :
                                                city.city === '新竹市' ? 6 :
                                                    city.city === '新竹縣' ? 7 :
                                                        city.city === '苗栗縣' ? 8 :
                                                            city.city === '臺中市' ? 9 :
                                                                city.city === '彰化縣' ? 10 :
                                                                    city.city === '南投縣' ? 11 :
                                                                        city.city === '雲林縣' ? 12 :
                                                                            city.city === '嘉義市' ? 13 :
                                                                                city.city === '嘉義縣' ? 14 :
                                                                                    city.city === '臺南市' ? 15 :
                                                                                        city.city === '高雄市' ? 16 :
                                                                                            city.city === '屏東縣' ? 17 :
                                                                                                city.city === '臺東縣' ? 18 :
                                                                                                    city.city === '花蓮縣' ? 19 :
                                                                                                        city.city === '金門縣' ? 20 :
                                                                                                            city.city === '澎湖縣' ? 21 :
                                                                                                                city.city === '連江縣' ? 22 : 0
                        })
                    }
                }
                return null
            })
            return null
        })
        return null
    })




    // 這個是受影響的城市排序 比如 台北 -> 新北 -> 基隆 -> 宜蘭 ...
    let cityChineseNameDBSort = cityChineseNameDB.sort((a, b) => {
        return a.number - b.number
    })

    // 這個是受影響的鄉鎮排序 比如 台北 -> 新北 -> 基隆 -> 宜蘭 ...
    let eqAreaTownChineseNameDBSort = eqAreaTownChineseNameDB.sort((a, b) => {
        return a.number - b.number;
    })

    // 點選您想要的城市
    const clickHandle = (city) => {
        setCityID(city)
        if (city === cityID) {
            setCityID('')
        }
    }

    let filterEqAreaTownChineseNameDB = eqAreaTownChineseNameDBSort.filter((item) => {
        if (cityID === '') {
            return item
        } else if (cityID === item.cityName) {
            return item
        }
        return null
    })



    return (
        <div className='area-eq-log-box-container'
            style={{ display: `${openBox === true ? 'flex' : 'none'}` }}
        >
            <button
                className='area-eq-log-box-close'
                onClick={() => { setOpenBox(false); setCityID('') }}
            >
                <MdOutlineClose />
            </button>
            <div className='area-eq-log-box-bg' onClick={() => { setOpenBox(false); setCityID('') }}></div>
            <div className='area-eq-log-box-wrapper'>
                <div className='area-eq-log-box-eq-event-wrapper'>
                    <h2>鄉鎮地震事件</h2>
                    <div>
                        <h3>地震編號 : {eqEvent.messageID}</h3>
                        <h3>地震發生時間 : {eqEvent.eventtime}</h3>
                    </div>
                </div>
                <div className='area-eq-log-box-city-wrapper'>
                    <h2>受影響城市 {'>'} (可以選擇城市)</h2>
                    <div className="area-eq-log-box-city-list-wrapper">
                        {cityChineseNameDBSort.map((city, index) => (
                            <div key={index}>
                                <button
                                    style={{ backgroundColor: `${city.name === cityID ? 'rgb(255, 208, 0)' : ''}` }}
                                    onClick={() => clickHandle(city.name)}>
                                    {city.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='area-eq-log-box-town-wrapper'>
                    <h2>受影響鄉鎮</h2>
                    <div className='area-eq-log-box-towns-list-wrapper'>
                        {filterEqAreaTownChineseNameDB.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    color: `${item.inx >= 5 ? 'white' : 'black'}`,
                                    backgroundColor: `${item.inx >= 7.0 ? 'rgb(163, 10, 194)' :
                                        item.inx >= 6.5 ? 'rgb(130, 76, 139)' :
                                            item.inx >= 6.0 ? 'rgb(94, 65, 60)' :
                                                item.inx >= 5.5 ? 'rgb(184, 65, 10)' :
                                                    item.inx >= 5.0 ? 'rgb(255, 81, 0)' :
                                                        item.inx >= 4.0 ? 'rgb(255, 166, 0)' :
                                                            item.inx >= 3.0 ? 'rgb(248, 252, 26)' :
                                                                item.inx >= 2.0 ? 'rgb(105, 248, 62)' :
                                                                    item.inx >= 1.0 ? 'rgb(216, 255, 194)' : ''}`
                                }}>
                                <p>
                                    {item.cityName}
                                    {' '}
                                    {item.townName}
                                    {' '}
                                    {item.inx >= 7.0 ? '7級' :
                                        item.inx >= 6.5 ? '6強' :
                                            item.inx >= 6.0 ? '6弱' :
                                                item.inx >= 5.5 ? '5強' :
                                                    item.inx >= 5.0 ? '5弱' :
                                                        item.inx >= 4.0 ? '4級' :
                                                            item.inx >= 3.0 ? '3級' :
                                                                item.inx >= 2.0 ? '2級' :
                                                                    item.inx >= 1.0 ? '1級' : '0級'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AreaEqLogBox