import React, { useState, useContext } from "react";
import { UserContext } from "../context/User";
import {  useNavigate } from "react-router-dom";
import api from '../lib/api'

function ProductForm() {
    const [productFormErrors, setProductFormErrors] = useState(null)
    const {products, categories} = useContext(UserContext)
    const navigate = useNavigate()


    function handleSubmit(event) {
        event.preventDefault()

        const data = new FormData()

        data.append("product[name]", event.target.name.value)
        data.append("product[price]", event.target.price.value)
        data.append("product[product_url]", event.target.product_url.value)
        data.append("product[color]", event.target.color.value)
        data.append("product[category_id]", event.target.category.value)
        data.append("product[product_photo]", event.target.image.files[0])

        submitToAPI(data)
    }


    function submitToAPI(data) {
        api("/products", {
            method: 'POST',
            body: data
        })
        .then(response => {
            if (!response.ok) {
                response.json().then((err) => setProductFormErrors(err.error))
            } else {
                navigate("/profile")
            }
        })
    }

    return (
        <div>
        <h1>Add Product</h1>
         <form onSubmit={(e) => handleSubmit(e)} className="standard-form">
            <input type="text" name="name" placeholder="name" />
            <input type="number" name="price" placeholder="Price" />
            <input type="text" name="product_url" placeholder="Product_url" />
            <select name="color">
            <option>Select Color</option>
            <option value="white">White</option>
            <option value="black">Black</option>
            </select>
            <select name="category">
            <option>Select Category</option>
            {categories?.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
            <input type="file" name="image" />
            <br />
            <button type="submit">Add Product</button>
        </form>
        <p>{productFormErrors}</p>
        </div>
    )
}
export default ProductForm
