import React from 'react'
import GoogleButton from 'react-google-button'
import { auth } from '../Firebase'
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";



function Signin() {

  const style = {
      title: `text-white`
  }

  const googleSign = () => {
    console.log('here');
    /* 1. Create an instance of the Google provider object: */
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    signInWithRedirect(auth, provider);
  } 

  return (
    <div className={style.title} >
        <GoogleButton type='light' onClick={googleSign}/>
    </div>
  )
}

export default Signin