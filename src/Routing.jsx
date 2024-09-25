// import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Payment from "./pages/Payment/Payment";
import Order from "./pages/Order/Order";
import Cart from "./pages/Cart/Cart";
import SharedLayOut from "./components/SharedLayOut/SharedLayOut";
import Results from "./pages/Resulets/Results";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const stripePromise = loadStripe(
  "pk_test_51Q1TSRGzcz8bMmnvLq7uz9hGbuePLLq6WiaR9xOvPknldjWxjDsJiAyRRt1D5JWA5Cn5B9K85U16G8zF5IQGktMB00XWuCEML7"
);

const Routing = () => {
  return (
    // <Router>
    <Routes>
      <Route path="/" element={<SharedLayOut />}>
        <Route path="/" element={<Landing />} />
        <Route
          path="/payments"
          element={
            <ProtectedRoute
              msg={"You must log in to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"You must log in to access your orders"}
              redirect={"/orders"}
            >
              <Elements stripe={stripePromise}>
                <Order />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productID" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
      <Route path="/auth" element={<Auth />} />
    </Routes>
    // </Router>
  );
};

export default Routing;
