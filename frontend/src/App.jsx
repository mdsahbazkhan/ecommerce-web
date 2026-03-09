import { Toaster } from "sonner";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import FAQ from "./pages/Faq";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ShippingDelivery from "./pages/ShippingDelivery";
import ReturnsExchanges from "./pages/ReturnsExchanges";
import Verify from "./pages/Verify";
import Profile from "./pages/Profile";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <div className="px-4 sm:px-[5vw] md:px-[5vw] lg:px-[5vw]">
        <Navbar />
        <SearchBar />
        <Toaster richColors position="top-right" />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/collection" element={<Collection />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/product/:productId" element={<Product />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/place-order" element={<PlaceOrder />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/orders" element={<Orders />}></Route>{" "}
          <Route path="/verify" element={<Verify />}></Route>
          <Route path="/faq" element={<FAQ />}></Route>
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/shipping" element={<ShippingDelivery />} />
          <Route path="/returns" element={<ReturnsExchanges />} />
          <Route path="/support" element={<Contact />}></Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
