export function Geners({ geners, onSelect }) {

    return (
        <div className="geners-list ">
        {geners.map(gener => {
            return <li onClick={() => onSelect(gener)}>{gener.title}</li>
        })}
    </div >
    )

}