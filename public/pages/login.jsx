import { Link, Navigate } from "react-router-dom";
import myImage from "./../img/ico.svg";

export default function Login() {
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
                    <input type="text" placeholder="Логин или email" className="inputField Login"></input>
                    <input type="password" placeholder="Пароль" className="inputField Password"></input>
                    <div className="link forgot">
                        <Link to="/recovery" className="link forgot">Забыли пароль ?</Link>
                    </div>
                    <div>
                        <input type="button" value="Войти" className="inputField Button middle"></input>
                    </div>
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