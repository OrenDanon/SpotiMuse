import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import ReactPlayer from "react-player/youtube"

import { removeFromCart, checkout } from "../store/car.actions"
import { UserMsg } from "./user-msg.jsx"

// import playIcon from "../assets/icons/play.svg"
// import shuffleIcon from "../assets/icons/shuffle.svg"
// import volumeHighIcon from "../assets/icons/volume-high.svg"
// import queueIcon from "../assets/icons/queue.svg"
// import repeatOffIcon from "../assets/icons/repeat-off.svg"
// import repeatOnceIcon from "../assets/icons/repeat-once.svg"
// import nextIcon from "../assets/icons/next.svg"
// import prevIcon from "../assets/icons/prev.svg"

export function AppFooter() {
    const [isCartShown, setIsCartShown] = useState(false)
    const cart = useSelector((storeState) => storeState.carModule.cart)
    const count = useSelector((storeState) => storeState.userModule.count)
    const cartTotal = cart.reduce((acc, car) => acc + car.price, 0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [playedSeconds, setPlayedSeconds] = useState(0)

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

    return (
        <footer className="app-footer">
            <ReactPlayer
                url="https://www.youtube.com/watch?v=SkTt9k4Y-a8"
                width="0px"
                height="0px"
                playing={isPlaying}
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
                        <svg
                            role="img"
                            height="16"
                            width="16"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            data-encore-id="icon"
                            className="icon shuffle-icon">
                            <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"></path>
                            <path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z"></path>
                        </svg>
                    </button>
                    <button className="icon">
                        <svg
                            role="img"
                            height="16"
                            width="16"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            data-encore-id="icon"
                            className="icon prev-icon">
                            <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
                        </svg>
                    </button>
                    <button onClick={handlePlayClick} className="play-pause-icon">
                        <svg
                            role="img"
                            height="16"
                            width="16"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            data-encore-id="icon"
                            className="play-icon">
                            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
                        </svg>
                    </button>
                    <button className="icon">
                        <svg
                            role="img"
                            height="16"
                            width="16"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            data-encore-id="icon"
                            className="icon next-icon">
                            <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
                        </svg>
                    </button>
                    <button className="icon">
                        <svg
                            role="img"
                            height="16"
                            width="16"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            data-encore-id="icon"
                            className="icon repeat-off-icon">
                            <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"></path>
                        </svg>
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
                        <svg
                            role="img"
                            height="16"
                            width="16"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            data-encore-id="icon"
                            className="icon queue-icon">
                            <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z"></path>
                        </svg>
                    </button>
                    <button className="icon">
                        <svg
                            role="img"
                            height="16"
                            width="16"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            data-encore-id="icon"
                            className="icon volume-high-icon">
                            <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
                            <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
                        </svg>
                    </button>
                    <div className="progress-bar">
                        <div className="progress"></div>
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
    <img className="icon" src={playIcon} />
    <img className="icon" src={shuffleIcon} />
    <img className="icon" src={repeatOffIcon} />
    <img className="icon" src={nextIcon} />
    <img className="icon" src={prevIcon} />
</div> */}
        </footer>
    )
}
