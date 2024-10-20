import React, { useContext, useState } from "react";
import LayOut from "../../components/LayOut/LayOut"; // Importing the layout component for common UI elements
import classes from "./payment.module.css"; // Importing CSS module for custom payment page styles
import { DataContext } from "../../components/DataProvider/DataProvider"; // Importing global state
import ProductCard from "../../components/Product/ProductCard"; // Importing the ProductCard component to display the products in the basket
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"; // Importing Stripe hooks and components for payment processing
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat"; // Importing custom currency formatting component
import { axiosInstance } from "../../API/axios"; // Importing axios instance for making HTTP requests
import { ClipLoader } from "react-spinners"; // Importing a loading spinner
import { db } from "../../Utility/firebase"; // Importing Firebase for storing order data
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for routing
import { Type } from "../../Utility/action.type"; // Importing action types for the reducer
import { setDoc,doc,collection } from "firebase/firestore";

// Functional component for handling the payment process
function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext); // Accessing the basket and user from global state
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0); // Calculating total items in the basket
  const total = basket?.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  ); // Calculating the total price of items in the basket

  const [cardError, setCardError] = useState(null); // State to track any card-related errors
  const [processing, setProcessing] = useState(false); // State to track if payment is being processed

  const stripe = useStripe(); // Stripe hook to access Stripe functionality
  const elements = useElements(); // Stripe hook to access the card input elements
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle changes in the card input and set card error messages
  const handleChange = (e) => {
    setCardError(e?.error?.message || ""); // Set card error message if any
  };

  // Function to handle the payment process
  const handlePayment = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (basket.length === 0) {
      setCardError("Your basket is empty."); // If the basket is empty, show an error
      return;
    }

    try {
      setProcessing(true); // Start processing the payment

      // Make a request to the backend to create a payment intent with Stripe
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`, // Stripe expects the amount in cents, so multiply by 100
      });

      const clientSecret = response.data?.clientSecret; // Get the client secret from the response
console.log(clientSecret)
      // Confirm the card payment with Stripe
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement), // Get the card details from the CardElement
        },
      });
console.log(paymentIntent)
      // Store the order in Firebase Firestore
      try {
        await setDoc(
          doc(collection(db, "user"), user.uid, "orders", paymentIntent.id),
          {
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          }
        );
        console.log("Order saved successfully!");
        dispatch({ type: Type.EMPTY_BASKET });
        navigate("/orders", { state: { msg: "you have placed new order" } });
      } catch (error) {
        console.error("Error writing document: ", error);
      }

      // Clear the basket after successful payment
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false); // Stop processing
      navigate("/orders", { state: { msg: "You have placed a new order" } }); // Navigate to the orders page with a success message
    } catch (error) {
      setCardError(error.message || "Payment failed. Please try again."); // Handle payment errors
      setProcessing(false); // Stop processing if there is an error
    }
  };

  return (
    <>
      {/* header  */}
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>
      {/* payment method  */}
      <section className={classes.payment}>
        {/* address  */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago</div>
          </div>
        </div>
        <hr />
        {/* product  */}
        <div className={classes.flex}>
          <h3>Review items delivery</h3>
          <div>
            {basket?.map((item, i) => (
              <ProductCard key={i} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card for  */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* Error  */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* Card ELement  */}
                <CardElement onChange={handleChange} />
                {/* price  */}
                <div className={classes.payment_price}>
                  <div>
                    <span>Totals Order | ${total} </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Payment;
