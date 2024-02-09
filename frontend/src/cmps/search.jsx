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
    const [term, setTerm] = useState('')

    const debouncedFetchData = useDebouncedCallback(fetchData, 500)

    useEffect(() => {
        debouncedFetchData()
    }, [term])

    function handleChange(ev) {
        const songName = ev.target.value.toLowerCase()
        setTerm(songName)
    }

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
                console.log('Response', response)
                const videoIds = response.data.items.map(item => item.id.videoId);
                const videosResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                    params: {
                        part: 'contentDetails',
                        key: YT_KEY,
                        id: videoIds.join(',')
                    }
                });
                const durations = videosResponse.data.items.map(item => item.contentDetails.duration)
                const station = stationService.dataTransform(response.data.items,durations)
                setData(station);
                cache[term] = station
                utilService.saveToStorage('cache', cache)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    return (
        <div >
            <form onSubmit={(ev) => ev.preventDefault()} action="">
                <svg role="img" height="17" width="17" aria-hidden="true" className="Svg-sc-ytk21e-0 uPxdw mOLTJ2mxkzHJj6Y9_na_ icon search-icon" viewBox="0 0 24 24"><path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path></svg>
                <input onChange={handleChange} type="search" name="" id="" placeholder='What do you want to listen to?' >
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