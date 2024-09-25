import React, { useContext, useEffect, useState } from "react";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import classes from "./order.module.css";
import ProductCard from "../../components/Product/ProductCard";

const Order = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          // console.log(snapshot);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <section className={classes.container}>
      <div className={classes.orders_container}>
        <h2>Your Orders</h2>
        {orders?.length == 0 && (
          <div style={{ padding: "20px" }}>You don't Have Orders yet.</div>
        )}
        {/* ordered items */}
        <div>
          {orders?.map((eachOrder, i) => {
            return (
              <div key={i}>
                <hr />
                <p>OrderID: {eachOrder?.id}</p>
                {eachOrder?.data?.basket?.map((order) => (
                  <ProductCard flex={true} key={order.id} product={order} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Order;
