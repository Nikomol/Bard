import { useNavigate } from 'react-router-dom';

import './page_settings.scss'

export default function PageSettings(){

    const navigate = useNavigate();

    const NavigateToProfile = () =>{
        navigate('/profile');
    }

    return(
        <>
            <div className='Profile'>
                {/*Нужно сделать текст выключеной конпки более тёмнын(все кнопки, кроме кнопки "Профиль" - выключены. Чекай disabled)*/}
                <button className='Profile-Button Enable Upper' onClick={NavigateToProfile}>Профиль</button> {/*Кнопка включена*/}
                <button className='Profile-Button Disable Middle' disabled={true}>Настройки</button> {/*Кнопка выключена*/}
                <button className='Profile-Button Disable Middle' disabled={true}>Сменить аккаунт</button> {/*Кнопка выключена*/}
                <button className='Profile-Button Disable Down' disabled={true}>Выйти</button> {/*Кнопка выключена*/}
            </div>
        </>
    );
}