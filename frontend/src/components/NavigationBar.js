import React, { useContext } from "react";
import { UserContext } from "../context/User";
import { NavLink, useNavigate, Link } from "react-router-dom";
import api from '../lib/api'

function NavigationBar() {
    const { user, logout } = useContext(UserContext)
    const navigate = useNavigate()

    const logoutUser = () => {
        api("/logout", {
            method: 'DELETE',
            headers: {"Content-Type":'application/json'}
        })
        .then(() => {
            logout()
            navigate("/")
        })
    }

    return (
        <div>
            <Link to="/">
                <h3>{user.username}'s Wishlist</h3>
            </Link>
            <Link to="/profile">
                <img 
                src={user.profile?.profile_photo_url}
                className="circular-image"
                ></img>
            </Link>
            <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <br/>
                <li onClick={logoutUser}><a>Logout</a></li>
            </ul>
            </nav>
            <hr />
    </div>
    )
}
export default NavigationBar