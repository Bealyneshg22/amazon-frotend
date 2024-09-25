import React, { useContext } from "react";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { Link } from "react-router-dom";
import classes from "./cart.module.css";
// import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat'
import { Type } from "../../Utility/action.type";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";


const Cart = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price + amount;
  }, 0);

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };
  return (
    <section className={classes.container}>
      <div className={classes.cart_container}>
        <h2>Hello</h2>
        <h3>Your shopping basket</h3>
        <hr />
        {basket?.length === 0 ? (
          <p>Oops! No item in your cart</p>
        ) : (
          basket?.map((item, i) => {
            return (
              <section key={i} className={classes.cart_product}>
                <ProductCard
                  key={i}
                  product={item}
                  renderDesc={true}
                  flex={true}
                  renderAdd={false}
                />
                <div className={classes.btn_container}>
                  <button
                    className={classes.btn}
                    onClick={() => increment(item)}
                  >
                    <FaChevronUp size={20}/>
                  </button>
                  <span> {item.amount}</span>
                  <button
                    className={classes.btn}
                    onClick={() => decrement(item.id)}
                  >
                    <FaChevronDown size={20} />
                  </button>
                </div>
              </section>
            );
          })
        )}
      </div>
      {basket?.length !== 0 && (
        <div className={classes.subtotal}>
          <div>
            <p>Subtotal ({basket?.length}) items</p>
            {/* <CurrencyFormat amount={total}/> */}${total}
          </div>
          <span>
            <input type="checkbox" />
            <small>This order contains a gift</small>
          </span>
          <Link to="/payments">Continue to checkout</Link>
        </div>
      )}
    </section>
  );
};

export default Cart;
