import { Link, Navigate } from "react-router-dom";
import myImage from "./../img/ico.svg";
import { useState, useEffect } from 'react';

export default function SignUp(){
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isTheSame, setTheSame] = useState(false);
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        checkPassword(e.target.value, confirmPassword);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        checkPassword(password, e.target.value);
    }
    
    const checkPassword = (passwordValue, confirmPasswordValue) => {
        if(passwordValue !== confirmPasswordValue){
            if(confirmPasswordValue !== ''){
                setMessage("Пароли не совпадают.")
            }
            else{
                setMessage("Подтвердите пароль!")
            }
            setTheSame(false);
        }
        else if(passwordValue === ''){
            setMessage("Придумайте пароль");
            setTheSame(false);
        }
        else{
            setMessage("Всё хорошо!!");
            setTheSame(true);
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
                    <input type="text" placeholder="Логин или email" className="inputField Login"></input>
                    <input type="email" placeholder="Эл. почта" className="inputField Login"></input>
                    <input type="password" placeholder="Пароль" className="inputField Login" value={password} onChange={handlePasswordChange}></input>
                    <input type="password" placeholder="Повторить пароль" style={{ borderColor: password !== confirmPassword ? '#ba0000' : undefined, borderWidth: password !== confirmPassword ? '3px' : undefined }} className="inputField Password" value={confirmPassword} onChange={handleConfirmPasswordChange}></input>
                    <div className="link forgot">
                        <Link to="/login" className="link forgot">Войти в аккаунт</Link>
                    </div>
                    <div style={{paddingTop:'5%'}}>
                        <Link to="/"><input type="button" value="Создать аккаунт" className="inputField Button middle" disabled={!isTheSame}></input></Link>
                    </div>
                    {message && <p>{message}</p>}
                </div>
                <div className="spacer mid">
                </div>
            </div>
        </>
    );
}