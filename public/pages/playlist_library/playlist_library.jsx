import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import './playlist_library.scss';

export default function Explore() {

    const user = useSelector((state) => state.user.user);

    return (
        <>
            {user && ('login' in user && 'id' in user) ?
                <h1>Explore</h1>
                : <Navigate to={"/login"} />
            }
        </>
    );
}