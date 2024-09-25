import { IoMenu } from "react-icons/io5";
import classes from "./header.module.css";

const LowerHeader = () => {
  return (
    <>
      <div className={classes.lower_container}>
        <ul>
          <li>
            <IoMenu size={30} />
            <p>All</p>
          </li>
          <li>Today's Deals</li>
          <li>Buy Again</li>
          <li>Customer Service</li>
          <li>Registry</li>
          <li>Gift Cards</li>
          <li>Sell</li>
        </ul>
        <div className={classes.shop}>
          <ul>
            <li>Shop Gaming Store</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LowerHeader;
