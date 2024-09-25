// import React from 'react'
import classes from "./header.module.css";
import amazonLogo from "../../assets/amazon-logo.png";
import usaFlag from "../../assets/usa-flag.png";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

const Header = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          {/* amazon logo */}
          <div className={classes.logo_container}>
            <a href="/">
              <img src={amazonLogo} alt="Amazon Logo" />
            </a>
            <div className={classes.delivery}>
              <span>
                {/* location icon */}
                <CiLocationOn size={23} />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* search */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" placeholder="Search Amazon" />
            {/* search icon */}
            <BsSearch size={38.2} />
          </div>

          {/* right side links */}
          <div className={classes.order_container}>
            <Link className={classes.language} to="#">
              <img src={usaFlag} alt="USA Flag" />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>

            <Link className={classes.signIn} to={!user && "/auth"}>
              <div>
                <div>
                  {user ? (
                    <>
                      <p>Hello, {user?.email?.split("@")[0]}</p>
                      <span onClick={() => auth.signOut()}>Log Out</span>
                    </>
                  ) : (
                    <>
                      <p>Hello, Sigh In</p> <span>Account & Lists</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
            {/* order */}
            <Link className={classes.signIn} to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              {/* cart icon */}
              <BiCart size={35} />

              <span className={classes.cartNo}>{totalItem}</span>
              <span className={classes.signIn}>
                <span>Cart</span>
              </span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
