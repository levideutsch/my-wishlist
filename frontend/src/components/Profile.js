import React, { useContext } from "react";
import { UserContext } from "../context/User";
import { NavLink, useNavigate, Link } from "react-router-dom";


function Profile() {
    const { user, deleteProfile } = useContext(UserContext)
// console.log(user.profile.id)

    const handleDelete = () => {
        deleteProfile(user.profile)
    }

if (!user.profile) {
    return (
    <div>
        <h1>Profile has not yet been created</h1>
        <Link to="/profile-form">
         <h3>Click here to create a new profile</h3>
        </Link>
        </div>
    )
} else {
    return (
        <div>
            <article>
            <h1>{user.username}'s Profile</h1>
            <header>Full Name
            <br />
            {user?.profile?.full_name}
            </header>
            <br/>
            <header>Age
            <br />    
            {user.profile?.age}
            </header>
            <br />
            <header>Sex
            <br />    
            {user.profile?.sex}
            </header>
            <header>Profile Photo
            <br />    
            <img src={user.profile?.profile_photo_url}></img>
            </header>
            </article>
            <button className="standard-form" onClick={handleDelete}>Delete Profile</button>
        </div>
    )
}

}
export default Profile