import React, { useState, useEffect } from "react";
import api from '../lib/api'
import {  useNavigate } from "react-router-dom";

const UserContext = React.createContext();

function UserProvider({ children }) {

  const [user, setUser] = useState({})
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [latestPost, setLatestPost] = useState({})
  const [latestProfile, setLatestProfile] = useState({})
  const [error, setError] = useState(null)



  async function loadUser() {
    const response = await api("/me")
    const body = await response.json()

    setUser(body || {})
    setProducts(body?.products)
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

  const updateUserProfile = (newProfile) => {
    setUser((prevUser) => ({
      ...prevUser,
      profile: newProfile,
    }));
  };

  const addUserProduct = (newProduct) => {
    setUser((prevUser) => ({
      ...prevUser,
      products: [...prevUser?.products, newProduct],
    }));
    setProducts((products) => [...products, newProduct])
  };

  const editUserProduct = (editedProduct) => {
    const updateProducts = (product) => product.id === editedProduct.id ? editedProduct : product

    setUser((prevUser) => ({
      ...prevUser,
      products: prevUser.products.map(updateProducts),
    }));
    setProducts((products) => products.map(updateProducts))
  };

  async function deleteProduct(id) {
    const filterProduct = (product) => product.id !== id

    setUser(({products, ...prevUser}) => ({...prevUser, products: products.filter(filterProduct)}))
    setProducts(products => products.filter(filterProduct))

    const response = await api(`/products/${id}`, {
      method: 'DELETE'
    })

    if(!response.ok) {
      console.error('Unable to delete product', await response.json())
    } else {

    }
      
  }

  // function editProduct(updatedProduct) {
  //   api(`/products/${updatedProduct.id}`, {
  //     method: 'PATCH',
  //   })
  // }


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
          categories,
          updateUserProfile,
          deleteProduct,
          addUserProduct,
          editUserProduct
          }}
        >
          { children }
        </UserContext.Provider>
    );
}
export { UserContext, UserProvider }
