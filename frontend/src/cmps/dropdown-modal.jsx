import { useSelector } from "react-redux"
import { updateIsEditModalShown } from "../store/station.actions"
import { store } from "../store/store"
import { stationService } from "../services/station.service.local"
import { userService } from "../services/user.service"
import { SET_USER } from "../store/user.reducer"
import { Link } from "react-router-dom"

export function DropdownModal({ onClose, station }) {

    const isEditModalShown = useSelector(
        (storeState) => storeState.stationModule.isEditModalShown
    )
    const stations = useSelector(
        (storeState) => storeState.stationModule.stations
    )

    function showEditModal() {
        store.dispatch(updateIsEditModalShown(!isEditModalShown))
        onClose()
    }

   async function onDelete() {
    try{
        await stationService.remove(station._id)
        const userIdx = userService.getLoggedinUser()._id
        let user = await userService.getById(userIdx) 
        if (station.createdBy._id === userIdx ){
            user.stations = user.stations.filter(currStation=> currStation._id!==station._id)
            await userService.save(user)
            store.dispatch({ type: SET_USER, user })
        }
    }catch(err){
        console.log('Can not remove station',err);
    } finally{
        onClose()
    }

    }
    
    return (
        <ul className="dropdown-modal-actions">
            <li onClick={showEditModal}>Edit details</li>
            <Link to={`/`}><li onClick={onDelete}>Delete</li></Link>
        </ul>
    )
}