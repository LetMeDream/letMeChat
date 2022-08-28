import { collection, serverTimestamp, addDoc } from 'firebase/firestore';
import React, {useState} from 'react'
import {auth, db} from '../Firebase'

function SendMessage({scroll}) {

  const style = {
    form: `h-14 w-full max-w-[720px] mx-auto flex text-xl caret-transparent`,
    input: `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none caret-white`,
    btn: `min-w-max w-[20%] bg-[#3F72AF] rounded-none`,
    area:{
      gridArea: 'x'
    }
  }

  const [input, setInput] = useState('');
  const {displayName, uid} = auth.currentUser ? auth.currentUser : '';

  const sendMessage = async (e) =>{
    e.preventDefault();
    // Add a new document in collection "cities"
    if(!auth.currentUser){
      alert('You must log in before sending any message');
      setInput('');
      return
    }


    if(input){
        await addDoc(collection(db, "messages"), {
            text: input,
            name: displayName,
            uid,
            timeStamp: serverTimestamp()
        });
        setInput('');
        scroll.current.scrollIntoView({ behavior: 'smooth' });
    }

  }

  return (
    <form onSubmit={sendMessage} className={style.form + ''}  style={style.area} >
        <input value={input} onChange={ (e) => { setInput(e.target.value) } } type="text" className={style.input} placeholder='Message' />
        <button type="submit" className={style.btn}>Send it</button>
    </form>
  )
}

export default SendMessage