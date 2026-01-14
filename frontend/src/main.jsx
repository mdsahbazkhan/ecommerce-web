import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";
import ShopContextProvider from "./context/ShopContextProvider.jsx";
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <BrowserRouter>
      <HelmetProvider>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </HelmetProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
