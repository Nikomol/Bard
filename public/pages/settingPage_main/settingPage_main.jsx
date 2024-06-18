import { useState, useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import './settingPage_main.scss';

export default function SettingPageMain() {
    const user = useSelector(state => state.user.user);
    const [params, setParams] = useSearchParams();

    const [panelDimensions, setPanelDimensions] = useState({ playerHeight: 0, searchHeight: 0 });

    const userSettingsParam = params.get('st');

    const [changeNickname, setChangeNickname] = useState(false);
    const [settingsActive, setSettingsActive] = useState(false);

    const [newNickname, setNewNickname] = useState('');

    const handleClickChangeNickname = () => {
        if (!settingsActive) {
            setChangeNickname(true);
            setSettingsActive(true);
        }
    }

    const handleInputNicknameChange = (e) =>{
        setNewNickname(e.target.value);
    }

    const handleSubmitNewNickname = (e) =>{
        e.preventDefault();
        setSettingsActive(false);
    }

    useEffect(() => {
        const handleResize = () => {
            setPanelDimensions({
                playerHeight: document.querySelector('.playerContainer')?.clientHeight || 0
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const panelHeight = {
        height: `calc(100vh - ${panelDimensions.playerHeight + 29}px)`
    };

    if (!userSettingsParam) {
        return (
            <Navigate to={"/settings?st=account"} replace={true} />
        );
    }

    return (
        <>
            {userSettingsParam === "account" ?
                <>
                    <div className="setting-page__main-content" style={panelHeight}>
                        <h1 className="setting-page__main-content__title">Учётная запись</h1>
                        <div className="setting-page__main-content__allContent">
                            <div className="setting-page__main-content__allContent__info">
                                <h3 className="setting-page__main-content__allContent__info__text">Ваши личные данные</h3>
                            </div>
                            <div className="setting-page__main-content__allContent__info">
                                <h3 className="setting-page__main-content__allContent__info__text">Имя пользователя:</h3>
                                {changeNickname ?
                                    <>
                                        <form onSubmit={handleSubmitNewNickname}>
                                            <input 
                                                type="text" 
                                                name="nickname" 
                                                placeholder="Введите новое имя пользователя" 
                                                value={newNickname} 
                                                onChange={handleInputNicknameChange} 
                                            />
                                            <input type="submit" />
                                        </form>
                                    </>
                                    :
                                    <>
                                        <h3 className="setting-page__main-content__allContent__info__text profileName-text">{user.username}</h3>
                                        <button className="" onClick={handleClickChangeNickname} disabled={settingsActive}></button>
                                    </>
                                }
                            </div>
                            <div className="setting-page__main-content__allContent__info">
                                <h3 className="setting-page__main-content__allContent__info__text">Ваши личные данные</h3>
                            </div>
                            <div className="setting-page__main-content__allContent__info">
                                <h3 className="setting-page__main-content__allContent__info__text">Ваши личные данные</h3>
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    <Navigate to={"/404"} replace={true} />
                </>
            }
        </>
    );
}