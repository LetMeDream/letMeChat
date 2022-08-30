import React, { useEffect, useState } from "react";
import { auth } from "../Firebase";

function Message({ message }) {
  const style = {
    message: `flex items-center shadow-xl m-4 px-3 py-2 rounded-tl-xl rounded-tr-xl `,
    name: `absolute mt-[-4rem] text-gray-600 text-xs `,
    sent: `bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-xl `,
    received: `bg-[#e5e5ea] text-black float-left rounded-br-xl `,
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

  useEffect(() => {
    setDate(timeStampToDate());
    console.log("done!");
  }, [message]);

  return (
    <div>
      <div
        className={`${style.message} ${
          auth.currentUser?.uid === message.uid ? style.sent : style.received
        }`}
      >
        <p className={style.name}>{message.name ? message.name : "Anon"}</p>
        <p title={date}>{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
