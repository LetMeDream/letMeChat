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
import { motion, useAnimationControls } from 'framer-motion'




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
  /* Create our animation control in order to control start and end animations */
  /* const controls = useAnimationControls();

  const variants = {
    start: {
      scale: 1.05,
      color:'#ff0000'
    },
    end: {
      scale: 1,
      color:'#000000'
    },
  } */


  useEffect(()=>{
    getRooms();
    console.log(rooms);

    /* Setting ROOMS starting animation */

  },[]);

  console.log(rooms)

  const style = {
    container: "flex w-screen h-screen justify-center items-center bg-gray-100",
    loginCard: "h-[32rem] aspect-[7/12] rounded-t-md caret-transparent shadow-md shadow-gray-600 flex flex-col bg-sky-300 items-center justify-between",
    titleLink: 'relative top-6 text-slate-800 text-lg',
    loginCardFooter: 'bg-slate-500/75 w-full h-1/5 rounded-t-xl flex items-center justify-center relative top-[1px]',
    roomLink: 'w-full text-center cursor-pointer bg-slate-500/75 py-2 hover:bg-slate-600 hover:text-white hover:shadow-xl'
  };

  const variants = {
    visible: i => ({
      scale: 1,
      transition: {
        delay: i * 0.25,
        duration: .5
      },
    })
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.loginCard}>
          <div className='flex flex-col items-center'>
            
            { user ? 
                  (
                    <Link to='/letMeChat/Room1' className="flex justify-center">
                      <motion.img 
                        animate={{scale:1, borderRadius:'10%'}}
                        initial={{ scale:0, borderRadius: '100%' }}
                        transition= {{ duration:.5 }}
                        whileHover={{ borderRadius: '100%', scale:1.1}}
                        src={user.photoURL} className=' w-4/6 relative top-5'>
                      </motion.img>
                    </Link>
                  ) : 
                  <div to="/letMeChat/room1" className={style.titleLink}> Let me + </div> 
            }

          </div>
          
          <motion.div className="flex gap-1 relative top-4 flex-col items-center w-full overflow-hidden" 
            transition={{
              staggerChildren: 0.2
            }}  
          >
            {rooms.map( (room, i)=> 
              <Link to={`/letMeChat/${room.id}`} key={room.id} className='w-full text-white'>
                <motion.div 
                  /* animate={controls}
                  onHoverStart={() => {
                    controls.start(variants.start)
                  }}
                  onHoverEnd={() => {
                    controls.start(variants.end)
                  }} */
                  /* initial={{ scale:0}}
                  animate={{scale:1, transition:{duration: 1}  }} */
                  whileHover={{ scale:1.05, transition:{duration: .5} }}
                  initial={{ scale:0 }}
                  custom={i}
                  animate="visible"
                  variants={variants}

                  className={style.roomLink} key={room.id}>
                    {room.get('name')} 
                </motion.div>
              </Link>
            )}
          </motion.div>


          <div className={style.loginCardFooter}>
            {user ? <SignOut /> : <SignIn />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
