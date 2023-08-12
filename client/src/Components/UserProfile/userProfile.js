import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileBody from "../Dashboard/Profile/ProfileBody";
import NavBar from "../Dashboard/Nav";

export default function UserProfile() {
  const { userid } = useParams();
  const [id, changeId] = useState("");
  const [username, changeUser] = useState("");
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:8000/get/users/${userid}`);
      const data = await res.json();
      changeId(userid);
      changeUser(data.username);
    })();
  }, [id, username]);

  return (
    <div className="profile">
      <NavBar />
      <ProfileBody id={userid} username={username} />
    </div>
  );
}
