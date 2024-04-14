import { useState, useEffect } from "react";

import './search_panel.scss';

export default function SearchPanel() {

    const [search, setSearch] = useState({ searchText: '' });
    const [titleWidth, setTitleWidth] = useState(0);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        //Отправка запроса
    };

    return (
        <>
            <div className="upper_panel">
                <div className="panel_inside">
                    <div className="panel_inside search_panel">
                        <form onSubmit={handleSearch}>
                            <input className="panel_inside search_panel searchInput" type="text" name="search" placeholder="Поиск треков, плейлистов, альбомов" value={search.searchText} onChange={handleSearchChange}></input>
                        </form>
                    </div>
                    <button className="panel_inside user_icon">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"></img>
                    </button>
                    {/* <div className="panel_inside user_icon">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"></img>
                    </div> */}
                </div>
            </div>
        </>
    );
}
