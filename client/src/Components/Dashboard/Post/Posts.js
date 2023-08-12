import { React, useEffect, useState } from "react";
import { checkLogin } from "../../../js/checkLogin";
import NavBar from "../Nav";
import PostBody from "./PostBody";
export default function Posts() {
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
        <div>
          <NavBar />
          <PostBody />
        </div>
      )}
    </div>
  );
}
