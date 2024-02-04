import { stationService } from "../services/station.service.local"
import { GenrePreview } from "./genre-preview"

export function GenreList() {
    const genreList = stationService.getGenreList()
    return (
        <div >
            <ul className="genre-list">
                {genreList.map(genre =>
                    <GenrePreview
                        genre={genre}
                    />
                )
                }
            </ul>
        </div>
    )
}