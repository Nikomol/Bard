import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import './profilePage.scss';

export default function ProfilePage () {
    const user = useSelector(state => state.user.user);

    const [userIco, setUserIco] = useState(user.img_url);
    const [userName, setUserName] = useState(user.username);
    const [subscribers, setSubscribers] = useState(0);
    const [subscriptions, setSubscriptions] = useState(0);
    const [description, setDescription] = useState("");

    return(
        <>
            <div className="profileBackground">
                <div className="backgroungImageContainer">
                    <img className="backgroungImage"></img>
                </div>    
            </div>
            <div className="profileInfoContainer">
                <div className="profileIconContainer">
                    <img className="profileIconImage" src={userIco}></img>
                </div>
                <div className="profileNameContainer">
                    <h2 className="profileNameText">{userName}</h2>
                </div>
                <div className="profileButtonsContainer">
                    <button className={`button-subscribe`}>Подписаться</button>
                    <button className="button-settings">Настройки профиля</button>
                    <a></a>
                </div>
            </div>
        </>
    );
}