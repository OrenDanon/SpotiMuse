import { UserStationPreview } from "./user-station-preview";

export function UserStationList({userStations}) {
    return (
        <ul className="user-station-list">
            {userStations.map(userStation=>
                <UserStationPreview
                userStation={userStation}/>
                )}
        </ul>
    )
}