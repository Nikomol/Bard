import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import './main_panel.scss';

export default function MainPanel(){
    const user = useSelector((state) => state.user.user);

    return(
        <>
            {user && ('login' in user && 'id' in user) ? 
                    <h1>Main</h1>
                : <Navigate to={"/login"} /> 
            }
        </>
    );
}