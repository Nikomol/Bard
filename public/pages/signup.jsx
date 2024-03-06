import { Link, Navigate } from "react-router-dom";

export default function SignUp(){
    return (
        <>
            <div className="container">
                <div className="logo">
                    <img src="" alt="MuseScore"></img>
                    <h1>SignUp</h1>
                </div>
                <div className="form">
                    <form>
                        <input type="text" placeholder="Логин или email"></input>
                        <input type="password" placeholder="Пароль"></input>
                        <button>Войти</button>
                        <Link to="/login"><button>Регистрация</button></Link>
                        <Link to="/forgot-password">Забыли пароль</Link>
                    </form>
                </div>
            </div>
        </>
    );
}