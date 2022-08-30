import React from "react";
import { useEffect } from "react";
import { auth } from "../Firebase";
import SignIn from "../components/SignIn";
import SignOut from "../components/SignOut";
import { Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';


function Home() {
  const style = {
    container: "flex w-screen h-screen justify-center items-center bg-gray-100",
    loginCard: "h-[32rem] aspect-[7/12] rounded-t-xl caret-transparent shadow-lg flex flex-col bg-sky-300 items-center justify-between",
    titleLink: 'relative top-6 text-slate-800 text-lg',
    loginCardFooter: 'bg-slate-300 w-full h-1/5 rounded-t-xl flex items-center justify-center relative top-[1px]'
  };
  const [user] = useAuthState(auth);
  useEffect(()=>{
    console.log(user)
  },[]);

  return (
    <>
      <div className={style.container}>
        <div className={style.loginCard}>
          <div className='flex flex-col items-center'>
            

            { user ? 
                  (
                    <img src={user.photoURL} className='rounded-full w-4/6 relative top-5'></img>
                  ) : 
                  <div to="/letMeChat/room1" className={style.titleLink}> Let me + </div> 
            }

          </div>

          <div className="bg-black h-[20px] w-full">

          </div>


          <div className={style.loginCardFooter}>
            {user ? <SignOut /> : <SignIn />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
