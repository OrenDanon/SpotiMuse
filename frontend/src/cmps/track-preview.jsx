export function TrackPreview({track,idx}){
    return(
        <tr className="track-preview">
            <td>{idx+1}
            </td>
            <td className="flex">
                <img src={`${track.imgUrl}`} alt="" />
                <div>
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