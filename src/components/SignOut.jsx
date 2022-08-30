import React from "react";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { motion } from 'framer-motion'

function SignOut() {
  const style = {
    btn: `bg-[#F8F0DF] cursor-pointer p-3 text-gray-500 shadow-gray-900 shadow-sm transition-shadow hover:shadow-lg duration-[250ms] `,
  };
  const [user] = useAuthState(auth);
  const goodBye = () => {
    signOut(auth)
      .then(() => {
        alert("Cya around, " + user.displayName);
      })
      .catch((error) => {
        alert("Oops! There seems to be an error");
        console.log(error);
      });
  };


  return (
    <motion.div 
      animate={{scale:1}}
      initial={{ scale:0 }}
      onClick={goodBye} className={style.btn}>
      Sign Out
    </motion.div>
  );
}

export default SignOut;
