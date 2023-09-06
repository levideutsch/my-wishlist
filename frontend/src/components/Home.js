import React, { useContext } from "react";
import { UserContext } from "../context/User";
import { Link } from "react-router-dom";
import AllProducts from "./AllProducts";


function Home() {
    const  {user, products } = useContext(UserContext)

    if (products === []) {
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
                {/* <h1>{user.username}'s Home Page</h1> */}
                <h3>{user.username?.charAt(0).toUpperCase() + user.username?.slice(1)}'s Home Page</h3>
                <AllProducts />
            </div>
        )
    }
 
}
export default Home