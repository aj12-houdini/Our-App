export async function followUser(followerId, followed) {
  console.log(followed);
  const userId = localStorage.getItem("id");

  if (followed) followed = "Followed";
  else followed = "Unfollow";

  const options = {
    method: "PATCH",
    headers: new URLSearchParams({
      userId,
      followerId,
      followed,
    }),
  };
  const response = await fetch("http://localhost:8000/follow", options);
  const data = await response.json();
  console.log(data);
}
