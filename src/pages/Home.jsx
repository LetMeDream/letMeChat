import React from "react";
import { useEffect, useState } from "react";
import { auth } from "../Firebase";
import SignIn from "../components/SignIn";
import SignOut from "../components/SignOut";
import { Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
/* Here we will get our 3 ROOM Documents  */
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { motion } from 'framer-motion'



function Home() {
  const [user] = useAuthState(auth);
  /* Rooms as a state */
  const [rooms, setRooms] = useState([])
  /* Getting our rooms */
  const getRooms = async () => {
    let rooms = [];
    const q = await getDocs(collection(db, 'rooms'));
    q.forEach((doc)=>{
      rooms.push(doc)
    })
    setRooms(rooms);
  }
  
  useEffect(()=>{
    getRooms();
    console.log(`User is: ${user}`)
    console.log(rooms);
  },[]);

  console.log(rooms)

  const style = {
    container: "flex w-screen h-screen justify-center items-center bg-gray-100",
    loginCard: "h-[32rem] aspect-[7/12] rounded-t-md caret-transparent shadow-lg flex flex-col bg-sky-300 items-center justify-between",
    titleLink: 'relative top-6 text-slate-800 text-lg',
    loginCardFooter: 'bg-slate-500/75 w-full h-1/5 rounded-t-xl flex items-center justify-center relative top-[1px]',
    roomLink: 'w-full text-center cursor-pointer bg-slate-500/75 py-2 hover:bg-slate-600 hover:text-white hover:shadow-xl'
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.loginCard}>
          <div className='flex flex-col items-center'>
            

            { user ? 
                  (
                    <Link to='/letMeChat/Room1' className="flex justify-center">
                      <motion.img 
                        animate={{scale:1}}
                        initial={{ scale:0 }}
                        src={user.photoURL} className='rounded-full w-4/6 relative top-5'>
                      </motion.img>
                    </Link>
                  ) : 
                  <div to="/letMeChat/room1" className={style.titleLink}> Let me + </div> 
            }

          </div>

          <div className="flex gap-1 relative top-4 flex-col items-center w-full">
            {rooms.map( (room)=> 
              <motion.div 
                animate={{scale:1}} initial={{ scale:0 }}
                className={style.roomLink} key={room.id}>
                  {room.id}
              </motion.div>
            )}
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
