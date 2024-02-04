import { stationService } from "../services/station.service.local.js"
import { userService } from "../services/user.service.js"
import { store } from "./store.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import {
    SET_STATION,
    SET_STATIONS,
    SET_SONG,
    SET_ISPLAYING,
    SET_IS_EDIT_MODAL_SHOWN,
    SET_IS_DROPDOWN_MODAL_SHOWN,
    SET_STATIONS_DROPDOWN_SHOWN,
} from "./station.reducer.js"
import { SET_SCORE } from "./user.reducer.js"

// Action Creators:
export function updateCurrentSong(song) {
    return {
        type: SET_SONG,
        song,
    }
}
export function updateCurrentStation(station) {
    return {
        type: SET_STATION,
        station,
    }
}

export function updateIsPlaying(isPlaying) {
    return {
        type: SET_ISPLAYING,
        isPlaying,
    }
}

export function updateIsEditModalShown(isEditModalShown) {
    return {
        type: SET_IS_EDIT_MODAL_SHOWN,
        isEditModalShown,
    }
}

export function updateIsDropdownModalShown(isDropdownModalShown) {
    return {
        type: SET_IS_DROPDOWN_MODAL_SHOWN,
        isDropdownModalShown,
    }
}

export function updateStations(stations) {
    return {
        type: SET_STATIONS,
        stations,
    }
}

export function updateIsStationsDropdownShown(isStationsDropdownShown) {
    return {
        type: SET_STATIONS_DROPDOWN_SHOWN,
        isStationsDropdownShown,
    }
}

export async function loadStations() {
    try {
        const stations = await stationService.query()
        store.dispatch({
            type: SET_STATIONS,
            stations,
        })
    } catch (error) {
        console.log("Cannot load stations")
    }
}

export async function loadStation(stationId) {
    try {
        let station
        const userId = userService.getLoggedinUser()._id
        const user = await userService.getById(userId)
        if (Array.isArray(user?.stations)) {
            if (stationId === user?.stations[0]._id) {
                station = user?.stations[0]
            } else {
                station = await stationService.getById(stationId)
            }
        } else {
            station = await stationService.getById(stationId)
        }
        store.dispatch({
            type: SET_STATION,
            station,
        })
    } catch (err) {
        console.error("Cannot load station", err)
    }
}

export async function loadSong(station, songId) {
    try {
        const song = await stationService.getDefaultSongById(station, songId)
        store.dispatch({
            type: SET_SONG,
            station,
        })
    } catch {
        console.log("Cannot load song")
    }
}