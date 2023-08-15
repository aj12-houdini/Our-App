export default function ChatBar({ socket }) {
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
