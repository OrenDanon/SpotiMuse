
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { removeFromCart, checkout } from '../store/car.actions'
import { UserMsg } from './user-msg.jsx'

export function AppFooter() {
    const [isCartShown, setIsCartShown] = useState(false)
    const cart = useSelector(storeState => storeState.carModule.cart)
    const count = useSelector(storeState => storeState.userModule.count)
    const cartTotal = cart.reduce((acc, car) => acc + car.price, 0)

    async function onCheckout() {
        try {
            const score = await checkout(cartTotal)
            showSuccessMsg(`Charged, your new score: ${score.toLocaleString()}`)
        } catch(err) {
            showErrorMsg('Cannot checkout')
        }
    }

    return (
        <footer className="app-footer">

            <div className="mini-song controls-left">details</div>

            <div className="player-controls">
            <div className="player-controls-top">
                <button className='btn-song'>🔀</button>
                <button className='btn-song'>⏪</button>
                <button className='btn-song'>⏸</button>
                <button className='btn-song'>⏩</button>
                <button className='btn-song'>🔁</button>
                </div>
            <div className="playback-bar">
                <span>0:00</span>
                <input type="range" name="song-range" className="song-range" />
                <span>3:28</span>
            </div>
            </div>

            <div className="controls-right">details</div>
        </footer>
    )
}