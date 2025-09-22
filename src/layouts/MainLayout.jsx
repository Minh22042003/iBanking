import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content-area">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
