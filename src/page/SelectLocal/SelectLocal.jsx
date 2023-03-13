import React, { useState } from 'react'
import './SelectLocal.scss'
import { TaiwanCityTown_DB1 } from '../../db/TaiwanCityTownDB/TaiwanCityTown_DB1'
import { TaiwanCityTown_DB2 } from '../../db/TaiwanCityTownDB/TaiwanCityTown_DB2';
import SelectTown from './SelectTown/SelectTown.jsx';
import SelectCity from './SelectCity/SelectCity.jsx';

const SelectLocal = () => {
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

    //鄉鎮城市2
    const cityTown2 = [...TaiwanCityTown_DB2]
    // 目標地區
    const [local, setLocal] = useState('臺北市');
    // 目標鄉鎮
    const [towns, setTowns] = useState(cityTown1[0].towns);

    return (
        <section className='select-local-container'>
            <div className='select-local-city-wrapper'>
                <h1>選擇您要的城市</h1>
                <div className='select-local-city-name-wrapper'>
                    <SelectCity cityTown1={cityTown1} cityTown2={cityTown2} setTowns={setTowns} local={local} setLocal={setLocal} />
                </div>
            </div>

            <div className='select-local-town-wrapper'>
                <h1>選擇您要的鄉鎮</h1>
                <div className='select-local-town-name-wrapper'>
                    <SelectTown towns={towns} />
                </div>
            </div>
        </section>
    )
}

export default SelectLocal