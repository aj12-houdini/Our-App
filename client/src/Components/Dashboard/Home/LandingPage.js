import React from "react";
import NavBar from "../Nav";
import Body from "./Body";
import Search from "../../Common/search";
import Chat from "../../UserProfile/Chat";
export default function LandingPage({socket}) {
  return (
    <div>
      <NavBar />
      <Body />
      <Search/>
      <Chat socket={socket} />
    </div>
  );
}
