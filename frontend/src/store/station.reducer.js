export const SET_SONG = "SET_SONG"
export const SET_STATION = "SET_STATION"
export const SET_STATIONS = "SET_STATIONS"
export const SET_ISPLAYING = "SET_ISPLAYING"
export const UPDATE_STATION_IN_STATIONS = "UPDATE_STATION_IN_STATIONS"

export const SET_IS_EDIT_MODAL_SHOWN = "SET_IS_EDIT_MODAL_SHOWN"

const initialState = {
    stations: [],
    station: {},
    song: {},
    isPlaying: false,
    isEditModalShown: false,
}

export function stationReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_SONG:
            newState = { ...state, song: action.song }
            break
        case SET_STATION:
            newState = { ...state, station: action.station }
            break
        case SET_STATIONS:
            newState = { ...state, stations: action.stations }
            break
        case SET_ISPLAYING:
            newState = { ...state, isPlaying: action.isPlaying }
            break
        case SET_IS_EDIT_MODAL_SHOWN:
            newState = { ...state, isEditModalShown: action.isEditModalShown }
            break
        // case UPDATE_STATION_IN_STATIONS:
        //     newState = {
        //         stations: state.stations.map((station) =>
        //             station._id === action.updatedStation._id
        //                 ? action.updatedStation
        //                 : station
        //         )
        //     }
        default:
    }
    return newState
}
