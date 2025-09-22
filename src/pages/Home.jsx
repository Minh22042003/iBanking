import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home-page">
      <main className="main-content">
        <div className="main-header">
          <h2 className="main-title">Dashboard</h2>
          <p className="main-subtitle">Your financial overview</p>
        </div>

        <div className="cta-container">
          <div className="cta-content">
            <h3 className="cta-title">Easy Tuition Payments</h3>
            <p className="cta-description">
              Securely pay your tuition fees in just a few clicks.
            </p>
            <button className="cta-button">Pay Your Tuition</button>
          </div>
        </div>
      </main>
    </div>
  );
}
