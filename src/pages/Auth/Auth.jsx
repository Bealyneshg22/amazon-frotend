import React, { useContext, useState } from "react";
import Logo from "../../assets/authLogo.jpg";
import classes from "./signUp.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import Loader from "../../components/Loader/Loader";
import { ClipLoader } from "react-spinners";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState({ signIn: false, signUP: false });
  const [{ user }, dispatch] = useContext(DataContext);
  const navStateData = useLocation();
  // console.log(navStateData);
  const navigate = useNavigate();
  // console.log(user);
  const authHandler = async (e) => {
    e.preventDefault();
    console.log("hi");
    // console.log(e.target.name);
    if (e.target.name == "signin") {
      // firebase auth
      setLoading({ ...Loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...Loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          console.log(err.message);
        });
    } else {
      setLoading({ ...Loading, signUP: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...Loading, signUP: false });
          navigate("/");
        })
        .catch((err) => {
          // console.log(err);
          setError(err.message);
        });
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img src={Logo} alt="" />
      </Link>

      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData.state.msg}
          </small>
        )}
        <form>
          <div>
            <label htmlFor="email">E-mail</label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="Password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signInButton}
          >
            {Loading.signIn ? (
              <ClipLoader color="#000" size={15} />
            ) : (
              " Sign In"
            )}
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button
          name="signup"
          type="submit"
          onClick={authHandler}
          className={classes.login_registerButton}
        >
          {" "}
          {Loading.signUP ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            " Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "Red" }}>{error}</small>
        )}
      </div>
    </section>
  );
};

export default Auth;
