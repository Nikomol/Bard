import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ButtonIcons from '../button_icons/button_icons';

import myImage from "../../img/ico/ico.svg";

import './home_panel.scss';

export default function HomePanel() {

    const navigate = useNavigate();
    const location = useLocation();

    const [currentPage, setCurrentPage] = useState('/songs');
    const [disMainButton, setDisMainButton] = useState(true);
    const [disNavButton, setDisNuvButton] = useState(false);

    const toggleMainPanel = () => {
        if (currentPage !== '/') {
            navigate('/');
            setCurrentPage('/');
            setDisMainButton(true);
            setDisNuvButton(false);
        }
    }

    const toggleNavigatorPanel = () => {
        if (currentPage !== '/explore') {
            navigate('/explore');
            setCurrentPage('/explore');
            setDisNuvButton(true);
            setDisMainButton(false);
        }
    }

    useEffect(() => {
        if(location.pathname !== '/' && location.pathname !== '/explore'){
            setCurrentPage(location.pathname);
            setDisMainButton(false);
            setDisNuvButton(false);
        }
    }, [location.pathname])

    return (
        <>
            <div className={"backdrop"}>
                <div className={"backdrop-inside"}>
                    <div className={"title"}>
                        <img className={"backdrop img"} src={myImage}></img>
                        <h1 className={"web-title"}>OtoWave</h1>
                    </div>
                    <div className={"div-buttons"}>
                        <button
                            className={`buttons home ${!disMainButton ? "pressed" : "unpressed"}`} onClick={toggleMainPanel} disabled={disMainButton}>
                            <ButtonIcons icon_name={"home"} />
                            <span>Главная</span>
                        </button>
                        <button className={`buttons nav ${!disNavButton ? "pressed" : "unpressed"}`} onClick={toggleNavigatorPanel} disabled={disNavButton}>
                            <ButtonIcons icon_name={"navigator"} />
                            <span>Навигатор</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}