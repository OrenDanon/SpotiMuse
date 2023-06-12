import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadCars, addCar, updateCar, removeCar, addToCart, loadStations } from '../store/station.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stationService } from '../services/station.service.local.js'
import { StationList } from '../cmps/station-list.jsx'
import { AppHeader } from '../cmps/app-header.jsx'
import { userService } from '../services/user.service.js'
import { store } from '../store/store.js'
import { SET_USER } from '../store/user.reducer.js'
export function StationIndex() {
    const stations = useSelector(
        (storeState) => storeState.stationModule.stations
    )
  useEffect(() => {
    loadStations()
  }, [])
  function yourStations() {
    return userService.getLoggedinUser()
  }
  return (
    <>
    {stations[0] ?
    <div className='main-home-page'>
      <AppHeader />
      <div className="station-index">
        <h2>Spotify Playlists</h2>
        <StationList stations={stations} />
        {yourStations() ?
        <div>
          <h2>Your Playlists</h2>
          <StationList stations={stations.filter(station=> station.createdBy._id === userService.getLoggedinUser()._id)} />
        </div>
      :
      <div></div>
      }
        {/* <h2>Popular Playlists</h2>
        <StationList stations={stations} /> */}
      </div>
    </div>
    : <p>Loading...</p>   }
    </>
  )
}