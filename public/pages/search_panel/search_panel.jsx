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

    // useEffect(() => {
    //     const handleResize = () => {
    //         const title = document.querySelector('.backdrop');
    //         setTitleWidth(title.clientWidth);
    //     };

    //     window.addEventListener('resize', handleResize);

    //     handleResize();

    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

    // const panelWidth = {
    //     width: `calc(100% - (${titleWidth}px))`
    // };

    return (
        <>
            <div className="upper_panel">
                <div className="search_panel">
                    <form onSubmit={handleSearch}>
                        <input className="search_panel searchInput" type="text" name="search" placeholder="Поиск треков, плейлистов, альбомов" value={search.searchText} onChange={handleSearchChange}></input>
                    </form>
                </div>
                <div className="user_panel">
                    <div className="user_icon">
                        <img></img>
                    </div>
                </div>
            </div>
        </>
    );
}