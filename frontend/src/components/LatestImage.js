// import { AppContext } from "../App";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/User";
import api from '../lib/api'

function LatestImage() {
    const {latestPost, setLatestPost} = useContext(UserContext)

    useEffect(() => {
        api("/latest")
        .then(response => response.json())
        .then((data) => {
            setLatestPost(data.image_url)
        })
        .catch((error) => console.error(error))
    }, [latestPost])

    return (
        <div>
            <img src={latestPost} alt="latest post"/>
        </div>
    )
}
export default LatestImage