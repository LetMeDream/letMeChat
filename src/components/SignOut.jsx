import React from "react";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { motion } from 'framer-motion'
import Button from '@mui/material/Button';

function SignOut() {
  const [user] = useAuthState(auth);
  const logOut = () => {
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
      onClick={logOut}>
        <Button variant="outlined" color="primary">Sign Out</Button>
    </motion.div>
  );
}

export default SignOut;
