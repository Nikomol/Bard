import { useState, useEffect, useRef } from "react";
import PageSettings from "../page_settings/page_settings.jsx";

import './search_panel.scss';

//const PageSettings = lazy(() => import('../page_settings/page_settings.jsx'));

export default function SearchPanel() {

    const [search, setSearch] = useState({ searchText: '' });
    const [showPageSettings, setShowPageSettings] = useState(false);
    const [icon, setIcon] = useState('http://172.24.80.146/images/6.webp');

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
                    <button className="panel_inside user_icon" onClick={setShowSettings}>
                        <img src={icon}></img>
                    </button>
                </div>
            </div>
            <PageSettings isEnable={showPageSettings} Pref={ProfileRef}/>
        </>
    );
}
