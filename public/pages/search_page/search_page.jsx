import { useState, useEffect } from "react";
import { useSearchParams, Navigate } from 'react-router-dom';

export default function SearchPage() {
    let [searchParams, setSearchParams] = useSearchParams();

    const searchId = searchParams.get('sr');

    return (
        <>
            <div className="">
                <h1>{decodeURIComponent(searchId)}</h1>
            </div>
        </>
    )
}