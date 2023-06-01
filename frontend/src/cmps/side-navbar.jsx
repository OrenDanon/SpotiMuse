export function SideNavbar(){
    return(
        <section className="side-navbar">
            <div className="logo">
                <a href="#">logo</a>
            </div>
            <div className="navigation">
                <ul>
                    <li>
                        <a href="#">
                            <span className="home"></span>
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="search"></span>
                            <span>Search</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="library"></span>
                            <span>Your Library</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="navigation">
                <ul>
                    <li>
                        <a href="#">
                            <span className="playlist"></span>
                            <span>Create Playlist</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="liked"></span>
                            <span>Liked Songs</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="policies flex">
                <ul>
                    <li>
                        <a href="#">
                            Legal
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="#">
                            Privacy Center
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="#">
                            Privacy Policy
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="#">
                            Cookies
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="#">
                            About Ads
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="#">
                            Accessibillity
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="#">
                            Cookies
                        </a>
                    </li>
                </ul>
            </div>

        </section>
    )
}