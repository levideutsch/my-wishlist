import React, {useState, useContext} from "react";
import { UserContext } from "../context/User";
import {  useNavigate } from "react-router-dom";

function EditProduct({ onCancel, product }) {
    const {categories, editUserProduct} = useContext(UserContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: product.name,
        price: product.price,
        color: product.color,
        product_url: product.product_url,
        category_id: product.category_id,
      });

const handleFileChange = (e) => {
formData.product_photo = e.target.files[0];
};      

const handleColorChange = (e) => {
    setFormData({ ...formData, color: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category_id: e.target.value });
  };  


    // console.log(product.name)  
    // console.log(product.price)  
    // console.log(product.color)  
    // console.log(product.product_url)
    // console.log(product.category_id)

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedFormData = new FormData();
        updatedFormData.append("product[name]", formData.name);
        updatedFormData.append("product[price]", formData.price);
        updatedFormData.append("product[color]", formData.color);
        updatedFormData.append("product[product_url]", formData.product_url);
        updatedFormData.append("product[category_id]", formData.category_id);
    
        // Check if a new product photo is provided
        if (formData.product_photo) {
          updatedFormData.append("product[product_photo]", formData.product_photo);
        }
    
        try {
          const response = await fetch(`/products/${product.id}`, {
            method: "PATCH",
            body: updatedFormData,
          });

          const body = await response.json()
    
          if (response.ok) {
            // Handle success, e.g., show a success message or redirect
            console.log("Product updated successfully!");
            editUserProduct(body)
            navigate('/')
          } else {
            console.error("Error updating product invalid response:", body)
          }
        } catch (error) {
          // Handle errors, e.g., display error messages to the user
          console.error("Error updating product:", error);
        }
      };
    

    // function handleSubmit(event) {
    //     event.preventDefault()

    //     const data = new FormData()

    //     data.append("product[name]", event.target.name.value)
    //     data.append("product[price]", event.target.price.value)
    //     data.append("product[product_url]", event.target.product_url.value)
    //     data.append("product[color]", event.target.color.value)
    //     // data.append("product[category_name]", event.target.category.value)
    //     data.append("product[category_name]", selectCategory)
    //     data.append("product[product_photo]", event.target.image.files[0])

    //     submitEditToApi(data)

    // }  

    // function submitEditToApi(updatedProduct) {
    //     api(`/products/${updatedProduct.id}`, {
    //         method: 'PATCH',
    //         body: updatedProduct
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             console.log("unable to edit product")
    //         } else {
    //             console.log("product edited")
    //         }
    //     })
    // }
    return (
        <div>
            <article>
              
            <form onSubmit={handleSubmit} className="standard-form">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
                <input
                    type="text"
                    name="product_url"
                    value={formData.product_url}
                    onChange={(e) => setFormData({ ...formData, product_url: e.target.value })}
                />
                <select name="color" value={formData.color} onChange={handleColorChange}>
                    <option>Select Color</option>   
                    <option value="white">White</option>
                    <option value="black">Black</option>
                </select>
                <select name="category" value={formData.category_id} onChange={handleCategoryChange}>
                    <option>Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <input
                    type="file"
                    name="product_photo"
                    onChange={handleFileChange} 
                />
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button> {/* Add a Cancel button */}
            </form>
            </article>
        </div>
    )
}
export default EditProduct