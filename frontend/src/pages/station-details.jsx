import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { stationService } from "../services/station.service.local.js"
import {
    loadStation,
    loadStations,
    updateCurrentStation,
    updateIsPlaying,
    updateStations,
} from "../store/station.actions.js"
import { store } from "../store/store.js"
import { SongList } from "../cmps/song-list.jsx"
import { useSelector } from "react-redux"
import { useState } from "react"
import { AppHeader } from "../cmps/app-header.jsx"
import { DropdownModal } from "../cmps/dropdown-modal.jsx"
import { EditModal } from "../cmps/edit-modal.jsx"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Search } from "../cmps/search.jsx"
import { FastAverageColor } from "fast-average-color"
import { useRef } from "react"
import { loadUser } from "../store/user.actions.js"
import {
    updateIsEditModalShown,
    updateIsDropdownModalShown,
} from "../store/station.actions"
import { userService } from "../services/user.service"
import { SET_USER } from "../store/user.reducer"
import { Link } from "react-router-dom"
import { socketService } from "../services/socket.service.js"

export function StationDetails() {
    // useEffect(
    //     () => {
    //         const topSection = document.querySelector('.top-section')
    //         const header = document.querySelector('.header')
    //         const btnPlay = document.querySelector('.btn-play-header')

    //         if (topSection && header && btnPlay) {
    //         const headerObserver = new IntersectionObserver(onHeaderObserved, {
    //             rootMargin: "-100px 0px 0px"
    //         })
    //         headerObserver.observe(topSection)

    //             function onHeaderObserved(entries) {
    //                 entries.forEach((entry) => {
    //                     header.style.backgroundImage = entry.isIntersecting ? 'inherit' : 'linear-gradient(rgb(75,28,28),rgb(18,18,18,1))'
    //                     btnPlay.style.opacity = entry.isIntersecting ? '0' : '1'
    //                 })
    //             }
    //         }
    //     }
    //     , [])
    const station = useSelector(
        (storeState) => storeState.stationModule.station
    )
    let stations = useSelector(
        (storeState) => storeState.stationModule.stations
    )
    const song = useSelector((storeState) => storeState.stationModule.song)
    const user = useSelector((storeState) => storeState.userModule.user)
    const isPlaying = useSelector(
        (storeState) => storeState.stationModule.isPlaying
    )
    const isEditModalShown = useSelector(
        (storeState) => storeState.stationModule.isEditModalShown
    )

    const isDropdownModalShown = useSelector(
        (storeState) => storeState.stationModule.isDropdownModalShown
    )

    const params = useParams()


    const fac = new FastAverageColor();
    const bgColor = useAverageColor(station.imgUrl);
    console.log(bgColor);
    changeBgColor(bgColor)

    function useAverageColor(dom) {
        const [color, setColor] = useState(null);
        
        useEffect(() => {
            fac
            .getColorAsync(dom)
          .then(result => {
              const color = result.rgb;
            setColor(color);
        })
        .catch(error => {
            console.log(error);
          });
        }, [dom]);
    
        return color;
    }
    
    
function changeBgColor(color){
    let root =document.querySelector(':root')
    root.style.setProperty("--bg-color",color)
}


    useEffect(() => {
        loadStation(params.id)
        setStationSocket(params.id)
        // loadUser()
        store.dispatch(updateIsDropdownModalShown(false))
    }, [])

    function setStationSocket(stationId) {
        socketService.emit('user-set-station', stationId)
        socketService.on('update-station', station => {
            store.dispatch(updateCurrentStation(station))
        })
    }


    function handlePlayClick() {
        if (!song.id) return
        store.dispatch(updateIsPlaying(!isPlaying))
    }
    async function onAddSong() {
        try {
            const newStation = await stationService.addSong(station)
            store.dispatch(updateCurrentStation(newStation))
        } catch {
            console.log("Cannot add song")
        }
    }

    async function onDelete() {
        try {
            await stationService.remove(station._id)
            stations = stations.filter(currStation => (currStation._id !== station._id))
            store.dispatch(updateStations(stations))
            const userIdx = userService.getLoggedinUser()._id
            let user = await userService.getById(userIdx)
            if (station.createdBy._id === userIdx) {
                user.stations = user.stations.filter(
                    (currStation) => currStation._id !== station._id
                )
                await userService.save(user)
                store.dispatch({ type: SET_USER, user })
            }
        } catch (err) {
            console.log("Can not remove station", err)
        } finally {
            onClose()
        }
    }

    function handleEditModalOpen() {
        store.dispatch(updateIsEditModalShown(!isEditModalShown))
        store.dispatch(updateIsDropdownModalShown(!isDropdownModalShown))
    }

    const onClose = () => {
        store.dispatch(updateIsDropdownModalShown(!isDropdownModalShown))
    }

    function showDropdownModal() {
        store.dispatch(updateIsDropdownModalShown(!isDropdownModalShown))
    }
    function isLikedSongStation() {
        if (!user.stations) return
        return user.stations[0]._id === station._id
    }

    return (

        <div className="station-details">
            <AppHeader />
            {station?._id ? (
                <>
                    <section className="top-section flex column">
                        <div className="flex">
                            <img src={`${station.imgUrl}`} alt="" />
                            <div className="details">
                                <p>Playlist</p>
                                <h1>{station.name}</h1>
                                <p>

                                    {station.createdBy?.fullname}
                                    <span>{`${"\u2022"}`}</span>
                                    {`${station.songs?.length} songs,`}
                                    <span className="songs-duration">
                                    {`${stationService.totalSongsDuration(station)}`}
                                    </span>

                                </p>
                            </div>
                        </div>
                    </section>
                    <div className="list-section">
                        <section className="mid-section">
                            {isPlaying ? (
                                <button
                                    onClick={handlePlayClick}
                                    className="play-btn">
                                    <svg
                                        role="img"
                                        height="28"
                                        width="28"
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        data-encore-id="icon"
                                        className="Svg-sc-ytk21e-0 ldgdZj">
                                        <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
                                    </svg>
                                </button>
                            ) : (
                                <button
                                    onClick={handlePlayClick}
                                    className="play-btn">
                                    <svg
                                        role="img"
                                        height="28"
                                        width="28"
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        data-encore-id="icon"
                                        className="Svg-sc-ytk21e-0 ldgdZj">
                                        <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                                    </svg>
                                </button>
                            )}
                            {isLikedSongStation() ? (
                                <div></div>
                            ) : (
                                <div className="dropdown-container">
                                    <button
                                        onClick={showDropdownModal}
                                        className="btn-dropdown">
                                        <svg
                                            role="img"
                                            height="32"
                                            width="32"
                                            aria-hidden="true"
                                            viewBox="0 0 24 24"
                                            data-encore-id="icon"
                                            className="Svg-sc-ytk21e-0 ldgdZj">
                                            <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
                                        </svg>
                                    </button>
                                    {isDropdownModalShown && (
                                        <div className="dropdown-modal">
                                            <DropdownModal>
                                                <li
                                                    onClick={
                                                        handleEditModalOpen
                                                    }>
                                                    Edit details
                                                </li>
                                                <Link to={`/`}>
                                                    <li onClick={onDelete}>
                                                        Delete
                                                    </li>
                                                </Link>
                                            </DropdownModal>
                                        </div>
                                    )}
                                </div>
                            )}
                            {isEditModalShown && <EditModal />}
                            {/* <button className="icon" onClick={onAddSong}>
                                Add song
                            </button> */}
                        </section>
                        <section className="bottom-section">
                            <SongList station={station} />
                        </section>
                        {isLikedSongStation() ? <div></div>
                            :
                            <div className="search-section">
                                <h2>Let's find something for your playlist</h2>
                                <Search />
                            </div>
                        }
                    </div>
                </>
            ) : (
                <h1>Loading station...</h1>
            )}
        </div>
    )
}
