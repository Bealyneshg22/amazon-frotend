import React, { useContext, useEffect } from "react";
import classes from "../../pages/ProductDetail/productDetail.module.css";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";


const ProductCard = ({
  product,
  flex,
  renderDesc,
  renderAdd,
  renderAddCart,
}) => {
  const { image, title, id, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext);
  // console.log(state);
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description },
    });
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} className={classes.img_container} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div className={classes.description}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating?.rate} precision={0.1} />

          <small>{rating?.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button
            onClick={addToCart}
            className={`${classes.button} ${
              renderAddCart ? classes.display_none : ""
            }`}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
