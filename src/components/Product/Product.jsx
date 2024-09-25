import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../API/EndPoints";
import ProductCard from "./ProductCard";
import Loader from "../Loader/Loader";
import classes from "../../pages/ProductDetail/productDetail.module.css";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { productID } = useParams();
  //   console.log(productID);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productID}`)
      .then((res) => {
        // console.log(res);
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("can't fetch ", err);
        setIsLoading(false);
      });
  }, []);
  return <div className={classes.product_container}>{isLoading ? <Loader /> : <ProductCard product={product} renderAdd={true}/>}</div>;
};

export default ProductDetail;
