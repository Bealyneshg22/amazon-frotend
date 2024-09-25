import React, { useContext, useState } from "react";
import classes from "./payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import {
  useStripe,
  useElements,
  PaymentElement,
  CardElement,
} from "@stripe/react-stripe-js";
import { axiosInstace } from "../../API/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

const Payment = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const [cardError, setCardError] = useState(null);
  // console.log(user);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // 1.backend || functions ---> contact to the client secret
      const response = await axiosInstace({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      // 2. client side (react side confirmation)

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // console.log(paymentIntent);

      // 3. after the confirmation ---> order firestore database Save, clear basket

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // Empty in the basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed new order" } });
    } catch (error) {
      console.log("can't fetch", error);
      setProcessing(false);
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
};

export default Payment;
