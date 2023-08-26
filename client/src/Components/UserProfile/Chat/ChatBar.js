import { useState,useEffect } from "react";

export default function ChatBar({ socket }) {

  const [users,updateUsers] = useState([])
  useEffect(() => {
    socket.on("user connected", (receivedUsers) => {
      console.log(receivedUsers)
        updateUsers([receivedUsers,...users])
    });
  });
  return (
    <div className="chat-sidebar">
      <h2>Open Chat</h2>

      <div>
        <h3>ACTIVE USERS</h3>
        <div>
          {users.map((user) => {
            return <p>{user.username}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
