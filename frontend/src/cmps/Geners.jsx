export function Geners({ geners }) {

    return (
        <div className="geners-list ">
            {geners.map(gener => {
                return <li >{gener.title}</li>
            }
            )
            }
        </div >
    )

}