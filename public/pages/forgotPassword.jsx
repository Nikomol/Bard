import { Link, Navigate, useNavigate } from "react-router-dom";
import myImage from "./../img/ico.svg";
import { useState, useEffect } from 'react';


const MainForget = ({ onPasswordReset }) => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('Эл. почта');

    const handleEmailCheck = (e) => {
        setEmail(e.target.value);
    }

    const checkMail = () => {
        if (email === '') {
            setMessage("Введите почту!");
        }
        else {
            onPasswordReset();
        }
    }

    return (
        <>
            <div className="spacer min">
            </div>
            <h2>Напишите email вашего аккаунта чтобы сменить пароль</h2>
            <div className="spacer min">
            </div>
            <div className="mainform">
                <input type="email" placeholder={message} className="inputField Login" value={email} onChange={handleEmailCheck}></input>
                <div>
                    <input type="button" value="Восстановить пароль" className="inputField Button middle" style={{ width: '66%' }} onClick={checkMail}></input>
                </div>
            </div>
            <div className="spacer mid">
            </div>
            <div className="links">
                <Link to="/register" className="links">Зарегистрироваться</Link>
                <Link to="/login" className="links">Войти</Link>
            </div>
        </>
    );
}

const LastForget = () => {
    return (
        <>
            <div className="spacer min">
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1 style={{ width: '60%' }}>Проверьте ваш почтовый ящик, туда придёт письмо с инструкциями</h1>
            </div>
            <div className="spacer mid">
            </div>
            <div className="links">
                <Link to="/register" className="links">Зарегистрироваться</Link>
                <Link to="/login" className="links">Войти</Link>
            </div>
        </>
    )
}

export default function ForgotPassoword() {
    const [isResettingPassword, setIsResettingPassword] = useState(false);

    const handlePasswordReset = () => {
        setIsResettingPassword(true);
    }

    return (
        <>
            <div className="container">
                <div className="logo">
                    <img src={myImage}></img>
                    <h1>OtoWave</h1>
                </div>
                {isResettingPassword ? <LastForget /> : <MainForget onPasswordReset={handlePasswordReset} />}
            </div>
        </>
    );
}