export function SideNavbar() {
    var station = [{
        "_id": "5cksxjas89xjsa8xjsa8jxs09",
        "name": "2Pac",
        "tags": [
            "Funk",
            "Happy"
        ],
        "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
    }
    ]


    return (
        <div className="side-navbar flex column ">
            <section className="side-navbar-main flex column">
                <div className="navigation">
                    <ul>
                        <li>
                            <a href="#">
                                <span className="icon"><svg role="img" height="24" width="24" aria-hidden="true" class="Svg-sc-ytk21e-0 ldgdZj home-active-icon" viewBox="0 0 24 24" data-encore-id="icon"><path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"></path></svg></span>
                                <span className="home">Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon"><svg role="img" height="24" width="24" aria-hidden="true" class="Svg-sc-ytk21e-0 ldgdZj search-icon" viewBox="0 0 24 24" data-encore-id="icon"><path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path></svg></span>
                                <span className="search">Search</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="navigation library flex column">
                    <div className="flex">
                        <div>
                            <header className="flex">
                                <ul className="flex">
                                    <li className="flex">
                                        <a href="#">
                                            <span className="icon"><svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 ldgdZj"><path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path></svg></span>
                                            <span className="library flex">Your Library</span>
                                        </a>
                                    </li>
                                    <li className="add-library">
                                        <a href="#">
                                            <span className="icon"><svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 ldgdZj"><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path></svg></span>
                                        </a>
                                    </li>

                                </ul>
                            </header>
                            {/* <div className="flex">
                                <ul className="flex">
                                    <li className="flex">
                                        <a href="#">
                                            <div>
                                                <span className="icon"><svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 ldgdZj"><path d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"></path></svg></span>
                                                <span className="liked">Liked Songs
                                                    <p className="details">Playlist - 1 song</p>
                                                </span>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div> */}
                            <div className="">
                                <ul className="">
                                    <li className="">
                                        <a href="#">
                                            <div className="stations-list flex">
                                                <img src={`${station[0].imgUrl}`} alt="" srcset="" />
                                                <span>
                                                    {station[0].name}
                                                </span>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}