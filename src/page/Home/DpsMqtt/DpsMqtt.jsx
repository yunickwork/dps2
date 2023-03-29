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
                    if (data.length === 0) {
                        setMqtt('no_data')
                    } else if (data.length !== 0) {
                        setMqtt(data[0].state)
                    }

                })
                .catch(e => {
                    console.log(e);
                })
        }, min)

        return () => clearInterval(getMqttState)
    }, [appMqttMin])

    if (mqtt === undefined) {
        if (appMqtt.length === 0) {
            setMqtt('no_data')
        } else if (appMqtt.length !== 0) {
            setMqtt(appMqtt[0].state)
        }
    }

    return (
        <div className='home-mqtt'>
            <p>複合式平台連線狀況</p>
            <p>({mqtt === 'connected' ? '連線中' : mqtt === 'disconnected' ? '斷線中' : mqtt === 'connecting' ? '連接中' : 'no_data'})</p>
            <div className='home-mqtt-circle' style={{ backgroundColor: `${mqtt === 'connected' ? 'greenyellow' : mqtt === 'disconnected' ? 'rgb(255, 28, 85)' : mqtt === 'connecting' ? 'rgb(255, 247, 0)' : 'rgb(133, 133, 133)'}` }} />
        </div>
    )
}

export default DpsMqtt