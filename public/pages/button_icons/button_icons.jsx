import React, { useEffect } from "react";
import icons from './button_icons.json';

export default function ButtonIcons({ icon_name }) {
    const icon = icons.icons[icon_name];

    useEffect(() =>{
        console.log(`Icon name: ${icon_name}`);
    }, [icon_name])

    return (
        <div dangerouslySetInnerHTML={{__html: icon}} style={icon_name === "navigator" ? {paddingLeft: "2px", paddingTop: "4px"} : {paddingLeft: "none"}}></div>
    );
}