
import { Link } from 'react-router-dom'
import { store } from '../store/store'
import { loadStations, updateCurrentStation } from '../store/station.actions'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export function UserStationPreview({ userStation }) {
    const stations = useSelector(
        (storeState) => storeState.stationModule.stations
    )
        useEffect(()=>{
            loadStations()
        },[])
    function onStationPreview(userStation) {
        console.log('userStation',userStation);
        if (!userStation.songs) {
            console.log(stations.map(station => station._id === userStation._id));
            userStation = stations.find(station => station._id === userStation._id)
        }
        store.dispatch(updateCurrentStation(userStation))
    }
    return (
        <li onClick={()=>onStationPreview(userStation)} className="">
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