import { Link, Navigate } from "react-router-dom";

export default function Login() {
    return (
        <>
            <div className="container">
                <div className="logo">
                    <img src=""></img>
                    <h1>MuseScore</h1>
                </div>
                <div className="spacer mid">
                </div>
                <div className="mainform">
                    <input type="text" placeholder="Логин или email"></input>
                    <input type="password" placeholder="Пароль"></input>
                    <div className="link forgot">
                        <Link to="/forgot-password">Забыли пароль</Link>
                    </div>
                    <div>
                        <input type="button" value="Войти" className="Button middle"></input>
                    </div>
                </div>
                <div className="spacer mid">
                </div>
                <div className="link registration">
                    <Link to="/signup">У вас нет аккаунта ? Зарегестрируйтесь!</Link>
                </div>
            </div>
        </>
    );
}