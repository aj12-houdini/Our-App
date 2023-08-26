import { useEffect, useState } from "react";
import ChatFooter from "./Chat/ChatFooter";
import ChatBar from "./Chat/ChatBar";
import ChatBody from "./Chat/ChatBody";
export default function Chat({ socket }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on("private_chat", (data) => {
      console.log(data);
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />

      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
}
