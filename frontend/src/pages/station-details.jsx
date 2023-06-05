
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stationService } from '../services/station.service.local.js'
import { updateCurrentStation, updateIsPlaying } from '../store/station.actions.js'
import { store } from '../store/store.js'
import { SongList } from '../cmps/song-list.jsx'
import { useSelector } from 'react-redux'

export function StationDetails() {
    const station =  useSelector(storeState => storeState.stationModule.station)
    const song =  useSelector(storeState => storeState.stationModule.song)
    const isPlaying =  useSelector(storeState => storeState.stationModule.isPlaying)

    function handlePlayClick() {
        if (!song.id) return
        store.dispatch(updateIsPlaying(!isPlaying))
    }
    async function onAddSong(){
        try{
        const newStation = await stationService.addSong(station)
        store.dispatch(updateCurrentStation(newStation))
        }catch{
            console.log('Cannot add song');
        }
    }
    return (
        <div className="station-details">
            {station._id ? (
                <><section className="top-section">
                    <img src={`${station.imgUrl}`} alt="" />
                    <div className="details">
                        <h1>{station.name}</h1>
                        <p>Artists</p>
                        <p>{`${station.songs.length} ${'\u2022'} songs`}</p>
                    </div>
                </section>
                    <section className="mid-section">
                    {isPlaying ? (
                            <button onClick={handlePlayClick}  className="play-btn"><svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 ldgdZj"><path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg></button>
                            ) : (
                            <button onClick={handlePlayClick}  className="play-btn"><svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 ldgdZj"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg></button>
                        )}
                        <button><svg role="img" height="32" width="32" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 ldgdZj"><path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path></svg></button>
                        <button className="icon" onClick={onAddSong}>Add song</button>
                    </section>
                    <section className="bottom-section">
                        <SongList
                            station={station} />
                    </section>
                </>

            ) : (
                <h1>Loading station...</h1>
            )}

        </div>
    )
}