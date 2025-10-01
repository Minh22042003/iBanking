import { NavLink } from "react-router-dom";
import "../styles/Header.css";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

export default function Header() {
  const [cookie, , removeCookie] = useCookies(["token"])
  const [username, setUsername] = useState("")
  const [avatar, setAvatar] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toogleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const Logout = () => {
    removeCookie("token", {path: '/'})
  }

  useEffect(() => {
    const token = cookie.token
    if(!token) return;
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (!res.ok) {
          throw new Error("Not authenticated");
        }
        const data = await res.json();
        setUsername(data.name);
        setAvatar(data.avatar);
      } catch (err) {
        console.error("Fetch user failed", err);
        // có thể xóa cookie token nếu hết hạn / không hợp lệ
        removeCookie("token", { path: "/" });
      }
    }
    fetchUser();
  }, [cookie.token, removeCookie])

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
        <a href="#" className="nav-link">
          History
        </a>
        <a href="#" className="nav-link">
          Profile
        </a>
      </nav>
      <div className="user-profile">
        <div className="profile" onClick={toogleMenu}>
          <span className="welcome-message">Welcome, {username || "User"}</span>
          <img
            src= {avatar || "https://i.pravatar.cc/40"}
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
