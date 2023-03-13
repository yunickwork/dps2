import React, { useState } from 'react'
import { Manager_DB } from '../../../db/SideNavDB/Manager_DB.js'
//React Icon
import { AiOutlineHome, AiFillCaretDown } from "react-icons/ai";
import { BiMapPin, BiUser } from "react-icons/bi";
import { BsFileEarmarkText, BsFillGearFill } from "react-icons/bs";
import { FaExchangeAlt } from "react-icons/fa";
import { TbWaveSawTool } from "react-icons/tb";
import { HiOutlineInformationCircle } from "react-icons/hi";

import { Link } from 'react-router-dom';

const ManagerView = () => {
    const [sideNavDB, setSideNavDB] = useState([...Manager_DB])
    return (
        <ul className='sidenav-ul'>
            {sideNavDB.map((item, index) => (
                <li className='sidenav-li' key={index}>
                    <div
                        className='sidenav-li-link'
                        onClick={() => {
                            if (item.pages !== null) {
                                item.switch = !item.switch
                            }
                            setSideNavDB([...sideNavDB])
                        }}
                    >
                        <Link
                            to={item.pages !== null ? `/#` : `${item.id}`}
                            onClick={(e) => item.pages !== null && e.preventDefault()}
                        >
                            {item.id === '/' && <AiOutlineHome />}
                            {item.id === 'SelectLocal' && <BiMapPin />}
                            {item.id === 'Adam' && <FaExchangeAlt />}
                            {item.id === 'Log' && <BsFileEarmarkText />}
                            {item.id === 'Simulation' && <TbWaveSawTool />}
                            {item.id === 'UserManagement' && <BiUser />}
                            {item.id === 'System' && <BsFillGearFill />}
                            {item.id === 'About' && <HiOutlineInformationCircle />}
                            {item.name}
                        </Link>
                        {item.pages !== null && <i><AiFillCaretDown /></i>}
                    </div>
                    {
                        item.pages !== null &&
                        <ul className={item.switch === false ? 'sidenav-none' : 'sidenav-ul-page'}>
                            {item.pages.map((detailItem, index) => (
                                <li key={index} className="sidenav-li-page">
                                    <Link to={detailItem.id}>{detailItem.name}</Link>
                                </li>
                            ))}
                        </ul>
                    }
                </li>
            ))}
        </ul>
    )
}

export default ManagerView