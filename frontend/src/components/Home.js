import React, { useContext } from "react";
import { UserContext } from "../context/User";
import { NavLink, useNavigate, Link } from "react-router-dom";
import AllProducts from "./AllProducts";
import ProductForm from "./ProductForm";

function Home() {
    const  {user, loggedIn, products } = useContext(UserContext)

    if (products == null) {
        return (
            <div>
                <Link to="product-form">
                    product form
                </Link>
            </div>
        )
    } else {
        return (
            <div>
                <h1>{user.username}'s Home Page</h1>
                <AllProducts />
            </div>
        )
    }
 
}
export default Home