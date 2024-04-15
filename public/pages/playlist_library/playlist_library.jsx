import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PlaylistLibrary() {

    const user = useSelector((state) => state.user.user);

    return(
        <>
            {user && ('login' in user && 'id' in user) ? 
                <div className="main-backdrop">
                    
                </div> 
                : <Navigate to={"/login"} /> 
            }
        </>
    );
}