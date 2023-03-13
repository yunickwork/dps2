import React, { useState, useEffect } from 'react'
import './DpsMqtt.scss'

const DpsMqtt = ({ appMqtt, appMqttMin }) => {

    // MQTT 狀態
    const [mqtt, setMqtt] = useState(undefined)

    // 監聽 MQTT 狀態
    useEffect(() => {
        // Min 分鐘
        let min = 1 * 1000 * 60 * appMqttMin

        let getMqttState = setInterval(() => {
            fetch(`http://10.100.105.103:4000/logs/connect`, { method: "GET" })
                .then(res => res.json())
                .then(data => {
                    setMqtt(data[0].state)
                })
                .catch(e => {
                    console.log(e);
                })
        }, min)

        return () => clearInterval(getMqttState)
    }, [appMqttMin])

    if (mqtt === undefined) setMqtt(appMqtt[0].state)

    return (
        <div className='home-mqtt'>
            <p>複合式平台連線狀況</p>
            <div className='home-mqtt-circle' style={{ backgroundColor: `${mqtt === 'connected' ? 'greenyellow' : 'rgb(255, 28, 85)'}` }} />
        </div>
    )
}

export default DpsMqtt