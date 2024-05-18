import './App.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import MainPage from "./Components/MainPage";
import TechSupport from "./Components/TechSupport";
import RegisterPage from "./Components/RegisterPage";
import ForgotPage from "./Components/ForgotPage";
import FashionPage from "./Components/CategoryPages/FashionPage";
import ElectronicsPage from "./Components/CategoryPages/ElectronicsPage";
import MiscellaneousPage from "./Components/CategoryPages/MiscellaneousPage";
import HomesPage from "./Components/CategoryPages/HomesPage";
import ProductControlPage from "./Components/AdminPage/ProductControlPage";
import AddProductPage from "./Components/AdminPage/AddProductPage";
import AdminLoginPage from "./Components/AdminPage/AdminLoginPage";
import UserControlPage from "./Components/AdminPage/UserControlPage";
import ShoppingCart from "./Components/CartPage/ShoppingCart";
import AdminMainPage from "./Components/AdminPage/AdminMainPage";

function App() {
  return (
    <Router>
        <Routes>
            <Route index element={<MainPage/>} />
            <Route path="/main" element={<MainPage/>} />
            <Route path="/tech-support" element={<TechSupport/>} />
            <Route path="/cart" element={<ShoppingCart/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/find" element={<ForgotPage/>} />
            <Route path="/fashion" element={<FashionPage/>} />
            <Route path="/electronics" element={<ElectronicsPage/>} />
            <Route path="/miscellaneous" element={<MiscellaneousPage/>} />
            <Route path="/homes" element={<HomesPage/>} />
            <Route path="/admin/product-control" element={<ProductControlPage/>} />
            <Route path="/admin/add-product" element={<AddProductPage/>} />
            <Route path="/admin/login" element={<AdminLoginPage/>} />
            <Route path="/admin/main" element={<AdminMainPage/>} />
            <Route path="/admin/user-control" element={<UserControlPage/>} />

        </Routes>
    </Router>
  );
}

export default App;
