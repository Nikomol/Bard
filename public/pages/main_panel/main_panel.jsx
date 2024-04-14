import { useState } from "react";
import { Navigate } from "react-router-dom";

import './main_panel.scss';

export default function MainPanel(user){
    const [isLogged, setIsLogged] = useState(false);

    return(
        <>
            {'login' in user && 'id' in user ? 
                <div className="main-backdrop">
                    
                </div> 
                : <Navigate to={"/login"} /> 
            }
        </>
    );
}