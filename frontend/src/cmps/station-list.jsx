import { StationPreview } from "./station-preview";

export function StationList({ stations }) {
    return (
        <div className="station-list">
            {stations.map(station =>
                <StationPreview
                    station={station} />
            )
            }
        </div >
    )
}