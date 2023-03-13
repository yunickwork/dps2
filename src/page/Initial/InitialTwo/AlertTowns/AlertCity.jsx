import React from 'react'
const AlertCity = ({ cityTown1, cityTown2, setCity, setTowns }) => {

    // 北部
    const north = cityTown1.filter(item => item.location === '北部')
    const hsinchu = cityTown2.filter(item => item.id === '新竹')
    const hsinchuTown = [].concat(hsinchu[0].range[0].towns, hsinchu[0].range[1].towns)

    // 中部
    const wast = cityTown1.filter(item => item.location === '中部')

    // 南部
    const south = cityTown1.filter(item => item.location === '南部')
    const chiayi = cityTown2.filter(item => item.id === '嘉義')
    const chiayiTown = [].concat(chiayi[0].range[0].towns, chiayi[0].range[1].towns)

    // 東部
    const east = cityTown1.filter(item => item.location === '東部')

    // 離島
    const islands = cityTown1.filter(item => item.location === '離島')

    return (
        <div className='alert-city-container'>
            <div className='alert-city-name'>
                <h2>北部</h2>
                <div>
                    {north.map((item, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.preventDefault();
                                setCity(item.city);
                                setTowns(item.towns);
                                console.log(item.city)
                            }}
                        >
                            {item.city}
                        </button>
                    ))}
                    {hsinchu.map((item, index) => (
                        <button
                            key={index}
                            onClick={(e) => { e.preventDefault(); setCity('新竹'); setTowns(hsinchuTown) }}
                        >
                            {item.id}/縣市
                        </button>
                    ))}
                </div>
            </div>
            <div className='alert-city-name'>
                <h2>中部</h2>
                <div>
                    {wast.map((item, index) => (
                        <button
                            key={index}
                            onClick={(e) => { e.preventDefault(); setCity(item.city); setTowns(item.towns) }}
                        >
                            {item.city}
                        </button>
                    ))}
                </div>
            </div>
            <div className='alert-city-name'>
                <h2>南部</h2>
                <div>
                    {south.map((item, index) => (
                        <button
                            key={index}
                            onClick={(e) => { e.preventDefault(); setCity(item.city); setTowns(item.towns) }}
                        >
                            {item.city}
                        </button>
                    ))}
                    {chiayi.map((item, index) => (
                        <button
                            key={index}
                            onClick={(e) => { e.preventDefault(); setCity('嘉義'); setTowns(chiayiTown) }}
                        >
                            {item.id}/縣市
                        </button>
                    ))}
                </div>

            </div>
            <div className='alert-city-name'>
                <h2>東部</h2>
                <div>
                    {east.map((item, index) => (
                        <button
                            key={index}
                            onClick={(e) => { e.preventDefault(); setCity(item.city); setTowns(item.towns) }}
                        >
                            {item.city}
                        </button>
                    ))}
                </div>

            </div>
            <div className='alert-city-name'>
                <h2>離島</h2>
                <div>
                    {islands.map((item, index) => (
                        <button
                            key={index}
                            onClick={(e) => { e.preventDefault(); setCity(item.city); setTowns(item.towns) }}
                        >
                            {item.city}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AlertCity