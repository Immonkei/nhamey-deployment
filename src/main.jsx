import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { BrowserRouter, Routes, Route } from "react-router"
import Rasturant from "./pages/MenuPage/Rasturant.jsx"
import Root from "./pages/Layout/Root.jsx"
import Food from "./pages/MenuPage/Food.jsx"
import About from "./pages/MenuPage/About.jsx"
import Register from "./pages/MenuPage/Register.jsx"
import Login from "./pages/MenuPage/Login.jsx"
import FoodDetails from "./pages/MenuPage/FoodDetails.jsx"
import RestaurantDetail from "./pages/MenuPage/RestaurantDetail.jsx"
import Wishlist from "./pages/MenuPage/wishlist.jsx"
import Profile from "./pages/MenuPage/Profile.jsx"


createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <Routes>
        <Route element={<Root />}>
          <Route path="/" element={<App />} />
          <Route path="/restaurant" element={<Rasturant />} />
          <Route path="/food" element={<Food />} />
          <Route path="/About" element={<About />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          
          <Route path="/categories" element={<categories />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          

        </Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>

)

