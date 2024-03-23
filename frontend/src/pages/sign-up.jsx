import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import SpotiMuseIcon from '../assets/icons/SpotiMuseIcon.png'
 
export function SignUp() {
    const user = useSelector(storeState => storeState.userModule.user)


    return (
      // <div style={{ backgroundColor: 'black', height: '100vh', color: 'white' }}>
      // </div>
        <div className='sign-up'>
        <img className='logo' src={SpotiMuseIcon} alt="SpotiMuse Icon=" />
        <div className="sign-up-container">
        <h2>Sign Up</h2>
        <form className="sign-up-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <label className="terms">
            <input type="checkbox" /> I agree to the terms and conditions
          </label>
          <button type="submit">Sign Up</button>
        </form>
        </div>
        </div>
    );
  }
