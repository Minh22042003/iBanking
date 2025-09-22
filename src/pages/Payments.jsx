import { useState, useEffect } from "react";
import "../styles/Payments.css";

export default function Payments() {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(studentId !== "" && studentName !== "" && agreeTerms);
  }, [studentId, studentName, agreeTerms]);

  return (
    <div className="payments-page">
      <div className="payments-container">
        <h2 className="payments-title">Tuition Payment</h2>

        <form className="payment-form">
          {/* Payer's Information Section */}
          <div className="form-section">
            <h3 className="section-title">Payer's Information</h3>
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <span className="input-icon">&#128100;</span>
                <input type="text" value="John Doe" readOnly />
              </div>
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <div className="input-wrapper">
                <span className="input-icon">&#128222;</span>
                <input type="text" value="(555) 123-4567" readOnly />
              </div>
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">&#9993;</span>
                <input type="text" value="johndoe@email.com" readOnly />
              </div>
            </div>
          </div>

          {/* Tuition Information Section */}
          <div className="form-section">
            <h3 className="section-title">Tuition Information</h3>
            <div className="input-group">
              <label>Student ID</label>
              <div className="input-wrapper">
                <span className="input-icon">&#127919;</span>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter Student ID"
                />
              </div>
            </div>
            <div className="input-group">
              <label>Student Name</label>
              <div className="input-wrapper">
                <span className="input-icon">&#128100;</span>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter Student Name"
                />
              </div>
            </div>
            <div className="input-group">
              <label>Amount Due</label>
              <div className="input-wrapper">
                <span className="input-icon">&#128176;</span>
                <input type="text" value="0.00 VNĐ" readOnly />
              </div>
            </div>
          </div>

          {/* Payment Details Section */}
          <div className="form-section">
            <h3 className="section-title">Payment Details</h3>
            <div className="details-row">
              <div className="detail-item">
                <span>Available Balance</span>
                <strong>10,000,000 VNĐ</strong>
              </div>
              <div className="detail-item">
                <span>Tuition Amount to Pay</span>
                <strong>0.00 VNĐ</strong>
              </div>
            </div>
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <label htmlFor="terms">
                I agree to the <strong>terms and conditions</strong>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="confirm-button"
            disabled={!isFormValid}
          >
            Confirm Transaction
          </button>
        </form>
      </div>
    </div>
  );
}
