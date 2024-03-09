import { Link, Navigate } from "react-router-dom";
import myImage from "./../img/ico.svg";

export default function CheckYourPassword() {
    return (
        <>
            <div className="container">
                <div className="logo">
                    <img src={myImage}></img>
                    <h1>OtoWave</h1>
                </div>
                <div className="spacer min">
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h1 style={{width:'60%'}}>Проверьте ваш почтовый ящик, туда придёт письмо с инструкциями</h1>
                </div>
                <div className="spacer mid">
                </div>
                <div className="links">
                    <Link to="/signup" className="links">Зарегистрироваться</Link>
                    <Link to="/login" className="links">Войти</Link>
                </div>
            </div>
        </>
    );
}