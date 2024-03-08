import { Link, Navigate } from "react-router-dom";
import myImage from "./../img/ico.svg";

export default function SignUp(){
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
                    <input type="password" placeholder="Пароль" className="inputField Login"></input>
                    <input type="password" placeholder="Повторить пароль" className="inputField Password"></input>
                    <div className="link forgot">
                        <Link to="/login" className="link forgot">Войти в аккаунт</Link>
                    </div>
                    <div style={{paddingTop:'5%'}}>
                        <Link to="/"><input type="button" value="Создать аккаунт" className="inputField Button middle"></input></Link>
                    </div>
                </div>
                <div className="spacer mid">
                </div>
            </div>
        </>
    );
}