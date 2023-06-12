import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import {
    updateIsEditModalShown,
    updateCurrentStation,
    updateStations,
    updateIsDropdownModalShown,
    updateCurrentUser
} from "../store/station.actions"
import { store } from "../store/store"
import { ReactComponent as CloseIcon } from "../assets/icons/close.svg"
import { stationService } from "../services/station.service.local"
import { ImgUploader } from "../cmps/img-uploader"
import { userService } from "../services/user.service"
import { SET_USER } from "../store/user.reducer"
import { DropdownModal } from "./dropdown-modal"
import { useEffect } from "react"
import { Geners } from "./Geners"


export function EditModal() {
    const isEditModalShown = useSelector(
        (storeState) => storeState.stationModule.isEditModalShown
    )

    const station = useSelector(
        (storeState) => storeState.stationModule.station
    )
    const [tags, setTags] = useState(station.tags || [])

    let user = useSelector(storeState => storeState.userModule.user)

    const [name, setName] = useState(station.name)
    const [description, setDescription] = useState(station.description || "")
    const [uploadedImgUrl, setUploadedImgUrl] = useState()
    const dispatch = useDispatch()

    function closeEditModal() {
        dispatch(updateIsEditModalShown(!isEditModalShown))
    }
    function handleGenreSelection(gener) {
        console.log(gener)
        setTags(prevTags => {
            if (!prevTags.includes(gener.title)) {
                return [...prevTags, gener.title]
            }
            return prevTags
        })
        console.log(tags);
    }

    async function handleSubmit(ev) {
        ev.preventDefault()

        const imgUrl = uploadedImgUrl || station.imgUrl

        const updatedStation = {
            ...station,
            name,
            description,
            imgUrl,
            tags
        };

        try {
            const savedStation = await stationService.save(updatedStation);
            const stationIdx = user.stations.findIndex(currStation => currStation._id === updatedStation._id)
            user.stations[stationIdx].imgUrl = updatedStation.imgUrl
            user.stations[stationIdx].name = updatedStation.name
            if (!user.stations[stationIdx].tags) user.stations[stationIdx].tags = []
            user.stations[stationIdx].tags.push(...updatedStation.tags)
            user = await userService.save(user)
            dispatch(store.dispatch({ type: SET_USER, user }))
            dispatch(updateStations(savedStation))
            dispatch(updateCurrentStation(savedStation))
            dispatch(updateIsEditModalShown(!isEditModalShown))
        } catch (error) {
            console.log("Error saving station", error);
        }
    }

    function handleGenreSelection(gener) {
        console.log(gener)
        setTags(prevTags => {
            if (!prevTags.includes(gener.title)) {
                return [...prevTags, gener.title]
            }
            return prevTags
        })
        console.log(tags);
    }

    function handleImageUpload(imgUrl) {
        setUploadedImgUrl(imgUrl)
        console.log(imgUrl)
    }

    const isDropdownModalShown = useSelector(
        (storeState) => storeState.stationModule.isDropdownModalShown
    )


    function handleEditModalOpen() {
        store.dispatch(updateIsEditModalShown(!isEditModalShown))
        store.dispatch(updateIsDropdownModalShown(!isDropdownModalShown))
    }
    function showDropdownModal() {
        store.dispatch(updateIsDropdownModalShown(!isDropdownModalShown))
    }

    const geners = stationService.getGenreList()

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
                        <img src={`${uploadedImgUrl || station.imgUrl}`} alt="station-img" />
                        <ImgUploader onUploaded={handleImageUpload} />
                    </div>
                    <div className="edit-station-form-name">
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
                                onChange={(ev) => setName(ev.target.value)}
                            />
                        </form>
                    </div>

                    <div className="edit-station-label">
                        <div className="dropdown-container">
                            <button
                                onClick={showDropdownModal}
                                className="btn-dropdown">
                                Add genre
                            </button>
                            {isDropdownModalShown && (
                                <div className="dropdown-modal">
                                    <DropdownModal>
                                        <li>
                                            <Geners geners={geners} onSelect={handleGenreSelection} />
                                        </li>
                                    </DropdownModal>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="edit-station-form-desc">
                        <form action="">
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
                                onChange={(ev) =>
                                    setDescription(ev.target.value)
                                }></textarea>
                        </form>
                    </div>
                    <div className="save">
                        <form action="">
                            <button
                                onClick={handleSubmit}
                                type="submit"
                            ><span>Save</span></button>
                        </form>
                    </div>
                    <p>By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.</p>
                </div>
            </div>
        </div>
    )
}
