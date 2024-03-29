// import { AppContext } from "../App";
import React, { useContext } from "react";
import { UserContext } from "../context/User";
import api from '../lib/api'


function FileForm() {
    const {latestPost, setLatestPost} = useContext(UserContext)

    function handleSubmit(event) {
        event.preventDefault()

        const data = new FormData()

        data.append("post[title]", event.target.title.value)
        data.append("post[image]", event.target.image.files[0])

        submitToAPI(data)
    }

    function submitToAPI(data) {
        api("/posts", {
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(data => {
            setLatestPost(data.image_url)
            
        })
        .catch(error => console.error(error))
    }
    

    return (
        <div>
            <h1>File Form</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title"/>
                <br />
              
                <label htmlFor="image">Image</label>
                <input type="file" name="image" />
                <br />

                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}
export default FileForm