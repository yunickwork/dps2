import React, { useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './Map.scss'
// TownMapDB
import TaiwanTownMap from '../../db/TaiwanTownMap.json'
// Map EQ Color 
import MapEqColor from './MapEqColor/MapEqColor.jsx'

const Map = ({ listenCity, zoom, center, townArray, nowDate_ts, eqEvtDate_ts }) => {
    // 在 Map 滑鼠選擇的鄉鎮
    const [selectTown, setSelectTown] = useState("")

    // 篩選地區的顯示畫面
    const filterCity = TaiwanTownMap.features.filter((city) => {
        if (listenCity === '10004') {
            return city.properties.COUNTYNAME.slice(0, 2) === '新竹'
        } else if (listenCity === '10010') {
            return city.properties.COUNTYNAME.slice(0, 2) === '嘉義'
        } else {
            return city.properties.COUNTYCODE === listenCity
        }
    })

    // console.log(townArray)

    const selectHandler = (e => {
        const townName = e.target.feature.properties.TOWNNAME;
        setSelectTown(townName)
    })

    const resetHandler = (e => {
        setSelectTown('')
    })

    const onEachFeature = (feature, layer) => {
        layer.on({
            mouseover: selectHandler,
            mouseout: resetHandler,
        });
    }

    filterCity.map((city) => {
        townArray.map((town) => {
            if (city.properties.TOWNCODE === town.id) {
                city.properties.PGA = town.inx
            }
            return null
        })
        return null
    })

    let filterCityTown = filterCity.filter((town) => town.properties.PGA !== undefined)

    const eqColor = (d => {
        return nowDate_ts > eqEvtDate_ts && d > 0 ? 'rgb(119, 119, 119)' :
            d >= 7.0 ? 'rgb(163, 10, 194)' :
                d >= 6.5 ? 'rgb(130, 76, 139)' :
                    d >= 6.0 ? 'rgb(94, 65, 60)' :
                        d >= 5.5 ? 'rgb(184, 65, 10)' :
                            d >= 5.0 ? 'rgb(255, 81, 0)' :
                                d >= 4 ? 'rgb(255, 166, 0)' :
                                    d >= 3 ? 'rgb(248, 252, 26)' :
                                        d >= 2 ? 'rgb(105, 248, 62)' :
                                            d >= 1 ? 'rgb(216, 255, 194)' : 'rgba(255, 255, 255, 0.7)'

    })

    const mapStyle = (feature) => {
        return ({
            fillColor: eqColor(feature.properties.PGA),
            weight: 1.5,
            color: '#555',
            dashArray: 2,
            opacity: 1,
            fillOpacity: .8
        })
    }
    return (
        <div className='map'>
            <div className='map-select-town'>{selectTown}</div>
            <MapContainer
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    borderRadius: '5px'
                }}
                zoom={zoom} center={center}
            >
                <GeoJSON data={filterCityTown} style={mapStyle} onEachFeature={onEachFeature} />
                <TileLayer
                    url='https://api.maptiler.com/maps/voyager-v2/{z}/{x}/{y}.png?key=EfoRp6Ksst0beuEWLEMt'
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>'
                />
            </MapContainer>
            <MapEqColor />
        </div>
    )
}

export default Map