import { Link } from 'react-router-dom'

import { ReactComponent as PlayIcon } from "../assets/icons/play.svg"
import { store } from '../store/store'
import { updateCurrentStation } from '../store/station.actions'

export function StationPreview({ station }) {

    function onStation(station){
        store.dispatch(updateCurrentStation(station))
        console.log(station)
    }

    return (
            <Link to={`/station/${station._id}`}>
        <div onClick={()=>onStation(station)}  className="station-preview" key={station._id}>
            <img src="https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg" alt="" />
            <div className="play">
                <span className="fa fa-play flex align-center justify-center"><PlayIcon title="Play" />
                </span>
            </div>
            <h4>{station.name}</h4>
            <p>Lorem ipsum dotur adipis iusto nihil.</p>
            
        </div>
        </Link>
    )
}