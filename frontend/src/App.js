import './App.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import MainPage from "./Components/MainPage";
import TechSupport from "./Components/TechSupport";
import Cart from "./Components/Cart";
import RegisterPage from "./Components/RegisterPage";
import ForgotPage from "./Components/ForgotPage";
import FashionPage from "./Components/CategoryPages/FashionPage";
import ElectronicsPage from "./Components/CategoryPages/ElectronicsPage";
import MiscellaneousPage from "./Components/CategoryPages/MiscellaneousPage";
import HomesPage from "./Components/CategoryPages/HomesPage";

function App() {
  return (
    <Router>
        <Routes>
            <Route index element={<MainPage/>} />
            <Route path="/main" element={<MainPage/>} />
            <Route path="/tech-support" element={<TechSupport/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/find" element={<ForgotPage/>} />
            <Route path="/fashion" element={<FashionPage/>} />
            <Route path="/electronics" element={<ElectronicsPage/>} />
            <Route path="/miscellaneous" element={<MiscellaneousPage/>} />
            <Route path="/homes" element={<HomesPage/>} />

        </Routes>
    </Router>
  );
}

export default App;
