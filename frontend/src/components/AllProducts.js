import React, { useContext } from "react";
import { UserContext } from "../context/User";
import { NavLink, useNavigate, Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";

function AllProducts() {
    const { products } = useContext(UserContext)
    // console.log(products)

    // const AllProductsCard = ({id, name, price, color, product_photo_url}) => {
    //     <article>
    //         <Link to={`product/${id}`}>
    //             {name}
    //         </Link>
    //     </article>
    // }

    // const Tweet = ({body, id}) => (
    //     <article className="my-stuff">
    //       <Link to={`/tweets/${id}`}>
    //         {body}
    //         <br/>
    //       </Link>
    //     </article>
    //   )

    return (
        <div>
          <div className="home-page-grid">
            {products.map(p => (
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
                {/* <img 
                    src={p.product_photo_url} 
                    alt="Product Photo" 
                    className="product-image"
                    /> */}
              </article>
            ))}
          </div>
        </div>
      );
}
export default AllProducts