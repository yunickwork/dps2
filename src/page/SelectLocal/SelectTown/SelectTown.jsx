import React, { useState } from 'react'
import Checkbox from '@mui/material/Checkbox';

const SelectTown = ({ towns }) => {
    const [loading, setLoading] = useState(false)

    const submitHandle = (e) => {
        e.preventDefault()
        //複製選取鄉鎮
        const townsDB = [...towns]
        //表單傳送鄉鎮
        const submitDB = []
        //篩選沒取消鄉鎮
        const subscribeTowns = townsDB.filter((item) => item.subscribe !== false)
        //傳送至 submitDB
        subscribeTowns.map((item) => submitDB.push({ town: `${item.id}` }))

        //確定要送出嗎?
        if (window.confirm('確定要送出嗎?')) {
            setLoading(true)
        } else {
            return
        }

        if (submitDB.length === 0) return alert('請重新傳送')

        //傳送api
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ area_code: JSON.stringify(submitDB) })
        };

        fetch(`http://10.100.105.103:4000/settings/Listen_towns`, requestOptions)
            .then(response => response.json())
            .then(data => console.log('傳送成功'))
            .catch(err => console.log(err))

        if (submitDB.length > 0) setTimeout((() => window.location.href = '/'), 500);
    }

    if (loading === true) return <p>傳送中...</p>

    // 判斷哪個鄉鎮取消勾選
    const onChangeInput = (item) => {
        item.subscribe = !item.subscribe
    }

    return (
        <div>
            <form onSubmit={submitHandle} className='select-town-form'>
                <div className='select-town-wrapper'>
                    {towns.map((item, index) => (
                        <label key={item.id}>
                            <Checkbox
                                type="checkbox"
                                defaultChecked={item.subscribe}
                                onClick={() => onChangeInput(item)}
                                value={item.name}
                            />
                            <p key={index}>{item.name}</p>
                        </label>
                    ))}
                </div>
                <div className='select-town-submit-wrapper'>
                    <button
                        type='submit'
                    >
                        送出表單
                    </button>
                </div>
            </form >
        </div >
    )
}

export default SelectTown