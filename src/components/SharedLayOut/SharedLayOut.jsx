// import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const SharedLayOut = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default SharedLayOut;
