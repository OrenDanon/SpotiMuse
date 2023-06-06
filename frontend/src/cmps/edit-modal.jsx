import React from "react"

import { useSelector } from "react-redux"
import { updateIsEditModalShown } from "../store/station.actions"
import { store } from "../store/store"
import { ReactComponent as CloseIcon } from "../assets/icons/close.svg"


export function EditModal() {

    const isEditModalShown = useSelector(
        (storeState) => storeState.stationModule.isEditModalShown
    )

        function closeEditModal() {
            store.dispatch(updateIsEditModalShown(!isEditModalShown))
        }

        return (
            <div className="edit-modal">
                <div className="modal-header">
                    <h1>Edit details</h1>
                <button onClick={closeEditModal}>
                    <CloseIcon/>
                </button>

            <div className="edit-station-form">
            <label htmlFor=""></label>
            </div>

                </div>
            </div>
        )

}