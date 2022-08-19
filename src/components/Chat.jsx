import React, { useState, useEffect, useRef }  from 'react'
import Message from './Message';
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from '../Firebase';
import SendMessage from './SendMessage';

function Chat() {

  const style = {
    main: 'flex flex-col p-[10px] relative overflow-y-auto relative ',
    area:{
      gridArea: 'c'
    }
  }
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  const getMessages = () => {
    const q = query(collection(db, "messages"), orderBy('timeStamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
          messages.push({...doc.data(), id:doc.id});
          /* console.log(doc.data()); */
      });
      setMessages(messages)
    });
    return () => unsubscribe();
  }

  useEffect( ()=>{
    getMessages();
  }, [])

  return (
    <>
        <main className={style.main} style={style.area}>
          {/* Chat message component */}
          { messages ? messages.map((message)=>
            <Message key={message.id} message={message}></Message>
          ) : '' }

        <span ref={scroll}>
          {/* This span is just in order to create a css effect in which if a message gets displayed at the bottom 
              we will just autmatically scroll to it 
          */}  
        </span> 

        </main>
        {/* Send message component */}
        <SendMessage scroll={scroll} />  

    </>
  )
}

export default Chat