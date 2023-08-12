import { useEffect, useState } from "react";
import "../../../css/Dashboard/dashboard.css";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import { showTimelinePost } from "../../../js/showTimelinePost";
import PostHeader from "../Post/PostHeader";
import { Container } from "@mui/material";
export default function Body() {
  const [posts, updatePosts] = useState([]);

  useEffect(() => {
    (async () => {
      const getPosts = await showTimelinePost(localStorage.getItem("id"));
      updatePosts(getPosts.followedPostsArr);
    })();
  }, []);

  return (
    <Container style={{ marginTop: "50px" }}>
      {posts.length ? (
        posts.map((post) => (
          <PostHeader
            userFlag={false}
            id={post.id}
            title={post.title}
            date={post.date}
            descr={post.description}
            user = {post.user}
          />
        ))
      ) : (
        <h1 style={{ textAlign: "center" }}>No posts to show</h1>
      )}
    </Container>
  );
}
