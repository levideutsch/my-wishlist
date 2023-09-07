import React, { useState, useContext } from "react";
import { UserContext } from "../context/User";
import {  useNavigate } from "react-router-dom";
import api from '../lib/api'

function ProductForm() {
    const [productFormErrors, setProductFormErrors] = useState(null)
    const {products, categories, addUserProduct} = useContext(UserContext)
    const [selectCategory, setSelectCategory] = useState("")
    const navigate = useNavigate()

    
      
  
    function handleSubmit(event) {
        event.preventDefault()

        const data = new FormData()

        const myPrice = event.target.price.value
        console.log(typeof parseFloat(myPrice))

        const { name, price, product_url, color, image } = event.target
      
        data.append("product[name]", name.value)
        data.append("product[price]", price.value)
        data.append("product[product_url]", product_url.value)
        data.append("product[color]", color.value)
        data.append("product[category_name]", selectCategory)
        data.append("product[product_photo]", image.files[0])

        submitToAPI(data)
    }


    async function submitToAPI(data) {
      const response = await api('/products', { method: 'POST', body: data })
      const body = await response.json()

      if (!response.ok) {
        setProductFormErrors(body.error)
      } else {
        addUserProduct(body)
        navigate("/")
      }
    }

    return (
        <div>
        <h1>Add Product</h1>
         <form onSubmit={(e) => handleSubmit(e)} className="standard-form">
            <input type="text" name="name" placeholder="Name" />
            <input type="number" name="price" placeholder="Price" />
            {/* <input type="number" name="price" placeholder="Price" step="0.01" /> */}
            <input type="text" name="product_url" placeholder="Product_url" />
            <select name="color">
            <option>Select Color</option>
            <option value="white">White</option>
            <option value="black">Black</option>
            </select>

            <select name="category" onChange={(e) => setSelectCategory(e.target.value)}>
            <option>Select Category</option>
            {categories?.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
            <input type="file" name="image" />
            <br />
            <button type="submit">Add Product</button>
        </form>
        {/* <p>{productFormErrors}</p> */}

        {productFormErrors && (
        <div>
          {Array.isArray(productFormErrors) ? (
            <ul>
              {productFormErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          ) : (
            <p>{JSON.stringify(productFormErrors, null, 2)}</p>
          )}
        </div>
      )}
       </div>
    )
}
export default ProductForm
