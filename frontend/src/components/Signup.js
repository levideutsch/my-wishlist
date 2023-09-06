import React, { useState, useContext } from "react";
import { UserContext } from "../context/User";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom/dist";
import api from '../lib/api'

function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errorsList, setErrorsList] = useState([])
    const { signup } = useContext(UserContext)
    const navigate = useNavigate()

    // console.log(errorsList)

    const handleSubmit = (event) => {
        event.preventDefault()

        api("/signup", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password,
                password_confirmation: passwordConfirmation
            })
        })
        .then(response => response.json())
        .then(user => {
            if (!user.errors) {
                signup(user)
                navigate("/")
            } else {
                setUsername("")
                setPassword("")
                setPasswordConfirmation("")
                const errorsLi = user.errors.map((e, index) => <li className="standard-form" key={index}>{e}</li>)
                setErrorsList(errorsLi)
            }
        })
    };

    return (
        <div>
            <h1 className="standard-form">Signup</h1>
            <form onSubmit={handleSubmit} className="standard-form">
                <input 
                    placeholder="Username"
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /> <br />
                <input 
                    placeholder="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /> <br />
                <input 
                    placeholder="Confirm Password"
                    type="password"
                    id="password_confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                /> <br />
                <input type="submit" />
            </form>
            <ul>
                {errorsList}
            </ul>
            <br />
            <NavLink to="/">
            <p className='standard-form' onClick={() => setErrorsList(null)}>Already have an account?</p>
            </NavLink>
        </div>
    )
}
export default Signup