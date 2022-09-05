import React from "react";
import { auth } from "../Firebase";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import {motion} from 'framer-motion';



function Navbar() {
  const style = {
    nav: `bg-gray-800 flex justify-between p-5 items-center text-black`,
    heading: `text-white text-2xl`,
    area: {
      gridArea: "n",
    },
    navImg:"rounded-full w-16 cursor-pointer"
  };
  /* Is there any logged Google user? */
  const [user] = useAuthState(auth);
  console.log(user);

  return (
    <div className={style.nav} style={style.area}>
      <Link to="/letMeChat/" className={style.heading}>
        Let me +
      </Link>

      {user ? (
        <motion.img 
          animate={{scale:1, borderRadius:'10%'}}
          initial={{ scale:0, borderRadius: '100%' }}
          transition= {{ duration:.5 }}
          whileHover={{ borderRadius: '100%', scale:1.1 }}  
          className={style.navImg} src={user.photoURL}>
        </motion.img>
      ) : (
        ""
      )}

      {user ? <SignOut /> : <SignIn />}
    </div>
  );
}

export default Navbar;
