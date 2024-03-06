import { Link, Navigate } from "react-router-dom";

export default function ForgotPassword() {
    return (
        <>
            <div className="container">
                <div className="logo">
                    <img src=""></img>
                    <h1>Forget</h1>
                </div>
                <div className="form">
                    <Link to="/login"><button>Вернуться</button></Link>
                </div>
            </div>
        </>
    );
}