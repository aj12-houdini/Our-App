export default function ChatBody({ messages }) {
    return (
      <div>
        <header className="chat__mainHeader">
          <p>Hangout with Colleagues</p>
        </header>

        {/*This shows messages sent from you*/}
        <div className="message__container">
          {messages.map((message) => {
            return message.username === localStorage.getItem("username") ? (
              <div className="message__chats">
                <p className="sender__name">You</p>
                <div className="message__sender">
                  <p>{message.message}</p>
                </div>
              </div>
            ) : (
              <div className="message__chats">
                <p>{message.username}</p>
                <div className="message__recipient">
                  <p>{message.message}</p>
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