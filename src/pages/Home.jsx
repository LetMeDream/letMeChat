import React from 'react'
import { useEffect } from 'react'
import { auth } from '../Firebase'
import Signin from '../components/SignIn'
import SignOut from '../components/SignOut'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Home() {

  const style = {
    container: 'flex w-screen h-screen justify-center items-center bg-gray-100'
  }
  const user = auth.currentUser
  /* useEffect(()=>{
    console.log(auth.currentUser)
  },[]); */
  

  return (
    <>  
      <div className={style.container}>
          <div className='h-[32rem] aspect-[5/8] rounded-xl caret-transparent shadow-lg flex flex-col bg-blue-300 items-center justify-between'>
              <Link to='/letMeChat/room1' className='relative top-6 text-slate-800 text-lg'>Let me +</Link>
              <div className='bg-[#112D4E] w-full h-2/6 rounded-t-xl flex items-center justify-center'>
                { user ? <SignOut/> : <Signin/> }
              </div>
          </div>
      </div>
    </>
  )
}

export default Home