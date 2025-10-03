import { NavLink } from "react-router-dom";
import "../styles/Header.css";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useUserInfo } from "../hooks/useUserInfo";

export default function Header() {
  const [cookie, , removeCookie] = useCookies(["token"])
  const token = cookie.token;
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = useUserInfo(token, removeCookie);

  const toogleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const Logout = () => {
    removeCookie("token", {path: '/'})
  }

  return (
    <header className="header">
      <div className="logo-container">
        <svg
          className="logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
        </svg>
        <h1 className="app-title">iBanking</h1>
      </div>
      <nav className="navigation">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/payments" className="nav-link">
          Payments
        </NavLink>
        <NavLink to="/history" className="nav-link">
          History
        </NavLink>
        <a href="#" className="nav-link">
          Profile
        </a>
      </nav>
      <div className="user-profile">
        <div className="profile" onClick={toogleMenu}>
          <span className="welcome-message">Welcome, {user?.Username || "User"}</span>
          <img
            src= {"https://i.pravatar.cc/40"}
            alt="User Avatar"
            className="avatar"
          />
        </div>
        {
          isMenuOpen && 
          <div className="dropdown-menu">
            <div className="menu-item">Thông tin người dùng</div>
            <div className="menu-item" onClick={Logout}>Đăng xuất</div>
          </div>
        }
      </div>
    </header>
  );
}
