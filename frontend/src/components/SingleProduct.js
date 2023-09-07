import React, { useContext, useState } from "react";
import { UserContext } from "../context/User";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/api";
import EditProduct from "./EditProduct";

function SingleProduct() {
    const [editFormFlag, setEditFormFlag] = useState(false)
    const [editedProduct, setEditedProduct] = useState({});
    const [selectCategory, setSelectCategory] = useState("")
    const { products, deleteProduct } = useContext(UserContext)
    const {id} = useParams()
    const navigate = useNavigate()

     

    const mySingleProduct = products.find(p => p.id === parseInt(id));
    

    const handleDeleteClick = () => {
        deleteProduct(mySingleProduct.id)
        navigate('/')
      };

     const toggleEditForm = () => {
        setEditFormFlag(!editFormFlag);
    };  

 

    if (!mySingleProduct) {
      return <div>Product Not Found</div>;
    }
      return (
        <div>
           
        <article>
            {mySingleProduct.name}
            <br />
            ${mySingleProduct.price}
            <br />
            {mySingleProduct.color}
            <br />
            <a href={mySingleProduct.product_url} target="_blank" rel="noopener noreferrer">
            <img 
            src={mySingleProduct.product_photo_url} 
            alt="Product Photo" 
            className="product-image"
            />
            </a>
        </article>

            <button onClick={handleDeleteClick} className="standard-form">
                Delete
            </button>
            <br />
            {editFormFlag ? (
                <EditProduct product={mySingleProduct}  onCancel={toggleEditForm} />
            ) : (
                <button onClick={() => setEditFormFlag(true)} className="standard-form">
                    Edit
                </button>
            )}
        </div>
    );
}

export default SingleProduct