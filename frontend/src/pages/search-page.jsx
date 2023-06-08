import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { GenreList } from "../cmps/genre-list";
import { useDebouncedCallback } from "use-debounce"
import { stationService } from '../services/station.service.local';
import { utilService } from '../services/util.service';
import { SongList } from '../cmps/song-list';
import { AppHeader } from '../cmps/app-header';
import { Search } from '../cmps/search';


export function SearchPage() {
    const YT_KEY = `AIzaSyCxLA7x-Komf911aGJmXufVVqBbn7MYavE`
    const [data, setData] = useState({});
    const [term, setTerm] = useState('')



    function handleChange(ev) {
        const songName = ev.target.value.toLowerCase()
        setTerm(songName)
    }

    const debouncedFetchData = useDebouncedCallback(fetchData, 500)
    useEffect(() => {
        debouncedFetchData()
    }, [term])

    async function fetchData() {
        if (term === '') {
            setData({})
            return
        }
    
        const cache = utilService.loadFromStorage('cache')
        if (cache[term]) setData(cache[term])
        else {
            try {
                const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'snippet',
                        type: 'video',
                        key: YT_KEY,
                        q: term,
                        maxResults: 8
                    }
                });
                const station = stationService.dataTransform(response.data.items)
                setData(station);
                cache[term] = station
                utilService.saveToStorage('cache', cache)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
    const svgSerach = <svg role="img" height="16" width="16" aria-hidden="true" class="Svg-sc-ytk21e-0 haNxPq mOLTJ2mxkzHJj6Y9_na_" viewBox="0 0 16 16" data-encore-id="icon"><path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z"></path></svg>
    const MySVG = () => (
        <svg role="img" height="16" width="16" aria-hidden="true" class="Svg-sc-ytk21e-0 haNxPq mOLTJ2mxkzHJj6Y9_na_" viewBox="0 0 16 16" data-encore-id="icon"><path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z"></path></svg>
    );
    return (
        <div className="search-page">
            <AppHeader />
            <Search />
        </div>
    )
}