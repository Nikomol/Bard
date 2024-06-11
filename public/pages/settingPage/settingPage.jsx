import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import './settingPage.scss';

export default function SettingPage() {
    const user = useSelector(state => state.user.user);

    return (
        <>
        </>
    );
}