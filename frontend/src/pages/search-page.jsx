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
    // const YT_KEY = `AIzaSyCxLA7x-Komf911aGJmXufVVqBbn7MYavE`
    // const [data, setData] = useState({});
    // const [term, setTerm] = useState('')



    // function handleChange(ev) {
    //     const songName = ev.target.value.toLowerCase()
    //     setTerm(songName)
    // }

    // const debouncedFetchData = useDebouncedCallback(fetchData, 500)
    // useEffect(() => {
    //     debouncedFetchData()
    // }, [term])

    // async function fetchData() {
    //     if (term === '') {
    //         setData({})
    //         return
    //     }
    
    //     const cache = utilService.loadFromStorage('cache')
    //     if (cache[term]) setData(cache[term])
    //     else {
    //         try {
    //             const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    //                 params: {
    //                     part: 'snippet',
    //                     type: 'video',
    //                     key: YT_KEY,
    //                     q: term,
    //                     maxResults: 8
    //                 }
    //             });
    //             const station = stationService.dataTransform(response.data.items)
    //             setData(station);
    //             cache[term] = station
    //             utilService.saveToStorage('cache', cache)

    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     }
    // }
    
    return (
        <div className="search-page">
            <AppHeader />
            <Search />
        </div>
    )
}