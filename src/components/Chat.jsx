import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../Firebase";
import SendMessage from "./SendMessage";
import { motion } from 'framer-motion'
/*  */
import { auth } from "../Firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

function Chat({roomPath}) {

  const [user] = useAuthState(auth);
  const style = {
    main: "flex flex-col p-[10px] relative overflow-y-auto relative",
    area: {
      gridArea: "c",
    },
  };
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  /* This is for quering our normal messages in our collection located in collection(db, "messages")*/
  const getMessages = () => {
    const q = query(collection(db, roomPath), orderBy("timeStamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
        /* console.log(doc.data()); */
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  };

  /* Animating the messages appearance */
  /* const variant ={
    entrance: i => ({
      scale: 1,
      transition: {
        delay: i * 0.25,
        duration: .5
      },
    })
  } */

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <main className={style.main} style={style.area}>
        {/* Chat message component */}
        {messages
          ? messages.map((message, i) => (
              <motion.div
                initial={{ scale:0 }}
                animate={{ scale:1 }}
                key={i}
                /* variants={variant} */
                /* animate='entrance' */
                className={`${user?.uid === message.uid ? 'self-end' : 'self-start'} max-w-[80vw] md:max-w-max`}
              >
                <Message key={message.id} message={message} messagePath={roomPath}></Message>
              </motion.div>
            ))
          : ""}

        <span ref={scroll}>
          {/* This span is just in order to create a css effect in which if a message gets displayed at the bottom 
              we will just autmatically scroll to it 
          */}
        </span>
      </main>
      {/* Send message component */}
      <SendMessage scroll={scroll} messagePath={roomPath}/>
    </>
  );
}

export default Chat;
