import "../styles/Login.css";

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-container">
          <div className="login-form">
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
            <h2 className="form-title">Welcome Back</h2>
            <p className="form-subtitle">
              Please log in to your account to continue
            </p>
            <form>
              <div className="input-group">
                <span className="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Username"
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <span className="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                />
              </div>
              <button type="submit" className="login-button">
                Log In
              </button>
            </form>
          </div>
        </div>
        <div className="branding-container">
          <div className="branding-content">
            <h2 className="branding-title">iBanking</h2>
            <p className="branding-subtitle">Tuition Payment Application</p>
            <p className="branding-description">
              Secure, fast, and reliable payments for your education.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
