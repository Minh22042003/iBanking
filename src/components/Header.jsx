import { NavLink } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
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
        <span className="welcome-message">Welcome, User</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          className="avatar"
        />
      </div>
    </header>
  );
}
