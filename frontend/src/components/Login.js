import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom/dist";
import { UserContext } from "../context/User";

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginErrors, setLoginErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { login, error, setError } = useContext(UserContext)

    // console.log(error)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          setIsLoading(true);
          await login(username, password);
        } catch (error) {
          console.log(error);
          setLoginErrors([error.message]);
        } finally {
          setIsLoading(false);
        }
      };


    return (
        <div>
            <h1 className='standard-form'>Sign In</h1>
            <form onSubmit={handleSubmit} className='standard-form'>
                <input
                    placeholder='Username'
                    type='text'
                    id='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /> <br/>
                <input
                    placeholder='Password'
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <input type='submit'/>
                {error && <p key={error} className="button">{error}</p>}
             </form>
             <br />
             <NavLink to='/signup'>
             <p className='standard-form' onClick={() => setError([])}> Need Account?</p>
             </NavLink>

        </div>

    )
}
export default Login