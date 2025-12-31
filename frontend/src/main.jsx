import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";
import ShopContextProvider from "./context/ShopContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HelmetProvider>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </HelmetProvider>
  </BrowserRouter>
);
