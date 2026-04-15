import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Product from "./components/Product/Product";
import Error from "./Pages/Error/Error";
import Footer from "./components/Footer/Footer";
import CategoryProducts from "./components/CategoryProducts/CategoryProducts";
import SearchResults from "./components/SearchResults/SearchResults";
import ContactUs from "./Pages/ContactUs/ContactUs";
import About from "./Pages/About/About";
import CartItems from "./Pages/CartItems/CartItems";
import FavoriteItems from "./Pages/FavoriteItems/FavoriteItems";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <>
      <NavBar />
      <ScrollToTop />
      <main className="">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart-items" element={<CartItems />} />
          <Route path="/favorites" element={<FavoriteItems />} />
          <Route path="/products/:IdProduct" element={<Product />} />
          <Route path="/categories/:category" element={<CategoryProducts />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
