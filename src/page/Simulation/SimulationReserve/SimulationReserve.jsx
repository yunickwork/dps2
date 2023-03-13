import React, { useState, useEffect } from 'react';

import './SimulationReserve.scss'
import IconButton from '@mui/material/IconButton';
import { MdDelete } from "react-icons/md";
import Loading from "../../../components/Loading/Loading.jsx";

const SimulationReserve = () => {
    //Simulation 訊息
    const [DB, setDB] = useState(null)
    // 現在時間
    const nowTime = new Date().getTime()

    useEffect(() => {
        let getDate = setInterval(() => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify()
            };
            fetch(`http://10.100.105.103:4000/get/simulation/delay`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setDB([...data])
                });
        }, 1000)

        return () => clearInterval(getDate)
    }, [])

    if (DB === null) return <Loading height={30} />

    let reserveType = DB.filter(item => item.type === 'Delay')
    let reserveTimeFilter = reserveType.filter(item => {
        const reserveTime = new Date(item.settime).getTime()
        return reserveTime > nowTime
    })

    let reserverSort = reserveTimeFilter.sort((a, b) => {
        let aTime = new Date(a.settime).getTime()
        let bTime = new Date(b.settime).getTime()
        return aTime - bTime
    })

    //刪除預約
    const deleteHandler = (id) => {
        const deleteUser = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: `${id}` })
        }

        fetch(`http://10.100.105.103:4000/log/simulation/delect`, deleteUser)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

    return (
        <div className='simulation-reserve-container'>
            <div className='simulation-reserve-header'>
                <h3>目前預約排程</h3>
                <h3>預約數量: {reserveTimeFilter.length}</h3>
            </div>
            <div className='simulation-reserve-wrap'>
                <div className='simulation-reserve-title-wrap'>
                    <h3>排序</h3>
                    <h3>預約使用者</h3>
                    <h3>預約時間</h3>
                    <h3>設定震度</h3>
                    <h3>設定持續時間</h3>
                    <h3>刪除</h3>
                </div>
                <div className='simulation-reserve-list-wrap'>
                    {reserverSort.map((item, index) => (
                        <div key={index}>
                            <p>{index + 1}</p>
                            <p style={{ marginRight: '15px' }}>{item.user}</p>
                            <p>{item.settime}</p>
                            <p>{item.mag}</p>
                            <p>{item.finish}</p>
                            <div>
                                <IconButton
                                    size="large"
                                    onClick={() => deleteHandler(item.ID)}
                                >
                                    <MdDelete />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>
                {reserverSort.length === 0 &&
                    <div className='simulation-reserve-none'>
                        <h3>目前無預約模擬地震</h3>
                    </div>
                }
            </div>
        </div>
    )
}

export default SimulationReserve