import React from "react"
import { useSelector } from "react-redux"
import { updateIsEditModalShown } from "../store/station.actions"
import { store } from "../store/store"

export function DropdownModal({ onClose }) {

    const isEditModalShown = useSelector(
        (storeState) => storeState.stationModule.isEditModalShown
    )

    function showEditModal() {
        store.dispatch(updateIsEditModalShown(!isEditModalShown))
        onClose()
    }

    function handleActionClick() {
        onClose()
    }

    return (
        <ul className="dropdown-modal-actions">
            <li onClick={showEditModal}>Edit details</li>
            <li onClick={handleActionClick}>Delete</li>
        </ul>
    )
}
