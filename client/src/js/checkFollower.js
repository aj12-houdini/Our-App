export async function checkFollower(followerId) {
  const options = {
    method: "GET",
    headers: new URLSearchParams({
      userId: localStorage.getItem("id"),
      followerId,
    }),
  };
  const res = await fetch("http://localhost:8000/get/follower", options);
  const data = await res.json();
  console.log(data);
  return {
    isFollowing: data.following,
    followers: data.followersArr,
    following: data.followingArr,
  };
}
