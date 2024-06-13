import { useState, useEffect, useRef, useContext } from "react";
import PageSettings from "../page_settings/page_settings";
import { useSelector } from 'react-redux';
import { FocusContext } from '../../../src/context/FocusContext';

import './search_panel.scss';

const SearchPanelHelper = () => {
    const [searchArray, setSearchArray] = useState([
        "123",
        "456",
        "789",
        "test_1",
        "test_2",
        "test_3"
    ]);
    const [searchDimensions, setSearchDimensions] = useState({ searchMarginWidth: 0, searchMarginHeight: 0, searchPanelWidth: 0 });


    useEffect(() => {
        const handleResize = () => {
            setSearchDimensions({
                searchMarginHeight: document.querySelector('.upper_panel')?.clientHeight || 0,
                searchPanelWidth: document.querySelector('.panel_inside.search_panel.searchInput')?.clientWidth || 0
            });
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const panelHeight = {
        marginTop: `${searchDimensions.searchMarginHeight - 9}px`,
        width: `${searchDimensions.searchPanelWidth}px`
    };

    return (
        <>
            {searchArray.length !== 0 ?
                <div className="searchPanel__search-container" style={panelHeight}>
                    {searchArray.map((search, index) => {
                        let buttonStyle = '';
                        if (index === 0) {
                            buttonStyle = 's-upper';
                        } else if (index === searchArray.length - 1) {
                            buttonStyle = 's-downer';
                        } else {
                            buttonStyle = 's-middle';
                        }

                        return (
                            <button key={index} className={`searchPanel__search-buttons ${buttonStyle}`}>
                                {search}
                            </button>
                        );
                    })}
                </div>
                :
                null
            }
        </>
    );

}

export default function SearchPanel() {

    const user = useSelector(state => state.user.user);

    const [search, setSearch] = useState({ searchText: '' });
    const [showPageSettings, setShowPageSettings] = useState(false);
    const [icon, setIcon] = useState(user.img_url);
    const [showSearchPanelHelper, setShowSearchPanel] = useState(false);

    const ProfileRef = useRef(null);

    const { inputRef } = useContext(FocusContext);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        //Отправка запроса
    };

    const setShowSettings = () => {
        setShowPageSettings(!showPageSettings);
    }

    const handleClickOutside = (e) => {
        if (ProfileRef.current && !ProfileRef.current.contains(e.target)) {
            setShowPageSettings(false);
            setShowSearchPanel(false);
        }
    };

    const toggleshowSearchPanelHelper = () => {
        setShowSearchPanel(!showSearchPanelHelper);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    return (
        <>
            <div className="upper_panel">
                <div className="panel_inside">
                    <div className="panel_inside search_panel">
                        <form onSubmit={handleSearch} className="search_container_panel">
                            <input ref={inputRef} className="panel_inside search_panel searchInput" type="text" name="search" placeholder="Поиск треков, плейлистов, альбомов" value={search.searchText} onChange={handleSearchChange} onClick={toggleshowSearchPanelHelper}></input>
                        </form>
                    </div>
                    <button className="panel_inside user_icon user_icon_container" onClick={setShowSettings}>
                        <img src={icon} onError={(e) => e.target.src = "https://cdni.iconscout.com/illustration/premium/thumb/404-7304110-5974976.png?f=webp"} className="panel_inside user_icon user_icon_image"></img>
                    </button>
                </div>
            </div>
            <PageSettings isEnable={showPageSettings} Pref={ProfileRef} />
            {showSearchPanelHelper ?
                <SearchPanelHelper />
                :
                <></>}
        </>
    );
}
