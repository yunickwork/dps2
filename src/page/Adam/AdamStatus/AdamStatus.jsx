import React, { useState, useEffect } from 'react'
import Loading from '../../../components/Loading/Loading'

const AdamStatus = () => {
    // Get 資料
    let [type, setType] = useState(null)
    let [eq_Level, setEQ_Level] = useState(null)
    let [ms, setMS] = useState(null)

    useEffect(() => {
        // 抓取EQ_Level
        const getEQ_Level = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        }

        fetch(`http://10.100.105.103:4000/settings/Adam/EQ_Level`, getEQ_Level)
            .then(response => response.json())
            .then(data => setEQ_Level([...data]))
            .catch(err => console.log(err))

        // // 抓取
        const getType = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        }

        fetch(`http://10.100.105.103:4000/settings/Adam/Type`, getType)
            .then(response => response.json())
            .then(data => setType([...data]))
            .catch(err => console.log(err))

        // // 抓取MS
        const getMS = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        }

        fetch(`http://10.100.105.103:4000/settings/Adam/MS`, getMS)
            .then(response => response.json())
            .then(data => setMS([...data]))
            .catch(err => console.log(err))
    }, [])

    if (type === null) return <Loading height={50} />
    if (eq_Level === null) return <Loading height={50} />
    if (ms === null) return <Loading height={50} />

    let typeSort = type.sort((a, b) => Number(a.DOx.slice(2, 3)) - Number(b.DOx.slice(2, 3)))
    let eq_LevelSort = eq_Level.sort((a, b) => Number(a.DOx.slice(2, 3)) - Number(b.DOx.slice(2, 3)))
    let msSort = ms.sort((a, b) => Number(a.DOx.slice(2, 3)) - Number(b.DOx.slice(2, 3)))


    return (
        <div className="adam-status-container">
            <div className="adam-status-wrapper">
                <div className='adam-status-title'>
                    <h3>名稱</h3>
                    <h3>開關</h3>
                    <h3>觸發地震級數</h3>
                    <h3>觸發時間</h3>
                </div>
                <div className='adam-status-setting-status-wrapper'>
                    <div>
                        {typeSort.map((item, index) => (
                            <h3 key={index}>{item.DOx}</h3>
                        ))}
                    </div>
                    <div>
                        {typeSort.map((item, index) => (
                            <h3 key={index}><span></span>{item.Mode === 'Finish' ? 'ON' : 'Pulse'}</h3>
                        ))}
                    </div>
                    <div>
                        {eq_LevelSort.map((item, index) => (
                            <h3 key={index}>{item.Inx}</h3>
                        ))}
                    </div>
                    <div>
                        {msSort.map((item, index) => (
                            <h3 key={index}>
                                {item.timeout_ms === 0 ? '_' : `${item.timeout_ms === 1000 ? '1' : item.timeout_ms === 3000 ? '3' : item.timeout_ms === 5000 && '5'}`}
                            </h3>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AdamStatus