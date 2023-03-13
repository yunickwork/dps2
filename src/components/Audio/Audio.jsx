import React, { useState, useRef } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import './Audio.scss'


import test from '../../audio/test.mp3'
import level3 from '../../audio/level3.mp3'
import level4 from '../../audio/level4.mp3'
import level5 from '../../audio/level5-.mp3'
import level5Plus from '../../audio/level5+.mp3'
import level6 from '../../audio/level6-.mp3'
import level6Plus from '../../audio/level6+.mp3'
import level7 from '../../audio/level7.mp3'



const Audio = () => {
    const [src, setSrc] = useState(test);
    const [filename, setFileName] = useState('選擇語音檔')
    const audioRef = useRef();

    const changeHandle = (mp3) => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setSrc(mp3)
    }

    return (
        <div className='audio-container'>
            <div className='audio-wrapper'>
                <p>測試地震預警語音播報器 : </p>
                <div className='audio-mp3-select-wrapper'>
                    <p>{filename} <IoIosArrowDown /></p>
                    <div className='audio-select-btns-wrapper'>
                        <button onClick={() => { changeHandle(test); setFileName('測試語音檔') }}>測試語音檔</button>
                        <button onClick={() => { changeHandle(level3); setFileName('3級地震語音檔') }}>3級地震語音檔</button>
                        <button onClick={() => { changeHandle(level4); setFileName('4級地震語音檔') }}>4級地震語音檔</button>
                        <button onClick={() => { changeHandle(level5); setFileName('5弱地震語音檔') }}>5弱地震語音檔</button>
                        <button onClick={() => { changeHandle(level5Plus); setFileName('5強地震語音檔') }}>5強地震語音檔</button>
                        <button onClick={() => { changeHandle(level6); setFileName('6弱地震語音檔') }}>6弱地震語音檔</button>
                        <button onClick={() => { changeHandle(level6Plus); setFileName('6強地震語音檔') }}>6強地震語音檔</button>
                        <button onClick={() => { changeHandle(level7); setFileName('7級地震語音檔') }}>7級地震語音檔</button>
                    </div>
                </div>
                <audio src={src} type='audio/mp3' controls ref={audioRef} />
            </div>
        </div >
    )
}

export default Audio
