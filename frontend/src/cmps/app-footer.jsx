import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { ReactComponent as PauseIcon } from "../assets/icons/pause.svg"
import { ReactComponent as PlayIcon } from "../assets/icons/play.svg"
import { ReactComponent as ShuffleIcon } from "../assets/icons/shuffle.svg"
import { ReactComponent as PrevIcon } from "../assets/icons/prev.svg"
import { ReactComponent as NextIcon } from "../assets/icons/next.svg"
import { ReactComponent as RepeatOffIcon } from "../assets/icons/repeat-off.svg"
import { ReactComponent as QueueIcon } from "../assets/icons/queue.svg"
import { ReactComponent as VolumeHighIcon } from "../assets/icons/volume-high.svg"
import { ReactComponent as VolumeMediumIcon } from "../assets/icons/volume-medium.svg"
import { ReactComponent as VolumeLowIcon } from "../assets/icons/volume-low.svg"
import { ReactComponent as VolumeOffIcon } from "../assets/icons/volume-off.svg"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import ReactPlayer from "react-player/youtube"
import Slider from "rc-slider"
import { UserMsg } from "./user-msg.jsx"
import {
    updateCurrentSong,
    updateCurrentStation,
    updateIsPlaying,
} from "../store/station.actions"
import { store } from "../store/store"
import "rc-slider/assets/index.css"
import { stationService } from "../services/station.service.local"
import { userService } from "../services/user.service"
import { SET_USER } from "../store/user.reducer"

export function AppFooter() {
    const station = useSelector(
        (storeState) => storeState.stationModule.station
    )
    const song = useSelector((storeState) => storeState.stationModule.song)
    let user = useSelector((storeState) => storeState.userModule.user)
    const isPlaying = useSelector(
        (storeState) => storeState.stationModule.isPlaying
    )
    const [played, setPlayed] = useState(0)
    const [playedSeconds, setPlayedSeconds] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [muted, setMute] = useState(false)
    // const [isPlayerReady, setIsPlayerReady] = useState(false)
    const [isPlayerLoading, setIsPlayerLoading] = useState(false)
    const [isShuffled, setIsShuffled] = useState(false)
    let [shuffledSongs, setShuffledSongs] = useState([])
    const [isRepeatOn, setIsRepeatOn] = useState(false)
    const [isRepeatOnceOn, setIsRepeatOnceOn] = useState(false)
    const playerRef = useRef(null)
    const previousVolume = useRef(1)

    useEffect(() => {
        if (played === 1) {
            setPlayedSeconds(0)
            setPlayed(0)
            onNextSong()
        }
    }, [played])

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`
    }

    const shuffleArray = (array) => {
        return array
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    }

    function handlePlayClick() {
        if (!song.url || isPlayerLoading) return
        store.dispatch(updateIsPlaying(!isPlaying))
    }

    function handleProgress({ playedSeconds, played }) {
        setPlayed(played)
        setPlayedSeconds(playedSeconds)
    }

    function handleDuration(duration) {
        setDuration(duration)
    }

    function handleSeekChange(value) {
        console.log(value)
        const newPlayedSeconds = value * duration
        setPlayed(value)
        playerRef.current.seekTo(newPlayedSeconds, "seconds")
        setPlayedSeconds(newPlayedSeconds)
    }

    function handleShuffleClick() {
        setIsShuffled(!isShuffled)
        if (!isShuffled) {
            shuffledSongs = shuffleArray(station.songs)
            setShuffledSongs(shuffledSongs)
        } else {
            shuffledSongs = []
        }
        console.log(shuffledSongs)
        console.log(!isShuffled)
    }

    function handleRepeatOn() {
        setIsRepeatOn(!isRepeatOn)
    }

    function toggleMute() {
        if (volume === 0) {
            setMute(false)
            setVolume(previousVolume.current)
        } else {
            setMute(true)
            previousVolume.current = volume
            setVolume(0)
        }
    }

    function handleVolumeChange(volume) {
        console.log(volume)
        const newVolume = volume
        setVolume(newVolume)
        if (newVolume === 0) {
            setMute(true)
        } else {
            setMute(false)
            previousVolume.current = newVolume
        }
    }
    function onNextSong() {
        const nextSong = stationService.getNextSong(
            station,
            song,
            isRepeatOn,
            isShuffled,
            shuffledSongs
        )
        if (!nextSong) return
        store.dispatch(updateCurrentSong(nextSong))
        setIsPlayerLoading(true)
    }
    function onPrevSong() {
        const prevSong = stationService.getPrevSong(
            station,
            song,
            isShuffled,
            shuffledSongs
        )
        if (!prevSong) return
        store.dispatch(updateCurrentSong(prevSong))
        setIsPlayerLoading(true)
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
        <footer className="app-footer">
            <div className="flex player">
                <ReactPlayer
                    ref={playerRef}
                    url={`https://www.youtube.com/watch?v=${song.url}`}
                    width="0px"
                    height="0px"
                    playing={isPlaying}
                    volume={volume}
                    muted={muted}
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                    onEnded={() => setPlayed(1)}
                    onReady={() => {
                        setIsPlayerLoading(false)
                        store.dispatch(updateIsPlaying(true))
                    }}
                    // onPlay={() => {
                    //     console.log("Player is playing")
                    //     setIsPlayerReady(true)
                    //     store.dispatch(updateIsPlaying(true))
                    // }}
                    // onStart={() => {
                    //     store.dispatch(updateIsPlaying(true))
                    //     console.log("Player is starting")
                    // }}
                    // onPause={() => {
                    //     console.log("Player is pausing")
                    //     setIsPlayerReady(false)
                    //     store.dispatch(updateIsPlaying(false))
                    // }}
                    style={{ position: "absolute", top: "-1000px" }}
                />

                <div className="song-info">
                    <div className="image-container">
                        <img src={`${song.imgUrl}`} alt="" />
                    </div>
                    <div className="song-description">
                        <p className="title">{`${song.title}`}</p>
                    </div>
                    <div onClick={onLike} className="song-like icon">
                        <svg
                            role="img"
                            height="16"
                            width="16"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            data-encore-id="icon"
                            className="Svg-sc-ytk21e-0 ldgdZj">
                            <path d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"></path>
                        </svg>
                    </div>
                </div>
                <div className="progress-controller">
                    <div className="control-buttons">
                        <div className="flex player-controls-left">
                            <button className="icon">
                                <ShuffleIcon
                                    onClick={handleShuffleClick}
                                    title={
                                        isShuffled
                                            ? "Disable shuffle"
                                            : "Enable shuffle"
                                    }
                                    className={`icon shuffle-icon ${
                                        isShuffled ? "icon-green" : ""
                                    }`}
                                />
                            </button>
                            <button onClick={onPrevSong} className="icon">
                                <PrevIcon
                                    title="Previous"
                                    className="icon prev-icon"
                                />
                            </button>
                        </div>

                        <button
                            onClick={handlePlayClick}
                            className="flex play-pause-icon"
                            disabled={isPlayerLoading}>
                            {isPlaying ? (
                                <PauseIcon
                                    title="Pause"
                                    className="pause-icon"
                                />
                            ) : (
                                <PlayIcon
                                    title="Play"
                                    className="play-icon svg-icon"
                                />
                            )}
                        </button>
                        <div className="flex player-controls-right">
                            <button onClick={onNextSong} className="icon">
                                <NextIcon
                                    title="Next"
                                    className="icon next-icon"
                                />
                            </button>
                            <button className="icon">
                                <RepeatOffIcon
                                    onClick={handleRepeatOn}
                                    title={
                                        isRepeatOn
                                            ? "Disable repeat"
                                            : "Enable repeat"
                                    }
                                    className={`icon repeat-off-icon ${
                                        isRepeatOn ? "icon-green" : ""
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                    <div className="progress-container">
                        <span>{formatTime(playedSeconds)}</span>

                        <div className="progress-indicator-container">
                            <Slider
                                min={0}
                                max={1}
                                step={0.01}
                                value={played}
                                onChange={handleSeekChange}
                            />

                            <div className="progress-bar">
                                <div
                                    className="progress"
                                    style={{
                                        width: `${played * 100}%`,
                                    }}></div>
                            </div>
                        </div>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
                <div className="volume-container">
                    <div className="buttons-right">
                        <button className="icon">
                            <QueueIcon
                                title="Queue"
                                className="icon queue-icon"
                            />
                        </button>
                    </div>
                    <div className="volume-indicator-container flex">
                        <button
                            onClick={toggleMute}
                            className="icon flex volume-btn">
                            {(muted && (
                                <VolumeOffIcon
                                    className="icon volume-icon"
                                    title={Math.ceil(volume * 100)}
                                />
                            )) ||
                                (volume > 0 && volume <= 0.33 && (
                                    <VolumeLowIcon
                                        className="icon volume-icon"
                                        title={Math.ceil(volume * 100)}
                                    />
                                )) ||
                                (volume > 0.33 && volume <= 0.66 && (
                                    <VolumeMediumIcon
                                        className="icon volume-icon"
                                        title={Math.ceil(volume * 100)}
                                    />
                                )) ||
                                (volume > 0.66 && (
                                    <VolumeHighIcon
                                        className="icon volume-icon"
                                        title={Math.ceil(volume * 100)}
                                    />
                                ))}
                        </button>
                        <div className="flex" title={Math.ceil(volume * 100)}>
                            <Slider
                                min={0}
                                max={1}
                                step={0.01}
                                value={volume}
                                onChange={handleVolumeChange}
                            />
                        </div>
                        <div className="volume-bar">
                            <div
                                className="volume-bar-progress"
                                style={{
                                    width: `${volume * 100}%`,
                                }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
