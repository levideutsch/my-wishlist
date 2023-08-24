// import { AppContext } from "../App";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User";
import {  useNavigate } from "react-router-dom";
import api from '../lib/api'


function ProfileForm() {
    const { latestProfile, setLatestProfile, user} = useContext(UserContext)
    const [profileFormErrors, setProfileFormErrors] = useState(null)
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()

        const data = new FormData()

        const full_name = event.target.full_name.value;
        console.log(full_name)

        data.append("profile[full_name]", event.target.full_name.value)
        data.append("profile[age]", event.target.age.value)
        data.append("profile[sex]", event.target.sex.value)
        data.append("profile[profile_photo]", event.target.image.files[0])
        console.log(FormData)

        submitToAPI(data)
    }

    function submitToAPI(data) {
        api("/profiles", {
            method: 'POST',
            body: data
        })
        .then(response => {
            if (!response.ok) {
                response.json().then((err) => setProfileFormErrors(err.error))
            } else {
                navigate("/profile")
            }
        })
    }

    // console.log(profileFormErrors)


    if (user.profile) {
        return <h1>User has existing profile</h1>
    } else {

        return (
            <div>
                <h1>Create Profile</h1>
                <form onSubmit={(e) => handleSubmit(e)} className="standard-form">
                
                    {/* <label htmlFor="full_name">Full Name</label> */}
                    <input type="text" name="full_name" placeholder="Full Name"/>
                    <input type="number" name="age" placeholder="Age" />
                    <select name="sex">
                    <option>Select Sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    </select>
                    {/* <label htmlFor="image">Image</label> */}
                    <input type="file" name="image" />
                    <br />
    
                    <button type="submit">Create Profile</button>
                </form>
                <p>{profileFormErrors}</p>
    
            </div>
        )
    }
}
export default ProfileForm