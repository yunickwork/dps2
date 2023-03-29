import React, { useState } from 'react'
import './Restore.scss'
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { MdOutlineClose } from "react-icons/md";
import Loading from '../../../components/Loading/Loading.jsx'

const Restore = ({ setRestorePage, restorePage }) => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [radioValue, setRadioValue] = useState('option-1');
    const myAuthority = localStorage.getItem('myAuthority');
    const [loading, setLoading] = useState(false);

    const handleRadioChange = (e) => {
        setRadioValue(e.target.value);
        if (e.target.value === 'option-2') {
            setChecked1(true);
            setChecked2(true);
        }
    };

    const handleCheckboxChange = (e, setChecked) => {
        if (radioValue !== 'option-2') {
            setChecked(e.target.checked);
        }
    };

    const submitHandle2 = (e) => {
        e.preventDefault();
        // 詢問
        const isConfirmed = window.confirm(`您確定要送出嗎？ ${checked1 === true ? '*清空地震資料' : ''} ${checked2 === true ? '*清空系統Log' : ''}`);
        if (!isConfirmed) {
            return;
        }

        // 發送
        const resetHttp = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eqLogReset: checked1, systemLogReset: checked2, modReset: radioValue, authority: myAuthority })
        };

        // 啟動 loading 畫面
        setLoading(true);

        fetch(`http://10.100.105.103:4000/system/reset`, resetHttp)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // 關閉 loading 畫面並跳轉至首頁
                setTimeout(() => {
                    setLoading(false);
                    window.location.href = '/';
                }, 15000); // 15 秒後執行
            })
            .catch(err => {
                console.log(err);
                // 若有錯誤，關閉 loading 畫面
                setLoading(false);
            });
    }



    return (
        <div style={{ display: `${restorePage === false ? 'none' : 'flex'}` }} className='restore-container'>
            <button onClick={() => setRestorePage(false)} className='restore-container-close-btn'><MdOutlineClose /></button>
            <div className='restore-wrapper-bg' onClick={() => setRestorePage(false)}></div>
            <div className='restore-wrapper'>
                <h2>系統還原選項</h2>
                {loading === true ? <Loading height={50} /> : null}
                <form id="form2" onSubmit={(e) => submitHandle2(e)} className='restore-form'>
                    <p>選擇您要清除的內容 (可不勾選)</p>
                    <article>
                        <Checkbox
                            type="checkbox"
                            checked={checked1}
                            onChange={(e) => handleCheckboxChange(e, setChecked1)}
                        />
                        <p>清除地震資料</p>
                    </article>
                    <article>
                        <Checkbox
                            type="checkbox"
                            checked={checked2}
                            onChange={(e) => handleCheckboxChange(e, setChecked2)}
                        />
                        <p>清除系統Log</p>
                    </article>
                    <p>請選擇重設的模式</p>
                    <article className='select-restore-option-wrapper'>
                        <FormControl>
                            <FormLabel style={{ marginBottom: '10px' }}>機器還原設定選項 (進入初始化設定)</FormLabel>
                            <RadioGroup
                                value={radioValue}
                                onChange={handleRadioChange}
                            >
                                <FormControlLabel value="option-1" control={<Radio />} label="(保留) 帳號設定 & 系統設定,只進行初始化設定" />
                                <FormControlLabel value="option-2" control={<Radio />} label="(不保留) 直接還原機器出場預設" />
                            </RadioGroup>
                        </FormControl>
                    </article>
                    <div className='restore-btns-wrapper'>
                        <button type="button" onClick={() => setRestorePage(false)}>取消</button>
                        <button type="button" onClick={(e) => submitHandle2(e)}>確定</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Restore