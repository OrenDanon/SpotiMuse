import { useEffect, useRef, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { utilService } from "../services/util.service"
import { UserStationList } from "./user-station-list"
import { stationService } from "../services/station.service.local"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { ReactComponent as ActiveHomeIcon } from "../assets/icons/active-home.svg"
import { ReactComponent as HomeIcon } from "../assets/icons/home.svg"
import { ReactComponent as ActiveSearchIcon } from "../assets/icons/active-search.svg"
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg"
import { store } from "../store/store"
import { updateCurrentStation, updateStations } from "../store/station.actions"
import { useSelector } from "react-redux"
import { userService } from "../services/user.service"
import { storageService } from "../services/async-storage.service"
import { SET_USER } from "../store/user.reducer"
import { loadUser } from "../store/user.actions"

export function SideNavbar() {
    const station = useSelector(
        (storeState) => storeState.stationModule.station
    )
    // const stations = useSelector(
    //     (storeState) => storeState.stationModule.stations
    // )
    const user = useSelector((storeState) => storeState.userModule.user)
    const location = useLocation()

    async function onAddStation() {
        const newStation = stationService.getEmptyStation()
        try {
            const savedStation = await stationService.save(newStation)
            store.dispatch(updateCurrentStation(savedStation))
            const miniStation = {
                _id: savedStation._id,
                imgUrl: savedStation.imgUrl,
                name: savedStation.name,
            }

            user.stations.push(miniStation)
            user = await userService.save(user)
            store.dispatch({
                type: SET_USER,
                user,
            })

            showSuccessMsg(`Station added (id: ${savedStation._id})`)
        } catch (err) {
            showErrorMsg("Cannot add station")
        }
    }

    return (
        <div className="side-navbar flex column ">
            <section className="side-navbar-main flex column">
                <div className="navigation">
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                className={
                                    location.pathname === "/"
                                        ? "active-route"
                                        : ""
                                }>
                                {/* <span className="icon"> */}
                                    {location.pathname === "/" ? (
                                        <ActiveHomeIcon className="icon" />
                                    ) : (
                                        <HomeIcon className="icon" />
                                    )}
                                {/* </span> */}
                                <span className="">Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/search`}
                                className={
                                    location.pathname === "/"
                                        ? "active-route"
                                        : ""
                                }>
                                    {location.pathname === "/search" ? (
                                        <ActiveSearchIcon className="icon"/>
                                    ) : (
                                        <SearchIcon className="icon"/>
                                    )}
                                
                                <span className="search">Search</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="navigation library flex column">
                    <div className="flex">
                        <div>
                            <header className="flex">
                                <ul className="flex">
                                    <li className="flex">
                                        <a href="#">
                                            <span className="icon">
                                                <svg
                                                    role="img"
                                                    height="24"
                                                    width="24"
                                                    aria-hidden="true"
                                                    viewBox="0 0 24 24"
                                                    data-encore-id="icon"
                                                    class="Svg-sc-ytk21e-0 ldgdZj">
                                                    <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
                                                </svg>
                                            </span>
                                            <span className="library flex">
                                                Your Library
                                            </span>
                                        </a>
                                    </li>
                                    <li
                                        onClick={onAddStation}
                                        className="add-library">
                                        <NavLink to={`/station/${station._id}`}>
                                            <span className="icon">
                                                <svg
                                                    role="img"
                                                    height="16"
                                                    width="16"
                                                    aria-hidden="true"
                                                    viewBox="0 0 16 16"
                                                    data-encore-id="icon"
                                                    class="Svg-sc-ytk21e-0 ldgdZj">
                                                    <path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path>
                                                </svg>
                                            </span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </header>
                            <div>
                                {user?.stations?.length ? (
                                    <UserStationList
                                        userStations={user.stations}
                                    />
                                ) : (
                                    "Loading..."
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
