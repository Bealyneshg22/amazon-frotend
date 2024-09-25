import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./components/DataProvider/DataProvider.jsx";
import { reducer, initialState } from "./Utility/reducer";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <DataProvider reducer={reducer} initialState={initialState}>
        <App />
      </DataProvider>
    </BrowserRouter>
  </StrictMode>
);
