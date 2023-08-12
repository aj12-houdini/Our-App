import React from "react";
import NavBar from "../Nav";
import ProfileBody from "./ProfileBody";
import { useEffect, useState } from "react";
import { checkLogin } from "../../../js/checkLogin";


export default function Profile() {
  const [isLoggedIn, changeState] = useState(false);
  useEffect(() => {
    (async () => {
      const userLoggedIn = await checkLogin();
      userLoggedIn ? changeState(true) : (window.location.href = "/");
    })();
  });
  return (
    <div>
      {isLoggedIn && (
        <div className="profile">
          {" "}
          <NavBar /> <ProfileBody username = {localStorage.getItem("username")} id={localStorage.getItem("id")} />{" "}
        </div>
      )}
    </div>
  );
}
