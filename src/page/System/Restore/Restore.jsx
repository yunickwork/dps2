import React, { useState } from 'react'
import './Restore.scss'
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { MdOutlineClose } from "react-icons/md";

const Restore = ({ setRestorePage, restorePage }) => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [radioValue, setRadioValue] = useState('option-1');

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

    return (
        <div style={{ display: `${restorePage === false ? 'none' : 'flex'}` }} className='restore-container'>
            <button onClick={() => setRestorePage(false)} className='restore-container-close-btn'><MdOutlineClose /></button>
            <div className='restore-wrapper-bg' onClick={() => setRestorePage(false)}></div>
            <div className='restore-wrapper'>
                <h2>系統還原選項</h2>
                <form className='restore-form'>
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
                                <FormControlLabel value="option-1" control={<Radio />} label="(保留) 帳號設定 & 系統設定並進行初始化" />
                                <FormControlLabel value="option-2" control={<Radio />} label="(不保留) 直接還原機器出場預設" />
                            </RadioGroup>
                        </FormControl>
                    </article>
                    <div className='restore-btns-wrapper'>
                        <button>取消</button>
                        <button>確定</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Restore