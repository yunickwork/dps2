import React, { useState, useEffect } from 'react';
import './SimulationReserve.scss';
import IconButton from '@mui/material/IconButton';
import { MdDelete } from "react-icons/md";
import Loading from "../../../components/Loading/Loading.jsx";
//domain
import { useDomain } from '../../../components/DomainContext/DomainContext';

const SimulationReserve = () => {
    // Domain
    const { domain } = useDomain();
    const [DB, setDB] = useState(null);
    const nowTime = new Date().getTime();
    const DELETE_API_URL = `http://${domain}:4000/log/simulation/delect`;

    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify()
            };
            const response = await fetch(`http://${domain}:4000/get/simulation/delay`, requestOptions);
            const data = await response.json();
            setDB(data);
        };
        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
    }, [domain]);

    if (!DB) return <Loading height={30} />;

    const reserveType = DB?.filter(item => item.type === 'Delay');
    const reserveTimeFilter = reserveType?.filter(item => {
        const reserveTime = new Date(item.settime).getTime();
        return reserveTime > nowTime;
    });
    const reserverSort = Array.from(reserveTimeFilter || []).sort((a, b) => {
        const aTime = new Date(a.settime).getTime();
        const bTime = new Date(b.settime).getTime();
        return aTime - bTime;
    });

    const deleteHandler = async (id) => {
        const deleteUser = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: `${id}` })
        };
        try {
            const response = await fetch(DELETE_API_URL, deleteUser);
            const data = await response.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

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