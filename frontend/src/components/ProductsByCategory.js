import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/User";
import { NavLink, useNavigate, Link } from "react-router-dom";
import api from "../lib/api";

function ProductsByCategory() {
    const {categories} = useContext(UserContext)
    const [productCategoryId, setProductCategoryId] = useState(parseInt(0))
    const [filteredProducts, setFilteredProducts] = useState([])
// console.log(categories)

useEffect(() => {
    if (productCategoryId !== "Select Category") {
        api(`/filter-products/${productCategoryId}`)
            .then(response => response.json())
            .then(data => setFilteredProducts(data));
    } else {
        // If "Select Category" is chosen, reset filteredProducts to an empty array
        setFilteredProducts([]);
    }
}, [productCategoryId]);

    console.log(filteredProducts)
    return (
        <div>
            products by category
            <form className="standard-form">
               
                <select name="category" onChange={(e) => setProductCategoryId(e.target.value )}>
                <option>Select Category</option>
                {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                
            </form>

           
            {productCategoryId === "Select Category" ? (
                null
            ) : filteredProducts.length === 0 ? (
                <p>No products in this category</p>
            ) : (
                <div className="home-page-grid">
                    {filteredProducts.map(p => (
                        <article key={p.id} className="product-article">
                            <Link to={`product/${p.id}`}>
                                <header>Name: {p.name}</header>
                            </Link>
                            Price: ${p.price}
                            <br />
                            color: {p.color}
                            <footer></footer>
                            <Link to={`product/${p.id}`}>
                                <img
                                    src={p.product_photo_url}
                                    alt="Product Photo"
                                    className="product-image"
                                />
                            </Link>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}
export default ProductsByCategory