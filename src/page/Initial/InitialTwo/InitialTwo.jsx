import React, { useState } from 'react'
import { TaiwanCityTown_DB1 } from '../../../db/TaiwanCityTownDB/TaiwanCityTown_DB1.js'
import { TaiwanCityTown_DB2 } from '../../../db/TaiwanCityTownDB/TaiwanCityTown_DB2.js';

import AlertCity from './AlertTowns/AlertCity';
import AlertTowns from './AlertTowns/AlertTown';
import MyAlertTown from './MyAlertTown/MyAlertTown.jsx';

const InitialTwo = ({ currentCount }) => {
    //鄉鎮城市1
    const cityTown1 = TaiwanCityTown_DB1.filter((city) => {
        const citySlice = city.city.slice(0, 2)
        if (citySlice !== '新竹') {
            if (citySlice !== '嘉義') {
                return city
            }
        }
        return null
    })
    // 鄉鎮城市2
    const cityTown2 = [...TaiwanCityTown_DB2]

    // 城市
    const [city, setCity] = useState('');
    // 鄉鎮
    const [towns, setTowns] = useState([]);

    //我選擇的鄉鎮
    const [myTowns, setMyTowns] = useState([])

    // console.log(myTowns)

    return (
        <div style={{ display: `${currentCount === 2 ? 'block' : 'none'}` }} className='initial-section-two'>
            <section className='alert-container'>
                <div className='alert-city-towns-wrapper'>
                    <h1>選擇您要的城市 & 鄉鎮</h1>
                    <div>
                        {towns.length === 0 && <AlertCity cityTown1={cityTown1} cityTown2={cityTown2} setTowns={setTowns} setCity={setCity} />}
                        {towns.length !== 0 && <AlertTowns towns={towns} city={city} setTowns={setTowns} setMyTowns={setMyTowns} myTowns={myTowns} />}
                    </div>
                </div>
                <div>
                    <h1>您選擇的鄉鎮</h1>
                    <div className='alert-local-town-name-wrapper'>
                        <MyAlertTown myTowns={myTowns} setMyTowns={setMyTowns} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default InitialTwo