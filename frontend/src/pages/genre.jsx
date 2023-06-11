import { useParams } from "react-router-dom"
import { StationList } from "../cmps/station-list"
import { useSelector } from "react-redux"

export function Genre(){
    const stations = useSelector(
        (storeState) => storeState.stationModule.stations
    )
    const params = useParams()
    const genreStations = stations.filter(station => {
        const filteredTags = station.tags.filter(tag => tag === params.genre);
        return filteredTags.length > 0; // Return true if any matching tags are found
    });
    console.log(genreStations);

    return(
        <div className="genre">
            <h1>{params.genre}</h1>
            <StationList 
            stations={genreStations}/>
        </div>
    )
}