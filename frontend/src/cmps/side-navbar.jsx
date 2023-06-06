import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { utilService } from '../services/util.service';
import { UserStationList } from './user-station-list';
import { stationService } from '../services/station.service.local';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { store } from '../store/store';
import { updateCurrentStation } from '../store/station.actions';
import { useSelector } from 'react-redux';

export function SideNavbar() {
    const [userStations, setUserStations] = useState(utilService.loadFromStorage('userdb'))
    const station =  useSelector(storeState => storeState.stationModule.station)

    async function onAddStation() {
        const newStation = stationService.getEmptyStation()
        try {
            const savedStation = await stationService.save(newStation)
            setUserStations(prevUserStations => [...prevUserStations, savedStation]);
            store.dispatch(updateCurrentStation(savedStation))
            showSuccessMsg(`Station added (id: ${savedStation._id})`)
        } catch (err) {
            showErrorMsg('Cannot add station')
        }
    }


    return (
        <div className="side-navbar flex column ">
            <section className="side-navbar-main flex column">
                <div className="navigation">
                    <ul>
                        <li>
                            <Link to="/">
                                <span className="icon home"><svg role="img" height="24" width="24" aria-hidden="true" class="Svg-sc-ytk21e-0 ldgdZj home-active-icon" viewBox="0 0 24 24" data-encore-id="icon"><path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"></path></svg></span>
                                <span className="">Home</span>
                            </Link>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon"><svg role="img" height="24" width="24" aria-hidden="true" class="Svg-sc-ytk21e-0 ldgdZj search-icon" viewBox="0 0 24 24" data-encore-id="icon"><path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path></svg></span>
                                <span className="search">Search</span>
                            </a>
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
                                            <span className="icon"><svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 ldgdZj"><path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path></svg></span>
                                            <span className="library flex">Your Library</span>
                                        </a>
                                    </li>
                                    <li onClick={onAddStation} className="add-library">
                                        <Link to={`/station/${station._id}`}>
                                            <span className="icon"><svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 ldgdZj"><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path></svg></span>
                                        </Link>
                                    </li>

                                </ul>
                            </header>
                            <div>
                                <UserStationList
                                    userStations={userStations} />
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}