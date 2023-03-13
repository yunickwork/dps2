import React from 'react'
import './About.scss'

const About = () => {
    return (
        <div className='about-container'>
            <h2 className='about-title'>關於系統</h2>
            <div className='about-wrapper'>
                <div>
                    <h3>機器ID</h3>
                    <p>c4:00:ad:01:88:04</p>
                </div>
                <div>
                    <h3>版本</h3>
                    <p>v1.0.0</p>
                </div>
                <div>
                    <h3>機器出廠時間</h3>
                    <p>2022-10-01 13:30:00</p>
                </div>
                <div>
                    <h3>簽約學校 or 廠商</h3>
                    <p>中保防災科技</p>
                </div>
                <div>
                    <h3>合約到期日</h3>
                    <p>2024-01-01 13:30:00</p>
                </div>
            </div>
        </div>
    )
}

export default About