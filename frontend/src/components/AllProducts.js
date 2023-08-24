import React, { useContext } from "react";
import { UserContext } from "../context/User";


function AllProducts() {
    const { products } = useContext(UserContext)
    

    if (!products) {
        return (
            <div>
              
            </div>
        )
    } else {

    }

    return (
        <div>
            All Products
        </div>
    )
}
export default AllProducts