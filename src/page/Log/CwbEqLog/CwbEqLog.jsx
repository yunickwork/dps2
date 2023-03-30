import React, { useState, useRef, useEffect } from 'react'
// React PDF
import { useReactToPrint } from 'react-to-print';
// React Icon
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
// MUI
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

// Style 
import './CwbEqLog.scss'
import '../Log.scss'

// List Page
import CwbEqLogList from './CwbEqLogList';

// Loading Page
import Loading from '../../../components/Loading/Loading'

import { useDomain } from '../../../components/DomainContext/DomainContext';


const CwbEqLog = () => {
    // Domain
    const { domain } = useDomain();

    // Log資料
    const [logDB, setLogDB] = useState(null)

    // 篩選年月
    const [year, setYear] = useState(new Date().getFullYear())
    const [selectMonth, setSelectMonth] = React.useState('');

    // false 氣象局報告 true 氣象局速報
    const [selectReport, setSelectReport] = useState(false);

    // 列印 PDF
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data',
        onAfterPrint: () => console.log('Print Success')
    })

    // 讀取資料
    useEffect(() => {
        // 氣象局報告
        const reportHTTP = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ year: new Date().getFullYear(), month: '' })
        };

        fetch(`http://${domain}:4000/datas/Report_data/Log`, reportHTTP)
            .then(response => response.json())
            .then(data => setLogDB(data));

    }, [domain])


    // 預設頁數
    const [page, setPage] = React.useState(0);
    // 資料筆數範圍
    const [rowsPerPage, setRowsPerPage] = React.useState(100);
    // 換頁數
    const handleChangePage = (event, newPage) => { setPage(newPage) };
    // 換顯示數
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // 如果讀取資料出現 null 就 Loading
    if (logDB === null) return <Loading height={95} />

    // 選取頁數比筆數範圍內的資料
    let defaultPage = page + 1
    let rangePerPage = rowsPerPage * defaultPage
    let rangePageLogDB = logDB.slice(rowsPerPage * page, rangePerPage)

    // 篩選年份 
    let prevYearBtn = (e) => {
        e.preventDefault()
        setYear(year - 1)
        // Log API
        const logHTTP = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ year: year - 1, month: selectMonth })
        };

        fetch(`http://${domain}:4000/${selectReport === false ? 'datas/Report_data/Log' : 'datas/PReport_data/Log'}`, logHTTP)
            .then(response => response.json())
            .then(data => setLogDB(data))
            .catch(err => console.log(err))
    }

    let nextYearBtn = (e) => {
        e.preventDefault()
        setYear(year + 1)
        // Log API
        const logHTTP = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ year: year + 1, month: selectMonth })
        };

        fetch(`http://${domain}:4000/${selectReport === false ? 'datas/Report_data/Log' : 'datas/PReport_data/Log'}`, logHTTP)
            .then(response => response.json())
            .then(data => setLogDB(data))
            .catch(err => console.log(err))
    }

    // 資料更改為月份資料
    const handleChangeMonth = (event) => {
        setSelectMonth(event.target.value);
        // Log API
        const logHTTP = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ year: year, month: event.target.value })
        };

        fetch(`http://${domain}:4000/${selectReport === false ? 'datas/Report_data/Log' : 'datas/PReport_data/Log'}`, logHTTP)
            .then(response => response.json())
            .then(data => setLogDB(data))
            .catch(err => console.log(err))
    };

    //更改為氣象局速報
    const handleChangeReport = (changeReport) => {
        setSelectReport(changeReport === 'Report_data' ? false : true);
        let path = changeReport === 'Report_data' ? 'datas/Report_data/Log' : 'datas/PReport_data/Log'
        const logHTTP = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ year: year, month: selectMonth })
        };
        fetch(`http://${domain}:4000/${path}`, logHTTP)
            .then(response => response.json())
            .then(data => setLogDB([...data]))
            .catch(err => console.log(err))

    }

    return (
        <div className='cwb-eq-log-container'>
            <TablePagination
                component="div"
                count={logDB.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <div className='log-operation-container'>
                <div className='log-operation-wrapper'>
                    <form className='log-year-form-wrapper'>
                        <label >選擇年份</label>
                        <div>
                            <IconButton
                                onClick={(e) => prevYearBtn(e)}
                                size="large"
                                disabled={year <= 2022 ? true : false}
                            >
                                <AiFillCaretLeft />
                            </IconButton>
                            <p>{year}</p>
                            <IconButton
                                onClick={(e) => nextYearBtn(e)}
                                size="large"
                                disabled={year >= new Date().getFullYear() ? true : false}
                            >
                                <AiFillCaretRight />
                            </IconButton>
                        </div>
                    </form>
                    <div className='log-change-month-wrapper'>
                        <p>選擇月份</p>
                        <FormControl fullWidth>
                            <NativeSelect
                                value={selectMonth}
                                label="Month"
                                onChange={handleChangeMonth}
                            >
                                <option value={''}>全部</option>
                                <option value={'01'}>一月</option>
                                <option value={'02'}>二月</option>
                                <option value={'03'}>三月</option>
                                <option value={'04'}>四月</option>
                                <option value={'05'}>五月</option>
                                <option value={'06'}>六月</option>
                                <option value={'07'}>七月</option>
                                <option value={'08'}>八月</option>
                                <option value={'09'}>九月</option>
                                <option value={'10'}>十月</option>
                                <option value={'11'}>十一月</option>
                                <option value={'12'}>十二月</option>
                            </NativeSelect>
                        </FormControl>
                    </div>
                    <div className='cwb-eq-log-wrapper'>
                        <p>選擇氣象局報告</p>

                        <div className='cwb-select-eq-report-log-btns-wrapper'>
                            <button style={{
                                backgroundColor: `${selectReport === false ? 'rgb(54, 108, 139)' : 'rgb(206, 206, 206)'}`,
                            }} onClick={() => handleChangeReport('Report_data')}>氣象局報告</button>
                            <button style={{
                                backgroundColor: `${selectReport === true ? 'rgb(54, 108, 139)' : 'rgb(206, 206, 206)'}`
                            }} onClick={() => handleChangeReport('PReport_data')}>氣象局速報</button>
                        </div>
                    </div>
                </div>
                <div>
                    <button className='log-pdf-btn' onClick={handlePrint}>列印 PDF</button>
                </div>
            </div>
            <div ref={componentRef}>
                <h1 className='log-title'>{selectReport === false ? '氣象局地震報告' : '氣象局地震速報'}</h1>
                <CwbEqLogList rangePageLogDB={rangePageLogDB} rowsPerPage={rowsPerPage} page={page} logDBLength={logDB.length} selectReport={selectReport} />
            </div>
        </div >
    )
}

export default CwbEqLog