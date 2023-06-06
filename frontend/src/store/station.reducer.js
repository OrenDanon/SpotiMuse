export const SET_SONG = 'SET_SONG'
export const SET_STATION = 'SET_STATION'
export const SET_STATIONS = 'SET_STATIONS'
export const SET_ISPLAYING = 'SET_ISPLAYING'


const initialState = {
    stations:[],
    station: {},
    song: {},
    isPlaying: false
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
        default:
    }
    return newState
}
