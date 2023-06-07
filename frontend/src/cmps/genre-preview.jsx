export function GenrePreview({genre}){
    return(
        <div className={`${genre.title.toLowerCase()} genre-preview`}>
            <span>{genre.title}</span>
            <img src={`${genre.img}`} alt="" srcset="" />
        </div>
    )
}