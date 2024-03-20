import { Link } from "react-router-dom";
import myImage from "./../../img/ico.svg";
import { useState } from 'react';
import './login.css';

export default function Login() {
    
    //Форма для отправки get запроса на сервер
    const [formData, setFormData] = useState({ email: '', passwrd: '' });

    const [dis, setDis] = useState(true);

    //При изменеии email и пароля в formData меняются данные
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        if(formData.email != "" && formData.passwrd != ""){
            setDis(false);
        }else{
            setDis(true);
        }
    };

    //Функция по отправке get запроса
    const handleSubmit = async (e) => {
        e.preventDefault();
        setDis(true);
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
                setDis(false);
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