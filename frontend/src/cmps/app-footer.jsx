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
import { styled } from "@mui/system"
import Slider from "@mui/material/Slider"

import { UserMsg } from "./user-msg.jsx"
import { updateIsPlaying } from "../store/station.actions"
import { store } from "../store/store"

export function AppFooter() {
    const station =  useSelector(storeState => storeState.stationModule.station)
    const song =  useSelector(storeState => storeState.stationModule.song)
    const isPlaying =  useSelector(storeState => storeState.stationModule.isPlaying)
    // const [isPlaying, setIsPlaying] = useState(false)
    const [played, setPlayed] = useState(0)
    const [playedSeconds, setPlayedSeconds] = useState(0)
    const [duration, setDuration] = useState(0)
    const playerRef = useRef(null)
    const [volume, setVolume] = useState(1)
    const previousVolume = useRef(1)
    const [muted, setMute] = useState(false)
    const [isShuffled, setIsShuffled] = useState(false)
    console.log(isPlaying);
    useEffect(() => {

        if (!isPlaying) return

        const timerId = setInterval(() => {
            setPlayedSeconds((prevSeconds) => prevSeconds + 1)
        }, 1000)

        return () => {
            clearInterval(timerId)
        }
    }, [isPlaying])

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`
    }

    const StyledSlider = styled(Slider)({
        color: "lightgreen",
        "& .MuiSlider-rail": {
            backgroundColor: "grey",
        },
    })

    function handlePlayClick() {
        if (!song.url) return
        store.dispatch(updateIsPlaying(!isPlaying))
    }

    function handleProgress({ playedSeconds }) {
        setPlayedSeconds(playedSeconds)
    }

    function handleDuration(duration) {
        setDuration(duration)
    }

    function handleSeekChange(e) {
        console.log(e)
        const newPlayed = +e.target.value
        const newPlayedSeconds = newPlayed * duration
        console.log(newPlayed)
        setPlayed(newPlayed)
        playerRef.current.seekTo(newPlayedSeconds, "seconds")
        console.log(newPlayedSeconds)
        setPlayedSeconds(newPlayedSeconds)
    }

    function handleShuffleClick() {
        setIsShuffled((prevState) => !prevState)
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

    function handleVolumeChange(e) {
        const newVolume = +e.target.value
        setVolume(newVolume)
        if (newVolume === 0) {
            setMute(true)
        } else {
            setMute(false)
            previousVolume.current = newVolume
        }
    }

    return (
        <footer className="app-footer">
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
                style={{ position: 'absolute', top: '-1000px' }}
            />

            <div className="song-info">
                <div className="image-container">
                    <img
                        src={`${song.imgUrl}`}
                        alt=""
                    />
                </div>
                <div className="song-description">
                    <p className="title">
                        {`${song.title}`}
                    </p>
                    <p className="artist">Masaru Yokoyama</p>
                </div>
            </div>
            <div className="progress-controller">
                <div className="control-buttons">
                    <button className="icon">
                        <ShuffleIcon
                            title="Enable shuffle"
                            className={`icon shuffle-icon ${isShuffled ? "icon-green" : "icon-gray"
                                }`}
                        />
                    </button>
                    <button className="icon">
                        <PrevIcon title="Previous" className="icon prev-icon" />
                    </button>
                    <button
                        onClick={handlePlayClick}
                        className="play-pause-icon">
                        {isPlaying ? (
                            <PauseIcon title="Pause" className="pause-icon" />
                        ) : (
                            <PlayIcon title="Play" className="play-icon" />
                        )}
                    </button>

                    <button className="icon">
                        <NextIcon title="Next" className="icon next-icon" />
                    </button>
                    <button className="icon">
                        <RepeatOffIcon
                            title="Enable repeat"
                            className="icon repeat-off-icon"
                        />
                    </button>
                </div>
                <div className="progress-container">
                    <span>{formatTime(playedSeconds)}</span>

                    {/* <StyledSlider
                        min={0}
                        max={1}
                        step={0.01}
                        value={played}
                        onChange={handleSeekChange}
                    /> */}

                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={played}
                        onChange={handleSeekChange}
                    />

                    <div className="progress-bar">
                        <div
                            className="progress"
                            style={{ width: `${played * 100}%` }}>
                        </div>
                    </div>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
            <div className="controls-right">
                <div className="volume-bar">
                    <button className="icon">
                        <QueueIcon title="Queue" className="icon queue-icon" />
                    </button>

                    <button onClick={toggleMute} className="icon">
                        {(muted && (
                            <VolumeOffIcon className="icon volume-icon" />
                        )) ||
                            (volume > 0 && volume <= 0.33 && (
                                <VolumeLowIcon className="icon volume-icon" />
                            )) ||
                            (volume > 0.33 && volume <= 0.66 && (
                                <VolumeMediumIcon className="icon volume-icon" />
                            )) ||
                            (volume > 0.66 && (
                                <VolumeHighIcon className="icon volume-icon" />
                            ))}
                    </button>

                    <input
                        type="range"
                        name=""
                        className=""
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                    <div className="progress-bar"></div>
                </div>
            </div>
        </footer>
    )
}
