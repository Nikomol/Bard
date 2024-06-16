import { useState, useEffect, useRef } from "react";
import PageSettings from "../page_settings/page_settings.jsx";
import { useSelector } from 'react-redux';

import './search_panel.scss';

export default function SearchPanel() {

    const user = useSelector(state => state.user.user);

    const [search, setSearch] = useState({ searchText: '' });
    const [showPageSettings, setShowPageSettings] = useState(false);
    const [icon, setIcon] = useState(user.img_url);

    const ProfileRef = useRef(null);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        //Отправка запроса
    };

    const setShowSettings = () =>{
        setShowPageSettings(!showPageSettings);
    }

    const handleClickOutside = (e) => {
        if (ProfileRef.current && !ProfileRef.current.contains(e.target)) {
            setShowPageSettings(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    return (
        <>
            <div className="upper_panel">
                <div className="panel_inside">
                    <div className="panel_inside search_panel">
                        <form onSubmit={handleSearch}>
                            <input className="panel_inside search_panel searchInput" type="text" name="search" placeholder="Поиск треков, плейлистов, альбомов" value={search.searchText} onChange={handleSearchChange}></input>
                        </form>
                    </div>
                    <button className="panel_inside user_icon user_icon_container" onClick={setShowSettings}>
                        <img src={icon} onError={(e) => e.target.src = "https://cdni.iconscout.com/illustration/premium/thumb/404-7304110-5974976.png?f=webp"} className="panel_inside user_icon user_icon_image"></img>
                    </button>
                </div>
            </div>
            <PageSettings isEnable={showPageSettings} Pref={ProfileRef}/>
        </>
    );
}
