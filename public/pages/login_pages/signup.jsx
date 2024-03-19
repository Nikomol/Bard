import { Link, Navigate } from "react-router-dom";
import myImage from "./../../img/ico.svg";
import { useState, useEffect } from 'react';
import './login.css';

export default function SignUp() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const [passwAccess, setPasswAccess] = useState(false);
    const [logAccess, setLogAccess] = useState(false);
    const [mailAccess, setMailAccess] = useState(false);
    const [allClear, setAllClear] = useState(false);

    useEffect(() => {
        if (passwAccess && logAccess && mailAccess && username) {
            setAllClear(true);
        }
        else {
            setAllClear(false);
        }
    })

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        checkPassword(e.target.value, confirmPassword);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        checkPassword(password, e.target.value);
    }

    const handleConfirmEmailChange = (e) => {
        setEmail(e.target.value);

        if (e.target.value.indexOf("@") < 0) {
            setMailAccess(false);
        }
        else {
            setMailAccess(true);
        }
    }

    const handleConfirmUsername = (e) => {
        setUsername(e.target.value);
        if(e.target.value !== ""){
            setLogAccess(true);
        }
        else{
            setLogAccess(false);
        }
    }

    const checkPassword = (passwordValue, confirmPasswordValue) => {
        if (passwordValue !== confirmPasswordValue) {
            if (confirmPasswordValue !== '') {
                setMessage("Пароли не совпадают.")
            }
            else {
                setMessage("Подтвердите пароль!")
            }
            setPasswAccess(false);
        }
        else if (passwordValue === '') {
            setMessage("Придумайте пароль");
            setPasswAccess(false);
        }
        else {
            setMessage("Всё хорошо!!");
            setPasswAccess(true);
        }
    }

    return (
        <>
            <div className="container">
                <div className="logo">
                    <img src={myImage}></img>
                    <h1>OtoWave</h1>
                </div>
                <div className="spacer min">
                </div>
                <div className="mainform">
                    <input type="text" placeholder="Логин" className="inputField Login" onChange={handleConfirmUsername}></input>
                    <input type="email" placeholder="Эл. почта" className="inputField Login" onChange={handleConfirmEmailChange}></input>
                    <input type="password" placeholder="Пароль" className={`inputField Login ${password !== confirmPassword ? "Red" : ""}`} value={password} onChange={handlePasswordChange}></input>
                    <input type="password" placeholder="Повторить пароль" className={`inputField Password ${password !== confirmPassword ? "Red" : ""}`} value={confirmPassword} onChange={handleConfirmPasswordChange}></input>
                    <div className="link forgot">
                        <Link to="/login" className="link forgot">Войти в аккаунт</Link>
                    </div>
                    <div style={{ paddingTop: '5%' }}>
                        <Link to="/"><input type="button" value="Создать аккаунт" className="inputField Button middle" disabled={!allClear} style={{ width: '56%' }}></input></Link>
                    </div>
                    {message && <p style={{ color: password === confirmPassword ? 'green' : 'red' }}>{message}</p>}
                </div>
                <div className="spacer mid">
                </div>
            </div>
        </>
    );
}