import React, { useState, useEffect } from 'react'
import Loading from '../../../components/Loading/Loading';
import { useDomain } from '../../../components/DomainContext/DomainContext.jsx';

const EqReport = ({ appGrayColorMin, nowDate_ts, appCwbReport, appCwbPReport }) => {
    // Domain
    const { domain } = useDomain();

    // 氣象局地震報告
    const [report, setReport] = useState(null);
    const [pReport, setPRport] = useState(null);

    //監聽地震事件 HeartBeat
    useEffect(() => {
        //區域地震報告
        let getReport = setInterval(() => {
            //氣象局報告
            const reportHTTP = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify()
            };

            fetch(`http://${domain}:4000/data/Report`, reportHTTP)
                .then(response => response.json())
                .then(data => {
                    if (data.length === 0) {
                        setReport([
                            {
                                "id": "no_data",
                                "depth": "",
                                "mag": "",
                                "origintime": "2022-04-18 00:00:00",
                                "lon": "",
                                "lat": "",
                                "Rposition": "",
                                "xml": null
                            }
                        ])
                    } else {
                        setReport(data)
                    }
                });

            //氣象局速報
            const pReportHTTP = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify()
            };
            fetch(`http://${domain}:4000/data/PReport`, pReportHTTP)
                .then(response => response.json())
                .then(data => {
                    if (data.length === 0) {
                        setPRport([
                            {
                                "id": "no_data",
                                "depth": "",
                                "mag": "",
                                "origintime": "2022-04-18 00:00:00",
                                "lon": "0",
                                "lat": "0",
                                "xml": null
                            }
                        ])
                    } else {
                        setPRport(data)
                    }
                });

        }, 10000)

        return () => clearInterval(getReport)
    }, [domain]);


    // 氣象局報告為null折返回
    if (report === null) setReport([...appCwbReport])
    if (pReport === null) setPRport([...appCwbPReport])
    if (report === null) return <Loading height={23} />
    if (pReport === null) return <Loading height={23} />

    //氣象局報告
    let reportOriginDate = report[0].origintime.slice(0, 10)
    let reportOriginTime = report[0].origintime.slice(11, 22).replace(/\s*/g, "");
    let reportOriginTimeStr = `${reportOriginDate} ${reportOriginTime}`
    //轉數字
    let reportDate = new Date(reportOriginTimeStr)
    let report_ts = reportDate.getTime();

    //氣象局速報
    let pReportOriginDate = pReport[0].origintime.slice(0, 10)
    let pReportOriginTime = pReport[0].origintime.slice(11, 22).replace(/\s*/g, "");
    let pReportOriginTimeStr = `${pReportOriginDate} ${pReportOriginTime}`
    //轉數字
    let pReportDate = new Date(pReportOriginTimeStr)
    let pReport_ts = pReportDate.getTime() - 60000;

    //增加一個小時
    let reportPlus_ts = report_ts + 1 * 1000 * 60 * appGrayColorMin;
    let pReportPlus_ts = pReport_ts + 1 * 1000 * 60 * appGrayColorMin;

    return (
        <div className='home-eq-event'>
            <div
                className='home-eq-event-richter-scale'
                style={{
                    backgroundColor: `${report_ts >= pReport_ts ? nowDate_ts > reportPlus_ts ? '' : 'rgb(245, 37, 37)' : nowDate_ts >= pReportPlus_ts ? '' : 'rgb(245, 37, 37)'}`,
                    color: `${report_ts >= pReport_ts ? nowDate_ts >= reportPlus_ts ? '' : 'white' : nowDate_ts >= pReportPlus_ts ? '' : 'white'}`
                }}
            >
                <h3> {reportOriginTimeStr === '2022-04-18 00:00:00' ? '目前無資料' : '芮氏規模'}</h3>

                <h3>{report_ts >= pReport_ts ? report[0].mag : pReport[0].mag}</h3>
            </div>
            <div className='home-eq-event-detail'>
                <p>地震編號 : {report_ts >= pReport_ts ? `${report[0].id === 'no_data' ? '' : report[0].id}` : `${pReport[0].id}`}</p>
                <p>地震時間 : {report_ts >= pReport_ts ? `${reportOriginTimeStr === '2022-04-18 00:00:00' ? '' : reportOriginTimeStr}` : pReportOriginTimeStr}</p>
                <p>地震深度 : {report_ts >= pReport_ts ? report[0].depth : pReport[0].depth}</p>
                <p>地震位置 : {report_ts >= pReport_ts ? report[0].Rposition : `北緯 (${pReport[0].lat}) , 東經 : (${pReport[0].lon})`}</p>
            </div>
        </div>
    )
}

export default EqReport