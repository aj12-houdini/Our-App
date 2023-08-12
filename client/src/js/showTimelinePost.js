export async function showTimelinePost(userId){
    const options = {
        method: "GET",
        headers: new URLSearchParams({
            userId
        })
    }
    const res = await fetch("http://localhost:8000/get/following/posts",options)
    const data = await res.json()
    return data

}