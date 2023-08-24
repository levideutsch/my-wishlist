import React, { useState, useEffect } from "react";
import api from '../lib/api'

const UserContext = React.createContext();

function UserProvider({ children }) {

  const [user, setUser] = useState({})
  const [products, setProducts] = useState(null)
  const [categories, setCategories] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [latestPost, setLatestPost] = useState({})
  const [latestProfile, setLatestProfile] = useState({})
  const [error, setError] = useState(null)

  console.log(user)

  // useEffect(() => {
  //   api("/me")
  //   .then(response => response.json())
  //   .then(data => {
  //     setUser(data)
  //     data.error ? setLoggedIn(false) :setLoggedIn(true)
  //   })
  // }, [])

  // const login = (user) => {
  //   setUser(user)
  //   setLoggedIn(true)
  // }

  async function loadUser() {
    const response = await api("/me")
    const body = await response.json()
    // console.log(body)

    setUser(body || {})
    setLoggedIn(body !== null)
  }  

  const login = async (username, password) => {
    const response = await api('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      try {
        const errorData = await response.json();
        setError(errorData.errors);
        console.log(errorData.errors)
      } catch (error) {
        setError(['An error occurred while processing your request.']);
      }
    } else {
      await loadUser();
      setError(null);
    }
  };

  useEffect(() => {
    async function load() {
     
      await loadUser();
    }
    load(); 
  }, [])

  const logout = () => {
    setUser({})
    setLoggedIn(false)
  }

  const signup = (user) => {
    setUser(user)
    setLoggedIn(true)
  }

  useEffect(() => {
    api("/categories")
    .then(response => {
      if (!response.ok) {
        response.json().then(err => {
          console.log(err)
        })
      } else {
        response.json().then(data => {
          console.log(data)
          setCategories(data)
        })
      }
    })
  }, [])
    

  // function addProduct(newProduct) {
  //   api("/products", {
  //     headers: 'POST',
  //     headers: { 'content-type': 'application/json' },
  //     body: JSON.stringify(newProduct)
  //   })
  //   .then((response) => {
  //     if (!response.ok) {
  //       response.json().then((err) => {
  //         console.log(err)
  //       })
  //     } else {
  //       response.json().then((data) => {
  //         console.log(data)
  //       })
  //     }
  //   })
  // }
 


  function deleteProfile(id) {
    api(`/profiles/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        response.json().then((err) => setError(err.errors))
      } else {
        console.log("deleted")
      }
    })
  }


    return (
        <UserContext.Provider value={{ 
          user,
          loggedIn,
          setLoggedIn,
          login,
          logout,
          signup,
          latestPost,
          setLatestPost, 
          latestProfile,
          setLatestProfile,
          error,
          setError,
          deleteProfile,
          products, 
          setProducts,
          categories
          // addProduct
          }}
        >
          { children }
        </UserContext.Provider>
    );
}
export { UserContext, UserProvider }
