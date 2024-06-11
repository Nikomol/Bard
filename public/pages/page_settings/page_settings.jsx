import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './page_settings.scss'

export default function PageSettings({isEnable = false, Pref}) {

    const [searchContainer, setSearchContainer] = useState();

    const navigate = useNavigate();

    const NavigateToProfile = () => {
        navigate('/profile');
    }

    const NavigateToSettings = () => {
        navigate('/settings');
    }

    useEffect(() => {
        console.log(`Show: ${isEnable}`);
    })

    return (
        <>
            <div className={`Profile ${isEnable ? 'showed' : 'hidden'}`} ref={Pref}>
                {/*Нужно сделать текст выключеной конпки более тёмнын(все кнопки, кроме кнопки "Профиль" - выключены. Чекай disabled)*/}
                <button className='Profile-Button Enable Upper' onClick={NavigateToProfile}>Профиль</button> {/*Кнопка включена*/}
                <button className='Profile-Button Enable Middle' onClick={NavigateToSettings}>Настройки</button> {/*Кнопка включена*/}
                <button className='Profile-Button Disable Middle' disabled={true}>Сменить аккаунт</button> {/*Кнопка выключена*/}
                <button className='Profile-Button Disable Down' disabled={true}>Выйти</button> {/*Кнопка выключена*/}
            </div>
        </>
    );
}