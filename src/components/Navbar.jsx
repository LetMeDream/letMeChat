import React from "react";
import { auth } from "../Firebase";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { Link } from "react-router-dom";

function Navbar() {
  const style = {
    nav: `bg-[#112D4E] flex justify-between p-5 items-center text-black`,
    heading: `text-white text-2xl`,
    area: {
      gridArea: "n",
    },
  };
  /* Is there any logged Google user? */
  const user = auth.currentUser;
  return (
    <div className={style.nav} style={style.area}>
      <Link to="/letMeChat/" className={style.heading}>
        Let me +
      </Link>

      {user ? (
        <img className="rounded-full w-16" src={user.photoURL}></img>
      ) : (
        ""
      )}

      {user ? <SignOut /> : <SignIn />}
    </div>
  );
}

export default Navbar;
