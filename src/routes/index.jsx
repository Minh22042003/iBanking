import { BrowserRouter, Routes, Route } from "react-router-dom";                                      
import Home from "../pages/Home.jsx";                                                                   
import About from "../pages/About.jsx";                                                                 
import NotFound from "../pages/NotFound.jsx";                                                           
import Login from "../pages/Login.jsx";
import Payments from "../pages/Payments.jsx"; 
import MainLayout from "../layouts/MainLayout.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
