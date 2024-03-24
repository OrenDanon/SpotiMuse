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
        <label for="email">Email</label>
          <input type="email" placeholder="name@domain.com" id='name'/>
          <label for="username">Username</label>
          <input type="text" placeholder='Username'id='username'/>
          <label for="password">Password</label>
          <input type="password" placeholder="Password" id='password'/>
          <label for="confirm-password">Confirm Password</label>
          <input type="password" placeholder="Confirm Password" id='confirm-password'/>
          <button type="submit">Sign Up</button>
        </form>
        </div>
        </div>
    );
  }
