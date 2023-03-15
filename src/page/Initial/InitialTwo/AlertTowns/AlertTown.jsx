import React from 'react'
import { BsArrowLeft } from "react-icons/bs";

const AlertTown = ({ towns, city, setTowns, myTowns, setMyTowns }) => {
    const townsHandle = (id, town, city) => {
        const isDuplicate = myTowns.some(t => t.id === id);
        if (isDuplicate) {
            // 如果已存在就刪除
            setMyTowns(prevTowns => prevTowns.filter(t => t.id !== id));
        } else {
            // 如果不存在就加入
            setMyTowns(prevTowns => [...prevTowns, { id, town, city }]);
        }
    }

    return (
        <div className='alert-town-container' >
            <button onClick={(e) => { e.preventDefault(); setTowns([]) }} className='alert-town-back-btns'><BsArrowLeft />返回</button>
            <div className='alert-town-btns-wrapper'>
                {towns.map((town) => (
                    <button
                        style={{ backgroundColor: `${myTowns.some(t => t.id === town.id) ? 'rgb(255, 208, 0)' : 'rgb(231, 231, 231)'}`, '&:hover': { backgroundColor: 'rgb(211, 211, 211)' } }}
                        onClick={(e) => { e.preventDefault(); townsHandle(town.id, town.name, city) }}
                        className="alert-town-btn" key={town.id}
                    >
                        {city}-{town.name}
                    </button>
                ))}
            </div>
        </div >
    )
}

export default AlertTown