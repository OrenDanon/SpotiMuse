import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { stationService } from "../services/station.service.local"
import {
    updateCurrentSong,
    updateCurrentStation,
    updateIsPlaying,
    updateIsStationsDropdownShown,
} from "../store/station.actions"
import { store } from "../store/store.js"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { userService } from "../services/user.service"
import { SET_USER } from "../store/user.reducer"
import { DropdownModal } from "../cmps/dropdown-modal.jsx"
dayjs.extend(relativeTime)

export function SongPreview({ song, idx }) {
    const station = useSelector(
        (storeState) => storeState.stationModule.station
    )
    const stations = useSelector(
        (storeState) => storeState.stationModule.stations
    )
    let user = useSelector((storeState) => storeState.userModule.user)
    const currSong = useSelector((storeState) => storeState.stationModule.song)
    const isPlaying = useSelector(
        (storeState) => storeState.stationModule.isPlaying
    )
    const isStationsDropdownShown = useSelector(
        (storeState) => storeState.stationModule.isStationsDropdownShown
    )

        // const [isStationModalShown, setStationModalShown] = useState(false)
        // const [isEditDeletedropdownShown ,setEditDeleteDropdownShown] = useState(false)

    const location = useLocation()

    useEffect(() => {
        // store.dispatch(updateIsDropdownModalShown(false))
        store.dispatch(updateIsStationsDropdownShown(false))
    }, [])

    function timeAgo(timestamp) {
        return dayjs(timestamp).fromNow()
    }

    function onSong(song) {
        console.log(song)
        store.dispatch(updateCurrentSong(song))
    }
    function onPlay() {
        store.dispatch(updateIsPlaying(!isPlaying))
        store.dispatch(updateCurrentSong(song))
    }
    async function onRemove(station, song) {
        try {
            const newStation = await stationService.removeSong(station, song.id)
            console.log(newStation)
            store.dispatch(updateCurrentStation(newStation))
        } catch {
            console.log("Cannot add song")
        }
    }
    async function onAddToStation(toStationId) {
        try {
            song.addedAt = Date.now()
            const toStation = await stationService.getById(toStationId)
            toStation.songs.push(song)
            stationService.save(toStation)
        } catch (err) {
            console.log("Can not add song to playlist")
        }
    }

    // function showEditDeleteDropdown() {
    //     store.dispatch(updateIsDropdownModalShown(!isDropdownModalShown))
    //     setEditDeleteDropdownShown(!isEditDeletedropdownShown)
    // }

    function showStationsDropdownModal() {
        store.dispatch(updateIsStationsDropdownShown(!isStationsDropdownShown))
    }

    async function onLike() {
        if (
            user.stations[0].songs.some((currSong) => currSong.id === song.id)
        ) {
            user.stations[0].songs = user.stations[0].songs.filter(
                (currSong) => currSong.id !== song.id
            )
        } else user.stations[0].songs.push(song)
        try {
            user = await userService.save(user)
            console.log("savedUser", user)
            store.dispatch({ type: SET_USER, user })
            if (station._id === user.stations[0]._id) {
                store.dispatch(updateCurrentStation(user.stations[0]))
            }
        } catch (err) {
            console.error("Can not save song", err)
        }
    }

    return (
        <>
            <div className="flex">
                <td className="flex song-idx">{idx + 1}</td>
                <td onClick={onPlay} className="flex icon display-none play">
                    {isPlaying && song.id === currSong.id ? (
                        <svg
                            role="img"
                            height="24"
                            width="24"
                            aria-hidden="true"
                            class="Svg-sc-ytk21e-0 ldgdZj UIBT7E6ZYMcSDl1KL62g"
                            viewBox="0 0 24 24"
                            data-encore-id="icon">
                            <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
                        </svg>
                    ) : (
                        <svg
                            role="img"
                            height="24"
                            width="24"
                            aria-hidden="true"
                            class="Svg-sc-ytk21e-0 ldgdZj UIBT7E6ZYMcSDl1KL62g"
                            viewBox="0 0 24 24"
                            data-encore-id="icon">
                            <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                        </svg>
                    )}
                </td>
            </div>
            <td className="song-title flex">
                <div className="flex align-center ">
                    <img src={`${song.imgUrl}`} alt="" />
                    <div className="flex column">
                        <p>{song.title}</p>
                        <span>Artist</span>
                    </div>
                </div>
            </td>
            <td onClick={onAddToStation} className="flex">
                Album
            </td>
            <td className="flex">
                {timeAgo(song.addedAt) ? timeAgo(song.addedAt) : ""}
                {/* {isDropdownModalShown && location.pathname === "/search" ? (
                    <div className="dropdown-modal">
                        <DropdownModal>
                            <li>Add song to playlist</li>
                        </DropdownModal>
                    </div>
                ) : (
                    ""
                )} */}
            </td>
            <td className="flex">
                <div onClick={onLike} className="like icon hidden">
                    <svg
                        role="img"
                        height="16"
                        width="16"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        data-encore-id="icon"
                        class="Svg-sc-ytk21e-0 ldgdZj">
                        <path d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"></path>
                    </svg>
                </div>
                <div className="time icon">3:10</div>
                <div className="dropdown-container">
                    <div
                        // onClick={showEditDeleteDropdown}
                        onClick={() => onRemove(station, song)}

                        className="right-section icon hidden">
                        <svg
                            role="img"
                            height="16"
                            width="16"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            data-encore-id="icon"
                            class="Svg-sc-ytk21e-0 ldgdZj">
                            <path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                        </svg>
                    </div>
                    <button onClick={showStationsDropdownModal}>Add</button>           
                </div>
            </td>
            {isStationsDropdownShown ? (
                <div className="dropdown-modal">
                    <DropdownModal>
                        {stations.map((station, idx) => (
                            <li onClick={() => onAddToStation(station._id)} key={idx}>{station.name}</li>
                        ))}
                    </DropdownModal>
                </div>
            ) : null}
            {/* {isDropdownModalShown ? (
                location.pathname === "/search" ? (
                    <div className="dropdown-modal">
                        <DropdownModal>
                            <li>Add song to playlist</li>
                        </DropdownModal>
                    </div>
                ) : (
                    <div className="dropdown-modal">
                        <DropdownModal>
                            <li onClick={() => onRemove(station, song)}>
                                Delete song from playlist
                            </li>
                        </DropdownModal>
                    </div>
                )
            ) : null} */}
        </>
    )
}
