import { useEffect, useState } from "react";
import axios from "axios";
// import LowerPageCard from "./LowerPageCard";
import Loader from "../Loader/Loader";
import { productUrl } from "../../API/EndPoints";
import classes from "../../pages/ProductDetail/productDetail.module.css";
import ProductCard from "../Product/ProductCard";


const LowerPage = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${productUrl}/products`)
      .then((res) => {
        setProduct(res.data);
        // console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Can't Fetch ", err);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={classes.lower_page_container}>
          {product.map((singleProduct, i) => {
            return (
              <ProductCard
                key={i}
                product={singleProduct}
                flex={false}
                renderAdd={true}
                renderDesc={false}
                renderAddCart={true}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default LowerPage;
