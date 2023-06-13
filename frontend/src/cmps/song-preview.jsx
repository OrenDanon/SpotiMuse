import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { stationService } from "../services/station.service.local"
import {
    updateCurrentSong,
    updateCurrentStation,
    updateIsPlaying,
} from "../store/station.actions"
import { store } from "../store/store.js"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { userService } from "../services/user.service"
import { SET_USER } from "../store/user.reducer"
import { DropdownModal } from "../cmps/dropdown-modal.jsx"
import useOnClickOutside from "../customHooks/useOnClickOutside"

dayjs.extend(relativeTime)

export function SongPreview({ song, idx }) {
    console.log("SongPreview is rendering")
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

    const [isDropdownShown, setIsDropdownShown] = useState(false)
    const dropdownRef = useRef()
    useOnClickOutside(dropdownRef, () => setIsDropdownShown(false))


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
            const songIdx = station.songs.findIndex(
                (currSong) => currSong.id === song.id
            )
            const newStation = await stationService.removeSong(station, songIdx)
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
            store.dispatch(updateCurrentStation(toStation))
        } catch (err) {
            console.log("Can not add song to playlist")
        } finally {
            setIsDropdownShown(false)
        }
    }

    function showStationsDropdownModal() {
        setIsDropdownShown(!isDropdownShown)
    }

    async function onLike() {
        if (
            user.stations[0].songs.some((currSong) => currSong.id === song.id)
        ) {
            user.stations[0].songs = user.stations[0].songs.filter(
                (currSong) => currSong.id !== song.id
            )
        } else {
            user.stations[0].songs.push(song)
            const songIdx = user.stations[0].songs.findIndex(
                (currSong) => currSong.id === song.id
            )
            user.stations[0].songs[songIdx].addedAt = Date.now()
        }
        try {
            user = await userService.save(user)
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
            <div className="flex justify-center play-animateds">
                {isPlaying && song.id === currSong.id ? (
                    <td className="flex equaliser-animated">
                        <img
                            className="equaliser-animated"
                            width="14"
                            height="14"
                            alt=""
                            src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif"></img>
                    </td>
                ) : (
                    <td className="flex song-idx">{idx + 1}</td>
                )}

                <td className="flex icon display-none play">
                    {isPlaying && song.id === currSong.id ? (
                        <svg onClick={onPlay} 
                            role="img"
                            height="24"
                            width="24"
                            aria-hidden="true"
                            className="Svg-sc-ytk21e-0 ldgdZj UIBT7E6ZYMcSDl1KL62g "
                            viewBox="0 0 24 24"
                            data-encore-id="icon">
                            <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
                        </svg>
                    ) : (
                        <svg onClick={onPlay} 
                            role="img"
                            height="24"
                            width="24"
                            aria-hidden="true"
                            className="Svg-sc-ytk21e-0 ldgdZj UIBT7E6ZYMcSDl1KL62g"
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
                        {isPlaying && song.id === currSong.id ? (
                            <p style={{ color: "rgb(30, 215, 96)" }}>
                                {song.title}
                            </p>
                        ) : (
                            <p>{song.title}</p>
                        )}
                    </div>
                </div>
            </td>
            {/* <td onClick={onAddToStation} className="flex album">
                Album
            </td> */}
            <td className="flex added-at ">
                {timeAgo(song.addedAt) ? timeAgo(song.addedAt) : ""}
            </td>
            <td className="flex right-options">
                <div onClick={onLike} className="like icon flex">
                    {user.stations[0].songs.find(
                        (songUser) => songUser.id === song.id
                    ) ? (
                        <svg
                            role="img"
                            height="16"
                            width="16"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            data-encore-id="icon"
                            className="Svg-sc-ytk21e-0 haNxPq green-like">
                            <path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path>
                        </svg>
                    ) : (
                        <svg
                            role="img"
                            height="16"
                            width="16"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            data-encore-id="icon"
                            className="Svg-sc-ytk21e-0 ldgdZj hidden">
                            <path d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"></path>
                        </svg>
                    )}
                </div>
                <div
                    onClick={() => onRemove(station, song)}
                    className="right-section icon hidden">
                    <svg
                        role="img"
                        height="16"
                        width="16"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        data-encore-id="icon"
                        className="Svg-sc-ytk21e-0 ldgdZj">
                        <path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                    </svg>
                </div>
                <div className="time icon">{song.duration}</div>
                <div
                    onClick={() => onRemove(station, song)}
                    className="right-section icon display-none">
                    <svg
                        role="img"
                        height="16"
                        width="16"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        data-encore-id="icon"
                        className="Svg-sc-ytk21e-0 ldgdZj">
                        <path d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                    </svg>
                </div>
                <button onClick={showStationsDropdownModal} className="add-btn">
                    Add
                </button>
            </td>
            <div className="add-song-dropdown">
                {isDropdownShown ? (
                    <div className="dropdown-modal" ref={dropdownRef}>
                        <DropdownModal>
                            {stations.map((station, idx) => (
                                <li
                                    onClick={() => onAddToStation(station._id)}
                                    key={idx}>
                                    {station.name}
                                </li>
                            ))}
                        </DropdownModal>
                    </div>
                ) : null}
            </div>
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
