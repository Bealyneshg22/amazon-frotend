import React, { useEffect, useState } from "react";
import { categoryInfo } from "./CategoryFullInfo";
import CategoryCard from "./CategoryCard";
import classes from "./category.module.css";
import { productUrl } from "../../API/EndPoints";
import Loader from "../../components/Loader/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";

const Category = () => {
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
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.category_container}>
          {categoryInfo.map((singleInfo, i) => {
            return <CategoryCard key={i} data={singleInfo} product={product}/>;
          })}
        </section>
      )}
    </>
  );
};

export default Category;
