import { useState, useEffect } from "react";
import PageSettings from "../page_settings/page_settings.jsx";

import './search_panel.scss';

//const PageSettings = lazy(() => import('../page_settings/page_settings.jsx'));

export default function SearchPanel() {

    const [search, setSearch] = useState({ searchText: '' });
    const [showPageSettings, setShowPageSettings] = useState(false);

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
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"></img>
                    </button>
                </div>
            </div>
            <PageSettings isEnable={showPageSettings}/>
        </>
    );
}
