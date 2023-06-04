import { updateCurrentSong } from '../store/station.actions'
import { store } from '../store/store.js'

export function SongPreview({song,idx}){

    function onSong(song){
        store.dispatch(updateCurrentSong(song))
    }

    return(
        <tr onClick={() => onSong(song)} className="song-preview">
            <td>{idx+1}
            </td>
            <td className="song-title">
                <div className="flex">
                <img src={`${song.imgUrl}`} alt="" />
                    <p>{song.title}</p>
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