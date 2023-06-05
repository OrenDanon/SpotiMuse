import { stationService } from "../services/station.service.local"
import { GenrePreview } from "./genre-preview"

export function GenreList() {
    const genreList = stationService.getGenreList()
    return (
        <div className="genre-list">
            <ul>
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