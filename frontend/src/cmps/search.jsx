import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { GenreList } from "../cmps/genre-list";
import { useDebouncedCallback } from "use-debounce"
import { stationService } from '../services/station.service.local';
import { utilService } from '../services/util.service';
import { SongList } from '../cmps/song-list';


export function Search() {
    const YT_KEY = `AIzaSyCxLA7x-Komf911aGJmXufVVqBbn7MYavE`
    const [data, setData] = useState({});


    const debouncedFetchData = useDebouncedCallback(fetchData, 500)

    async function fetchData(ev) {
        const songName = ev.target.value.toLowerCase()
        if (songName === '') {
            setData(prevData => ({ ...prevData, songs: [] }))
            return
          }
        const cache = utilService.loadFromStorage('cache')
        if (cache[songName]) setData(cache[songName])
        else {
            try {
                const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'snippet',
                        type: 'video',
                        key: YT_KEY,
                        q: songName,
                        maxResults: 8
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
    const svgSerach = <svg role="img" height="16" width="16" aria-hidden="true" class="Svg-sc-ytk21e-0 haNxPq mOLTJ2mxkzHJj6Y9_na_" viewBox="0 0 16 16" data-encore-id="icon"><path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z"></path></svg>
    const MySVG = () => (
        <svg role="img" height="16" width="16" aria-hidden="true" class="Svg-sc-ytk21e-0 haNxPq mOLTJ2mxkzHJj6Y9_na_" viewBox="0 0 16 16" data-encore-id="icon"><path d="M7 1.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zM.25 7a6.75 6.75 0 1 1 12.096 4.12l3.184 3.185a.75.75 0 1 1-1.06 1.06L11.304 12.2A6.75 6.75 0 0 1 .25 7z"></path></svg>
    );
    return (
            <div >
                <form onSubmit={(ev) => ev.preventDefault()} action="">
                    <svg role="img" height="17" width="17" aria-hidden="true" class="Svg-sc-ytk21e-0 uPxdw mOLTJ2mxkzHJj6Y9_na_ icon search-icon" viewBox="0 0 24 24"><path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path></svg>
                    <input onChange={debouncedFetchData} type="search" name="" id="" placeholder='What do you want to listen to?' >
                    </input>
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