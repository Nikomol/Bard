import { Link, useNavigate } from "react-router-dom";
import myImage from "./../../img/ico/ico.svg";
import { useState } from 'react';
//const jwt_decode = require('jwt-decode');

import './login.css';

export default function Login() {

    const navigate = useNavigate();

    //Форма для отправки get запроса на сервер
    const [formData, setFormData] = useState({ email: '', passwrd: '' });

    const [serverResponse, setServerResponse] = useState(null); // Создаем состояние для хранения ответа сервера

    const [dis, setDis] = useState(true);

    //При изменеии email и пароля в formData меняются данные
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        if (formData.email != "" && formData.passwrd != "") {
            setDis(false);
        } else {
            setDis(true);
        }
    };

    //Функция по отправке get запроса
    const handleSubmit = async (e) => {
        e.preventDefault();
        setDis(true);
        console.log(formData);
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data === undefined || data === null){
                alert("Ответ получен. Пользователь не найден.");
                setDis(false);
            }  
            else{
                alert(`Ответ получен. Пользователь ${data.username} найден.`);
                console.clear();
                navigate('/songs');
            }
        })
        .catch(error => {
            console.error(`Ошибка ${error}`);
            setDis(false);
        });
    }

    return (
        <>
            <div className="container">
                <div className="logo">
                    <img src={myImage}></img>
                    <h1>OtoWave</h1>
                </div>
                <div className="spacer mid">
                </div>
                <div className="mainform">
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder="Эл. почта" value={formData.email} onChange={handleInputChange} className="inputField Login"></input>
                        <input type="password" name="passwrd" placeholder="Пароль" value={formData.passwrd} onChange={handleInputChange} className="inputField Password"></input>
                        <div className="link forgot">
                            <Link to="/recovery" className="link forgot">Забыли пароль ?</Link>
                        </div>
                        <div>
                            <input type="submit" value="Войти" className="inputField Button middle" disabled={dis}></input>
                        </div>
                    </form>
                </div>
                <div className="spacer min">
                </div>
                <div className="link registration">
                    <Link to="/register" className="link registration">У вас нет аккаунта ? Зарегистрируйтесь!</Link>
                </div>
            </div>
        </>
    );
}