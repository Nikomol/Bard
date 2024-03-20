import { Link } from "react-router-dom";
import myImage from "./../../img/ico.svg";
import { useState } from 'react';
import './login.css';

export default function Login() {
    
    //Форма для отправки get запроса на сервер
    const [formData, setFormData] = useState({ email: '', passwrd: '' });

    //При изменеии email и пароля в formData меняются данные
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    //Функция по отправке get запроса
    const handleSubmit = async (e) => {
        e.preventDefault();
        //encodeURIComponent() -> функция, которая кодирует email и пароль для безопасности.
        fetch(`__api__?eml=${encodeURIComponent(formData.email)} &psw=${encodeURIComponent(formData.passwrd)}`)
            //Полученные данные от сервера
            .then(data => {
                console.log(data);
                alert("Get запрос отправлен/получен");
            })
            //Ошибка получения данных от сервера
            .catch(error => {
                console.error(`Ошибка при выполнении запроса: ${error}`);
                alert("Get запрос не отправлен");
            })
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
                        <input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleInputChange} className="inputField Password"></input>
                        <div className="link forgot">
                            <Link to="/recovery" className="link forgot">Забыли пароль ?</Link>
                        </div>
                        <div>
                            <input type="submit" value="Войти" className="inputField Button middle"></input>
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