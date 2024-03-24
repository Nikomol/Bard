import React, { useEffect } from "react";
import icons from './icons.json';

export default function PlayerIcons({ icon_name }) {
    const icon = icons.icons[icon_name];

    useEffect(() =>{
        console.log(`Icon name: ${icon_name}`);
    }, [icon_name])

    return (
        <div dangerouslySetInnerHTML={{__html: icon}}></div>
    );
}