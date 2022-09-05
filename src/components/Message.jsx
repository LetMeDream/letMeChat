import React, { useEffect, useState } from "react";
import { auth } from "../Firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import Delete from './Delete';
import { motion } from 'framer-motion'

function Message({ message, messagePath }) {
  const style = {
    message: `flex items-center shadow-xl my-1 px-2 py-2 rounded-tl-xl rounded-tr-xl cursor-pointer relative`,
    name: ` text-black text-xs min-w-max`,
    globeSent: `bg-[#395dff] text-white rounded-bl-xl`,
    globeReceived: `bg-[#e5e5ea] text-black rounded-br-xl`,
    messageContainer:'flex flex-col px-2',
    messageSent:'items-end',
    messageReceived:'items-start'
  };
  const [date, setDate] = useState(0);
  const timeStampToDate = () => {
    let unix_timestamp = message.timeStamp;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    const hours = date.getHours();
    // Minutes part from the timestamp
    const minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    const seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    const formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return formattedTime;
  };
  const [user] = useAuthState(auth);

  useEffect(() => {
    setDate(timeStampToDate());
    /* console.log(message); */
  }, [message]);

  /* Let's show the Kebab Menu (<Delete/>) when hovering on it's parent as well */
  const deleteMotion= {
    rest:{
      opacity: 0 
    },
    hover:{
      opacity: 1
    }
  }

  return (
    <div className={`${style.messageContainer} ${user?.uid === message.uid ? style.messageSent : style.messageReceived}`}>
      <p className={style.name}>{message.name ? message.name : "Anon"}</p>
        <motion.div className={`${style.message} ${user?.uid === message.uid ? style.globeSent : style.globeReceived}`}
           initial='rest' whileHover='hover'>
        
          <p title={date}>{message.text}</p>
          {/* Delete */}
          { user?.uid === message.uid ? 
          (<motion.div className='absolute left-[-42px] text-black'
            variants={deleteMotion}
          >
            <Delete messagePath={messagePath} messageId={message.id}/>
          </motion.div>) 
          : '' }
        
        </motion.div>

    </div>
  );
}

export default Message;
