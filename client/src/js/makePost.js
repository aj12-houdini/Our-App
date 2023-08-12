export async function makePost(event) {
    event.preventDefault();

    const form = new FormData(event.target);
    const title = form.get("title");
    const description = form.get("description");
    const options = {
      method: "POST",
      body: new URLSearchParams({
        id: localStorage.getItem("id"),
        username: localStorage.getItem("username"),
        title,
        description,
      }),
    };
    const getResponse = await fetch("http://localhost:8000/post", options);
    const data = await getResponse.json();
    if(data.created){
      window.location.href='/dashboard/profile'
    }
  }