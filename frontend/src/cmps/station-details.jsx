import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js';
import { stationService } from '../services/station.service.local.js';
import { TrackList } from './track-list.jsx';

export function StationDetails() {
    const params = useParams();
    const [station, setStation] = useState(null);

    useEffect(() => {
        loadStation();
    }, []);

    async function loadStation() {
        try {
            const fetchedStation = await stationService.getById(params.id);
            setStation(fetchedStation);
        } catch (err) {
            showErrorMsg('Cannot load station');
        }
    }

    return (
        <div className="station-details">
            {station ? (
                <><section className="top-section">
                    <img src="https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg" alt="" />
                    <div className="details">
                        <h1>{station.name}</h1>
                        <p>Artists</p>
                        <p>{`${station.songs.length}, songs`}</p>
                    </div>
                </section>
                    <section className="mid-section">
                        <button className="play-btn"><svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 ldgdZj"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg></button>
                        <button><svg role="img" height="32" width="32" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 ldgdZj"><path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg></button>
                    </section>
                    <section className="bottom-section">
                        <TrackList
                        station={station}/>
                    </section>
                    </>
                    
            ) : (
                <h1>Loading station...</h1>
            )}
            
        </div>
    );
}