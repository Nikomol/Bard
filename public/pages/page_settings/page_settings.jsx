import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './page_settings.scss'

export default function PageSettings() {

    const [searchContainer, setSearchContainer] = useState();

    const navigate = useNavigate();

    const NavigateToProfile = () => {
        navigate('/profile');
    }

    useEffect(() => {
        const handleResize = () => {
            const search = document.querySelector('.upper_panel');
            setSearchContainer(search.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const panelHeight = {
        top: `calc(${searchContainer}px + 16px)`
    };

    return (
        <>
            <div className='Profile' style={panelHeight}>
                {/*Нужно сделать текст выключеной конпки более тёмнын(все кнопки, кроме кнопки "Профиль" - выключены. Чекай disabled)*/}
                <button className='Profile-Button Enable Upper' onClick={NavigateToProfile}>Профиль</button> {/*Кнопка включена*/}
                <button className='Profile-Button Disable Middle' disabled={true}>Настройки</button> {/*Кнопка выключена*/}
                <button className='Profile-Button Disable Middle' disabled={true}>Сменить аккаунт</button> {/*Кнопка выключена*/}
                <button className='Profile-Button Disable Down' disabled={true}>Выйти</button> {/*Кнопка выключена*/}
            </div>
        </>
    );
}