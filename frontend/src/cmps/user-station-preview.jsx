
import { Link } from 'react-router-dom'
import { store } from '../store/store'
import { updateCurrentStation } from '../store/station.actions'

export function UserStationPreview({userStation}) {
function onStationPreview(userStation){
    store.dispatch(updateCurrentStation(userStation))
}
    return(
    <li onClick={()=> onStationPreview(userStation)} className="">
        <Link to={`/station/${userStation._id}`}>
            <div className="user-station-list flex">
                <img src={`${userStation.imgUrl}`} alt="" srcset="" />
                <span>
                    {userStation.name}
                </span>
            </div>
            </Link>
    </li>
    )
}