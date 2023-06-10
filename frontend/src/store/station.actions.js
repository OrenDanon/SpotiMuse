import { stationService } from "../services/station.service.local.js";
import { userService } from "../services/user.service.js";
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { SET_STATION,SET_STATIONS, SET_SONG, SET_ISPLAYING, SET_IS_EDIT_MODAL_SHOWN, UPDATE_STATION_IN_STATIONS, SET_IS_DROPDOWN_MODAL_SHOWN, SET_STATIONS_DROPDOWN_SHOWN} from "./station.reducer.js";
import { SET_SCORE } from "./user.reducer.js";

// Action Creators:
export function updateCurrentSong(song) {
    return {
        type: SET_SONG,
        song
    }
}
export function updateCurrentStation(station) {
    return {
        type: SET_STATION,
        station
    }
}

export function updateIsPlaying(isPlaying) {
    return {
        type: SET_ISPLAYING,
        isPlaying
    }
}

export function updateIsEditModalShown(isEditModalShown) {
    return {
        type: SET_IS_EDIT_MODAL_SHOWN,
        isEditModalShown
    }
}

export function updateIsDropdownModalShown(isDropdownModalShown) {
    return {
        type: SET_IS_DROPDOWN_MODAL_SHOWN,
        isDropdownModalShown
    }
}

export function updateStationInStations(updatedStation) {
    return {
        type: UPDATE_STATION_IN_STATIONS,
        updatedStation
    }
}

export function updateStations(stations) {
    return {
        type: SET_STATIONS,
        stations
    }
}

export function updateIsStationsDropdownShown(isStationsDropdownShown) {
    return {
        type: SET_STATIONS_DROPDOWN_SHOWN,
        isStationsDropdownShown
    }
}

export async function loadStations() {
    try {
      const stations = await stationService.query()
      store.dispatch({
        type: SET_STATIONS,
        stations
      })
    } catch (error) {
        console.log('Cannot load stations')
    }
  }


export async function loadStation(stationId){
    try{
        let station
        const user = userService.getLoggedinUser()
        if (stationId === user.stations[0]._id ){
            station = user.stations[0]
        } else{
             station = await stationService.getById(stationId)
        }
    store.dispatch({
        type: SET_STATION,
        station
    })
    }catch(err){
        console.error('Cannot load station',err)
    }
}

export async function loadSong(station,songId){
    try{
    const song = await stationService.getDefaultSongById(station,songId)
    store.dispatch({
        type: SET_SONG,
        station
    })
    }catch{
        console.log('Cannot load song')
    }
}
// export async function removeCar(carId) {
//     try {
//         await stationService.remove(carId)
//         store.dispatch(getActionRemoveCar(carId))
//     } catch (err) {
//         console.log('Cannot remove car', err)
//         throw err
//     }
// }

// export async function addCar(car) {
//     try {
//         const savedCar = await stationService.save(car)
//         console.log('Added Car', savedCar)
//         store.dispatch(getActionAddCar(savedCar))
//         return savedCar
//     } catch (err) {
//         console.log('Cannot add car', err)
//         throw err
//     }
// }

// export function updateCar(car) {
//     return stationService.save(car)
//         .then(savedCar => {
//             console.log('Updated Car:', savedCar)
//             store.dispatch(getActionUpdateCar(savedCar))
//             return savedCar
//         })
//         .catch(err => {
//             console.log('Cannot save car', err)
//             throw err
//         })
// }

// export function addToCart(car) {
//     store.dispatch({
//         type: ADD_TO_CART,
//         car
//     })
// }

// export function removeFromCart(carId) {
//     store.dispatch({
//         type: REMOVE_FROM_CART,
//         carId
//     })
// }

// export async function checkout(total) {
//     try {
//         const score = await userService.changeScore(-total)
//         store.dispatch({ type: SET_SCORE, score })
//         store.dispatch({ type: CLEAR_CART })
//         return score
//     } catch (err) {
//         console.log('CarActions: err in checkout', err)
//         throw err
//     }
// }


// // Demo for Optimistic Mutation 
// // (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemoveCarOptimistic(carId) {
//     store.dispatch({
//         type: REMOVE_CAR,
//         carId
//     })
//     showSuccessMsg('Car removed')

//     stationService.remove(carId)
//         .then(() => {
//             console.log('Server Reported - Deleted Succesfully');
//         })
//         .catch(err => {
//             showErrorMsg('Cannot remove car')
//             console.log('Cannot load cars', err)
//             store.dispatch({
//                 type: UNDO_REMOVE_CAR,
//             })
//         })
// }
