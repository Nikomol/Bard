import { Link, Navigate, useNavigate} from "react-router-dom";
import myImage from "./../img/ico.svg";
import { useState, useEffect } from 'react';

export default function ForgotPassoword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('Эл. почта');
    
    const navigate = useNavigate();

    const handleEmailCheck = (e) => {
        setEmail(e.target.value);
    }

    const checkMail = () =>{
        if(email === ''){
            setMessage("Введите почту!");
        }
        else{
            navigate("/check-your-password");
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
                <h2>Напишите email вашего аккаунта чтобы сменить пароль</h2>
                <div className="spacer min">
                </div>
                <div className="mainform">
                    <input type="email" placeholder={message} className="inputField Login" value={email} onChange={handleEmailCheck}></input>
                    <div>
                        <input type="button" value="Восстановить пароль" className="inputField Button middle" style={{width:'66%'}} onClick={checkMail}></input>
                    </div>
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