import { Link } from "react-router-dom"

export function GenrePreview({genre}){
    return(
            <Link to = {`/genre/${genre.title}`}>
        <div className={`${genre.title.toLowerCase()} genre-preview`}>
            <span>{genre.title}</span>
            <img src={`${genre.img}`} alt="" srcSet="" />
        </div>
         </Link> 
    )
}