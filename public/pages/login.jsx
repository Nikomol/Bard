import { Link, Navigate } from "react-router-dom";

export default function Login() {
    return (
        <>
            <div className="container">
                <div className="logo">
                    <img src=""></img>
                    <h1>OtoWave</h1>
                </div>
                <div className="spacer mid">
                </div>
                <div className="mainform">
                    <input type="text" placeholder="Логин или email" className="inputField Login"></input>
                    <input type="password" placeholder="Пароль" className="inputField Password"></input>
                    <div className="link forgot">
                        <Link to="/forgot-password" className="link forgot">Забыли пароль</Link>
                    </div>
                    <div>
                        <input type="button" value="Войти" className="inputField Button middle"></input>
                    </div>
                </div>
                <div className="spacer mid">
                </div>
                <div className="link registration">
                    <Link to="/signup" className="link registration">У вас нет аккаунта ? Зарегестрируйтесь!</Link>
                </div>
            </div>
        </>
    );
}