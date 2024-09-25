import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../API/EndPoints";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";

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
  return <>{isLoading ? <Loader /> : <ProductCard product={product} flex={true} renderAdd={true} renderDesc={true} />}</>;
};

export default ProductDetail;
