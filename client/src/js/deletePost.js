export async function deletePost(props) {
    const options = {
      method: "DELETE",
      headers: {
        userId: localStorage.getItem("id"),
        postId: props.id,
      },
    };
    const response = await fetch("http://localhost:8000/delete/posts", options);
    const data = await response.json();
    window.location.href = "/dashboard/profile";
  }