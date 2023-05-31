import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { SideNavbar } from './cmps/side-navbar'
import { MainView } from './cmps/main-view'

export function RootCmp() {

    return (
        <div className='main-layout'>
            <AppHeader />
            <SideNavbar />
            <main className='main-view'>
            {/* <MainView/> */}
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    {/* <Route path="user/:id" element={<UserDetails />} /> */}
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


