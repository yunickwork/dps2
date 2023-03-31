import React, { useState } from 'react'
import './Test.scss'
import { useDomain } from '../../components/DomainContext/DomainContext';
import NativeSelect from '@mui/material/NativeSelect';

const Test = () => {
    // Domain
    const { domain } = useDomain();
    // Do 設定
    const [DO0, setDO0] = useState(0)
    const [DO1, setDO1] = useState(0)
    const [DO2, setDO2] = useState(0)
    const [DO3, setDO3] = useState(0)
    const [DO4, setDO4] = useState(0)
    const [DO5, setDO5] = useState(0)

    const playAudioTestHandle = (e) => {
        e.preventDefault();
        // 傳送語音檔
        const postAudioHttp = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ DO0: DO0, DO1: DO1, DO2: DO2, DO3: DO3, DO4: DO4, DO5: DO5 })
        }
        fetch(`http://${domain}:4000/test/audio/play`, postAudioHttp)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

    const DOTestHandle = (e) => {
        e.preventDefault();
        // 傳送語音檔
        const postDoHttp = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ DO0: DO0, DO1: DO1, DO2: DO2, DO3: DO3, DO4: DO4, DO5: DO5 })
        }
        fetch(`http://${domain}:4000/test/DO`, postDoHttp)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

    return (
        <div className='test-container'>
            <section className='test-wrapper'>
                <div className='test-audio-wrapper'>
                    <h2>機器語音播報廣播測試</h2>
                    <div>
                        <p>測試語音檔.mp3</p>
                        <button onClick={(e) => playAudioTestHandle(e)}>播放</button>
                    </div>
                </div>
                <div className='test-do-wrapper'>
                    <h2>Do測試</h2>
                    <form onSubmit={(e) => DOTestHandle(e)}>
                        <div>
                            <p>Do0</p>
                            <NativeSelect
                                style={{ textAlign: 'center', padding: '0px 10px' }}
                                value={DO0}
                                onChange={(e) => setDO0(e.target.value)}
                            >
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                            </NativeSelect>
                        </div>
                        <div>
                            <p>Do1</p>
                            <NativeSelect
                                style={{ textAlign: 'center', padding: '0px 10px' }}
                                value={DO1}
                                onChange={(e) => setDO1(e.target.value)}
                            >
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                            </NativeSelect>
                        </div>
                        <div>
                            <p>Do2</p>
                            <NativeSelect
                                style={{ textAlign: 'center', padding: '0px 10px' }}
                                value={DO2}
                                onChange={(e) => setDO2(e.target.value)}
                            >
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                            </NativeSelect>
                        </div>
                        <div>
                            <p>Do3</p>
                            <NativeSelect
                                style={{ textAlign: 'center', padding: '0px 10px' }}
                                value={DO3}
                                onChange={(e) => setDO3(e.target.value)}
                            >
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                            </NativeSelect>
                        </div>
                        <div>
                            <p>Do4</p>
                            <NativeSelect
                                style={{ textAlign: 'center', padding: '0px 10px' }}
                                value={DO4}
                                onChange={(e) => setDO4(e.target.value)}
                            >
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                            </NativeSelect>
                        </div>
                        <div>
                            <p>Do5</p>
                            <NativeSelect
                                style={{ textAlign: 'center', padding: '0px 10px' }}
                                value={DO5}
                                onChange={(e) => setDO5(e.target.value)}
                            >
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                            </NativeSelect>
                        </div>
                        <button>發送</button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Test