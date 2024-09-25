import React, { useContext, useEffect } from "react";
import "./App.css";
import { DataContext } from "./components/DataProvider/DataProvider";
import Routing from "./Routing";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/firebase";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      }
    });
  }, []);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
