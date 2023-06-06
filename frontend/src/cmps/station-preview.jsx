import { Link } from 'react-router-dom'

import { ReactComponent as PlayIcon } from "../assets/icons/play.svg"
import { ReactComponent as PauseIcon } from "../assets/icons/pause.svg"
import { store } from '../store/store'
import { updateCurrentSong, updateCurrentStation, updateIsPlaying } from '../store/station.actions'
import { useSelector } from 'react-redux'

export function StationPreview({ station }) {
    const isPlaying = useSelector(
        (storeState) => storeState.stationModule.isPlaying
    )
    const currStation = useSelector(
        (storeState) => storeState.stationModule.station
    )
    function onStation(station) {
        store.dispatch(updateCurrentStation(station))
        console.log(station)
    }
    function onPlay(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        const currSong = station.songs[0]
        store.dispatch(updateIsPlaying(!isPlaying))
        store.dispatch(updateCurrentSong(currSong))
        store.dispatch(updateCurrentStation(station))
    }

    return (
        <Link to={`/station/${station._id}`}>
            <div onClick={() => onStation(station)} className="station-preview flex column" key={station._id}>
                <img src={`${station.imgUrl}`} alt="" />
                <div className="play">
                    {isPlaying && (station._id === currStation._id) ?
                        <span onClick={onPlay} className="icon-play flex align-center justify-center" style={{ opacity: 1,transform: 'translateY(-20px)' }}><PauseIcon title="Pause" />
                        </span>

                        :
                        <span onClick={onPlay} className="icon-play flex align-center justify-center" >
                            <PlayIcon title="Play" />
                        </span>
                    }
                </div>
                <h4>{station.name}</h4>
                <p>Lorem ipsum dotur adipis iusto nihil.</p>

            </div>
        </Link>
    )
}