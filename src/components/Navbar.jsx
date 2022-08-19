import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '../Firebase'
import Signin from './SignIn'
import SignOut from './SignOut'

function Navbar() {
  const style = {
    nav: `bg-[#112D4E] flex justify-between p-5 items-center text-black`,
    heading: `text-white text-2xl`,
    area:{
      gridArea: 'n'
    }
  }
  /* Is there any logged Google user? */
  const user = auth.currentUser;
  return (
    <div className={style.nav} style={style.area}>
        <div className={style.heading}>
            Let me +
        </div>   

        { user ? <img className='rounded-full w-16' src={user.photoURL}></img> : '' }

        { user ? <SignOut/> : <Signin/> }     
    </div>
  )
}

export default Navbar