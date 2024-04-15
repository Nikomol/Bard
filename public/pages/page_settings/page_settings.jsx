import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './page_settings.scss'

export default function PageSettings({isEnable = false}) {

    const [searchContainer, setSearchContainer] = useState();

    const navigate = useNavigate();

    const NavigateToProfile = () => {
        navigate('/profile');
    }

    useEffect(() => {
        console.log(`Show: ${isEnable}`);
    })

    return (
        <>
            <div className={`Profile ${isEnable ? 'showed' : 'hidden'}`}>
                {/*Нужно сделать текст выключеной конпки более тёмнын(все кнопки, кроме кнопки "Профиль" - выключены. Чекай disabled)*/}
                <button className='Profile-Button Enable Upper' onClick={NavigateToProfile}>Профиль</button> {/*Кнопка включена*/}
                <button className='Profile-Button Disable Middle' disabled={true}>Настройки</button> {/*Кнопка выключена*/}
                <button className='Profile-Button Disable Middle' disabled={true}>Сменить аккаунт</button> {/*Кнопка выключена*/}
                <button className='Profile-Button Disable Down' disabled={true}>Выйти</button> {/*Кнопка выключена*/}
            </div>
        </>
    );
}