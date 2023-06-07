import React, { useEffect } from "react"
import { Routes, Route } from "react-router"

import routes from "./routes"

import { AppHeader } from "./cmps/app-header"
import { AppFooter } from "./cmps/app-footer"
import { UserDetails } from "./pages/user-details"
import { SideNavbar } from "./cmps/side-navbar"
import { MainView } from "./cmps/main-view"
import { FooterNav } from "./cmps/footer-nav"
import { StationDetails } from "./pages/station-details"
import { SearchPage } from "./pages/search-page"
import { userService } from "./services/user.service"
import { SET_USER } from "./store/user.reducer"
import { store } from "./store/store"

export function RootCmp() {

    async function setInitialUser() {
        const userId = userService.getLoggedinUser()._id
        if (!userId) return
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_USER, user })
    }

    useEffect(()=>{
        setInitialUser()
    },[])


    return (
        <div className="main-layout">
            <SideNavbar />
            <main className="main-view">
                {/* <MainView/> */}
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            exact={true}
                            element={route.component}
                            path={route.path}
                        />
                    ))}
                    <Route path="search" element={<SearchPage />} />
                    <Route path="station/:id" element={<StationDetails />} />
                </Routes>
                <FooterNav />
            </main>
            <AppFooter />
        </div>
    )
}
