import { useState, useEffect } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import './playlistContent.scss';

export default function PlaylistContent() {
    let [searchParams, setSearchParams] = useSearchParams();

    const playlistId = searchParams.get('pl'); // Получаем 'playlistId' из строки запроса
    const [urlData, setUrlData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/playlist?pl=${playlistId}`);

                if (!response.ok) {
                    throw new Error('Что то пошло не так....');
                }
                const result = await response.json();
                setUrlData(result);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
            setIsLoading(false);
        }

        fetchData();
    }, [playlistId]);

    if (isLoading) {
        return (
            <></>
        );
    }

    return (
        <>
            {urlData && user && ('login' in user && 'id' in user) ?
                <>
                    <h3>{JSON.stringify(urlData)}</h3>
                </> :
                <Navigate to={"/404"} replace={true} />
            }
        </>
    );
}
