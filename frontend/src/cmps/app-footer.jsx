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

import { removeFromCart, checkout } from "../store/car.actions"
import { UserMsg } from "./user-msg.jsx"

export function AppFooter() {
    const [isCartShown, setIsCartShown] = useState(false)
    const cart = useSelector((storeState) => storeState.carModule.cart)
    const count = useSelector((storeState) => storeState.userModule.count)
    const cartTotal = cart.reduce((acc, car) => acc + car.price, 0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [playedSeconds, setPlayedSeconds] = useState(0)
    const [volume, setVolume] = useState(1)
    const previousVolume = useRef(1)
    const [muted, setMute] = useState(false)
    const [isShuffled, setIsShuffled] = useState(false)

    useEffect(() => {
        if (isPlaying) {
            const timerId = setInterval(() => {
                setPlayedSeconds((prevSeconds) => prevSeconds + 1)
            }, 1000)

            return () => {
                clearInterval(timerId)
            }
        }
    }, [isPlaying])

    // async function onCheckout() {
    //     try {
    //         const score = await checkout(cartTotal)
    //         showSuccessMsg(`Charged, your new score: ${score.toLocaleString()}`)
    //     } catch (err) {
    //         showErrorMsg("Cannot checkout")
    //     }
    // }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`
    }

    const handlePlayClick = () => {
        setIsPlaying(!isPlaying)
    }

    const handleProgress = ({ played }) => {
        setPlayedSeconds(playedSeconds)
        setProgress(played)
    }

    const handleDuration = (duration) => {
        setDuration(duration)
    }

    const handleShuffleClick = () => {
        setIsShuffled((prevState) => !prevState)
    }

    const toggleMute = () => {
        if (volume === 0) {
            setMute(false)
            setVolume(previousVolume.current)
        } else {
            setMute(true)
            previousVolume.current = volume
            setVolume(0)
        }
    }

    const handleVolumeChange = (e) => {
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
                url="https://www.youtube.com/watch?v=SkTt9k4Y-a8"
                width="0px"
                height="0px"
                playing={isPlaying}
                volume={volume}
                muted={muted}
                onProgress={handleProgress}
                onDuration={handleDuration}
                style={{ position: "absolute", top: "-1000px" }}
            />

            <div className="song-info">
                <div className="image-container">
                    <img
                        src="https://d2y6mqrpjbqoe6.cloudfront.net/image/upload/f_auto,q_auto/media/library-400/216_636967437355378335Your_Lie_Small_hq.jpg"
                        alt=""
                    />
                </div>
                <div className="song-description">
                    <p className="title">
                        Watashitachi wa Sou Yatte Ikite Iku Jinshu na no
                    </p>
                    <p className="artist">Masaru Yokoyama</p>
                </div>
            </div>
            <div className="progress-controller">
                <div className="control-buttons">
                    <button className="icon">
                        <ShuffleIcon
                            title="Enable shuffle"
                            className={`icon shuffle-icon ${
                                isShuffled ? "icon-green" : "icon-gray"
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
                    <div className="progress-bar">
                        <div
                            className="progress"
                            style={{
                                width: `${progress * 100}%`,
                            }}></div>
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
                    <div className="progress-bar">
                        {/* <div className="progress"></div> */}
                    </div>
                </div>
            </div>

            {/* <div className="playback-bar">
                    <div>{formatTime(playedSeconds)}</div>
                    <div
                        style={{
                            background: "darkgrey",
                            width: "100%",
                            height: "5px",
                            borderRadius: "30px",
                        }}>
                        <div
                            className="playback-progress"
                            style={{
                                background: "white",
                                borderRadius: "30px",
                                width: `${progress * 100}%`,
                                height: "100%",
                            }}></div>
                    </div>
                    <div>{formatTime(duration)}</div>
                </div> */}
            {/* <button
    style={{
        backgroundColor: "white",
        borderRadius: "32px",
        width: "32px",
        height: "32px",
    }}
    onClick={handlePlayClick}
    className="icon">
    <svg
        role="img"
        height="16"
        width="16"
        aria-hidden="true"
        viewBox="0 0 16 16"
        data-encore-id="icon"
        className="Svg-sc-ytk21e-0 ldgdZj">
        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
    </svg>
</button> */}

            {/* <div className="player-controls-top">
</div> */}
        </footer>
    )
}
