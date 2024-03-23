import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { useLocation } from 'react-router-dom'

import routes from './routes'

// import { AppHeader } from "./cmps/app-header"
import { AppFooter } from './cmps/app-footer'
// import { UserDetails } from "./pages/user-details"
import { SideNavbar } from './cmps/side-navbar'
import { FooterNav } from './cmps/footer-nav'
import { StationDetails } from './pages/station-details'
import { SearchPage } from './pages/search-page'
import { userService } from './services/user.service'
import { SET_USER } from './store/user.reducer'
import { store } from './store/store'
import { Genre } from './pages/genre'
import { SignUp } from './pages/sign-up'
// import { socketService } from "./services/socket.service"

export function RootCmp() {
    async function setInitialUser() {
        const userId = userService.getLoggedinUser()._id
        if (!userId) return
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_USER, user })
    }

    useEffect(() => {
        setInitialUser()
    }, [])
    const location = useLocation()
    const showSidebarAndFooters = location.pathname !== '/signup'

    return (
        <div className="main-layout">
            {showSidebarAndFooters && <SideNavbar />}
            <main className="main-view">
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            exact={true}
                            element={route.component}
                            path={route.path}
                        />
                    ))}
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="station/:id" element={<StationDetails />} />
                    <Route path="genre/:genre" element={<Genre />} />
                </Routes>
                {showSidebarAndFooters && <FooterNav />}
            </main>
            {showSidebarAndFooters && <AppFooter />}
        </div>
    )
}
