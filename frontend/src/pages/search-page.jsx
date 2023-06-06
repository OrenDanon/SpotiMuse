import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { GenreList } from "../cmps/genre-list";
import { useDebouncedCallback } from "use-debounce"
import { stationService } from '../services/station.service.local';
import { utilService } from '../services/util.service';
import { SongList } from '../cmps/song-list';


export function SearchPage() {
    const YT_KEY = `AIzaSyCxLA7x-Komf911aGJmXufVVqBbn7MYavE`
    const [data, setData] = useState({});


    const debouncedFetchData = useDebouncedCallback(fetchData, 500)

    async function fetchData(ev) {
        const songName = ev.target.value.toLowerCase()
        const cache = utilService.loadFromStorage('cache')
        if (cache[songName]) setData(cache[songName])
        else {
            try {
                const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'snippet',
                        type: 'video',
                        key: YT_KEY,
                        q: songName
                    }
                });
                const station = stationService.dataTransform(response.data.items)
                setData(station);
                cache[songName] = station
                utilService.saveToStorage('cache', cache)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
    return (
        <div className="search-page">
            <form action="">
                <input onChange={debouncedFetchData} type="search" name="" id="" />
            </form>
            {data.songs ?
                <section  >
                    <SongList
                        station={data} />
                </section>
                :
                <section className="genres">
                    <h2>Browse all</h2>
                    <GenreList />
                </section>
            }
        </div>
    )
}