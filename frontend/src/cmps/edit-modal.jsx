import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import {
    updateIsEditModalShown,
    updateCurrentStation,
    updateStations,
} from "../store/station.actions"
import { store } from "../store/store"
import { ReactComponent as CloseIcon } from "../assets/icons/close.svg"
import { stationService } from "../services/station.service.local"
import { ImgUploader } from "../cmps/img-uploader"

export function EditModal() {
    const isEditModalShown = useSelector(
        (storeState) => storeState.stationModule.isEditModalShown
    )

    const station = useSelector(
        (storeState) => storeState.stationModule.station
    )

    const [name, setName] = useState(station.name)
    const [description, setDescription] = useState(station.description || "")
    const [uploadedImgUrl, setUploadedImgUrl] = useState()
    const dispatch = useDispatch()

    function closeEditModal() {
        dispatch(updateIsEditModalShown(!isEditModalShown))
        console.log(station)
    }

    function handleSubmit(e) {
        e.preventDefault()

        const imgUrl = uploadedImgUrl || station.imgUrl
        
        const updatedStation = {
            ...station,
            name,
            description,
            imgUrl
        }

        console.log("station", station)
        stationService
            .save(updatedStation)
            .then((savedStation) => {
                console.log("updatedStation", savedStation)
                dispatch(updateStations(savedStation))
                dispatch(updateCurrentStation(savedStation))
                dispatch(updateIsEditModalShown(!isEditModalShown))
            })
            .catch((error) => {
                console.log("Error saving station", error)
            })
    }

    function handleImageUpload (imgUrl){
        setUploadedImgUrl(imgUrl)
    }

    return (
        <div className="edit-modal">
            <div className="edit-modal-content">
                <div className="modal-header">
                    <h1>Edit details</h1>
                    <button className="close-modal" onClick={closeEditModal}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="edit-station-content">
                    <div className="edit-image-container">
                        <img src={`${uploadedImgUrl || station.imgUrl}`} alt="station-img"/>
                        <ImgUploader onUploaded={handleImageUpload} />
                    </div>
                    <div className="edit-station-form">
                        <form action="">
                            <label
                                htmlFor="edit-input"
                                className="edit-input-label">
                                Name
                            </label>
                            <input
                                type="text"
                                name="edit-name-input"
                                id="edit-input"
                                className="edit-name-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label
                                htmlFor="edit-desc-textarea"
                                className="edit-input-label">
                                Description
                            </label>
                            <textarea
                                maxLength={100}
                                name="edit-desc-textarea"
                                id="edit-desc-textarea"
                                cols="30"
                                rows="10"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }></textarea>
                            <input
                                onClick={handleSubmit}
                                type="submit"
                                value="Save"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
