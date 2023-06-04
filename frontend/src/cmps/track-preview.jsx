export function TrackPreview({track,idx}){
    return(
        <tr className="track-preview">
            <td>{idx+1}
            </td>
            <td className="track-title">
                <div className="flex">
                <img src={`${track.imgUrl}`} alt="" />
                    <p>{track.title}</p>
                    <p>Artist</p>
                </div>
            </td>
            <td>
                Album
            </td>
            <td>
                3:10
            </td>
        </tr>
    )
}