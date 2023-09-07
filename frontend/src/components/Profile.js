import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User";
import { NavLink, useNavigate, Link } from "react-router-dom";


function Profile() {
    const { user, deleteProfile, updateUserProfile } = useContext(UserContext)
    const navigate = useNavigate()
    const [profileDeleted, setProfileDeleted] = useState(false);


   
    const handleDelete = async () => {
        await deleteProfile(user.profile);
        updateUserProfile(null); 
        setProfileDeleted(true);
      };

      useEffect(() => {
        if (profileDeleted) {
          // Reset the profileDeleted state to false
          setProfileDeleted(false);
      
          // Reset the user's context profile
          updateUserProfile(null); // Reset the user's profile
        }
      }, [profileDeleted]);

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