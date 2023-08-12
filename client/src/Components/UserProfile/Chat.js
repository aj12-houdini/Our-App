import { useEffect, useState } from "react";

export default function Chat({ socket }) {
  const [messages, setMessages] = useState([]);
  const username = prompt("Enter username");
  useEffect(() => {
    socket.on(
      "private_chat",
      (data) => {
        console.log(data);
        setMessages([...messages, data]);
      },
      [socket, messages]
    );
  });
  function ChatBar({ socket }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      socket.on("newUsersResponse", (data) => setUsers(data));
    }, [socket, users]);
    return (
      <div className="chat-sidebar">
        <h2>Open Chat</h2>

        <div>
          <h3>ACTIVE USERS</h3>
          <div>
            {users.map((user) => {
              return <p>{user.userName}</p>;
            })}
          </div>
        </div>
      </div>
    );
  }
  function ChatBody({ messages }) {
    return (
      <div>
        <header className="chat__mainHeader">
          <p>Hangout with Colleagues</p>
        </header>

        {/*This shows messages sent from you*/}
        <div className="message__container">
          {messages.map((message) => {
            return message.name === localStorage.getItem("username") ? (
              <div className="message__chats">
                <p className="sender__name">You</p>
                <div className="message__sender">
                  <p>{message.text}</p>
                </div>
              </div>
            ) : (
              <div className="message__chats">
                <p>{message.name}</p>
                <div className="message__recipient">
                  <p>{message.text}</p>
                </div>
              </div>
            );
          })}

          {/*This shows messages received by you*/}
          {/*This is triggered when a user is typing*/}
          <div className="message__status">
            <p>Someone is typing...</p>
          </div>
        </div>
      </div>
    );
  }

  function ChatFooter() {
    const [message, setMessage] = useState("");
    function handleSubmit(e) {
      e.preventDefault();
      if (message.trim() && localStorage.getItem("username")) {
        socket.emit("private_chat", {
          message: message,
          to: username,
          socketId: socket.id,
        });
      }
      console.log({ username: localStorage.getItem("username"), message });
      setMessage("");
    }
    return (
      <div className="chat_footer">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter message"
            className="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn" type="submit">
            Send
          </button>
        </form>
      </div>
    );
  }
  return (
    <div className="chat">
      <ChatBar socket={socket} />

      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter />
      </div>
    </div>
  );
}
