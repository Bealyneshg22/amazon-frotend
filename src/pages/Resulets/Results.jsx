// import React from "react";
import LayOut from "../../components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../API/EndPoints";
import { useEffect, useState } from "react";
import classes from "./results.module.css";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";

const Results = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { categoryName } = useParams();
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        // console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Can't Fetch ", err);
        setIsLoading(false);
      });
  }, []);

  // .then((results) => results);
  return (
    // <LayOut>
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>Category /{categoryName}</p>
          <hr />
          <div className={classes.products_container}>
            {results?.map((product) => (
              <ProductCard key={product.id} renderAdd={true} product={product} />
            ))}
          </div>
        </section>
      )}
    </>
    // </LayOut>
  );
};

export default Results;
