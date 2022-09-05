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
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';



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
    console.log(rooms);
  },[]);

  /* When trying to go to a room without been loggedIn... */
  const logInFirst = () => {
    alert('You must sign in before accesing any room');
  }

  const style = {
    container: "flex w-screen h-screen justify-center items-center bg-gray-100",
    loginCard: "h-[32rem] aspect-[7/12] min-w-[50vw] lg:min-w-max rounded-t-md caret-transparent shadow-md shadow-gray-600 flex flex-col bg-slate-400 items-center justify-between",
    titleLink: 'relative top-6 text-slate-800 text-lg',
    loginCardFooter: 'bg-gray-800 w-full h-1/5 rounded-t-xl flex items-center justify-center relative top-[1px]',
    roomLink: 'w-full text-center cursor-pointer bg-gray-800 py-2 hover:bg-slate-600 hover:text-white hover:shadow-xl'
  };

  const variants = {
    visible: i => ({
      opacity: 1,
      transition: {
        delay: i * .25,
        duration: .5
      },
    })
  }

  /* Conditionally rendering chats in order to avoid nested ternary expresions */
  let chats
  if(user){
    chats=rooms.map( (room, i)=> 
            <Link to={`/letMeChat/${room.id}`} key={room.id} className='w-full mb-1 text-white'>
              <motion.div 
                
                initial={{ opacity:0 }}
                custom={i}
                animate="visible"
                variants={variants}
                whileHover={{ scale:1.02}}
                transition={{duration: .1, delay: 0}} 

                className={style.roomLink} key={room.id}>
                  {room.get('name')} 
              </motion.div>
            </Link>)
  }else{
    chats=rooms.map( (room, i)=> 
                  <div onClick={logInFirst} key={room.id} className='w-full mb-1 text-white'>
                    <motion.div 
                      
                      initial={{ opacity:0 }}
                      custom={i}
                      animate="visible"
                      variants={variants}
                      whileHover={{ scale:1.02}}
                      transition={{duration: .1, delay: 0}} 

                      className={style.roomLink} key={room.id}>
                        {room.get('name')} 
                    </motion.div>
                  </div>
                   )
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
          
          <motion.div className="flex relative top-4 flex-col items-center w-full overflow-hidden">
            { /* user ? (rooms.map( (room, i)=> 
              <Link to={`/letMeChat/${room.id}`} key={room.id} className='w-full mb-1 text-white'>
                <motion.div 
                  
                  initial={{ opacity:0 }}
                  custom={i}
                  animate="visible"
                  variants={variants}
                  whileHover={{ scale:1.02}}
                  transition={{duration: .1, delay: 0}} 

                  className={style.roomLink} key={room.id}>
                    {room.get('name')} 
                </motion.div>
              </Link>
            )) : 
              (rooms.map( (room, i)=> 
              <div onClick={logInFirst} key={room.id} className='w-full mb-1 text-white'>
                <motion.div 
                  
                  initial={{ opacity:0 }}
                  custom={i}
                  animate="visible"
                  variants={variants}
                  whileHover={{ scale:1.02}}
                  transition={{duration: .1, delay: 0}} 

                  className={style.roomLink} key={room.id}>
                    {room.get('name')} 
                </motion.div>
              </div>
            )) */
            }
            {
              rooms.length ? chats : (
                <Stack spacing={1} width="90%">
                  <Skeleton variant="rounded" width="100%" height={45} />
                  <Skeleton variant="rounded" width="100%" height={45} />
                  <Skeleton variant="rounded" width="100%" height={45} />
                </Stack>
              )
            }
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
