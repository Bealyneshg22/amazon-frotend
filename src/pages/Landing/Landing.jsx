// import React from 'react'
import Carousel from "../../components/Carousel/Carousel";
import Category from "../../components/Category/Category";
import LayOut from "../../components/LayOut/LayOut";
import LowerPage from "../../components/LowerPage/LowerPage";

const Home = () => {
  return (
    <>
      <LayOut>
        <Carousel />
        <Category />
        <LowerPage />
      </LayOut>
    </>
  );
};

export default Home;
