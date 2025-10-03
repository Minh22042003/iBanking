import { useState, useEffect } from "react";
import "../styles/Payments.css";
import { useCookies } from "react-cookie";
import { formatCurrency } from "../utils/format";
import { useStudentInfo } from "../hooks/useStudentInfo";
import { useUserInfo } from "../hooks/useUserInfo";

export default function Payments() {
  const [cookie, , removeCookie] = useCookies(["token"]);
  const token = cookie.token;

  const { studentInfo, debouncedFetchRef } = useStudentInfo(token);
  const user = useUserInfo(token, removeCookie);

  const [studentId, setStudentId] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
    debouncedFetchRef.current(e.target.value);
  };

  useEffect(() => {
    setIsFormValid(studentId !== "" && agreeTerms);
  }, [agreeTerms, studentId]);

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!studentInfo || studentInfo.name === "") {
      alert("Student not found. Please check the Student ID.");
      return;
    }
    if (parseFloat(studentInfo.tuition) >= parseFloat(user.balance)) {
      alert("Insufficient balance to complete the transaction.");
      return;
    }
    alert("Transaction successful!");
  };

  return (
    <div className="payments-page">
      <div className="payments-container">
        <h2 className="payments-title">Tuition Payment</h2>

        <form className="payment-form" onSubmit={handleConfirm}>
          {/* Payer's Information Section */}
          <div className="form-section">
            <h3 className="section-title">Payer's Information</h3>
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <span className="input-icon">&#128100;</span>
                <input type="text" value={user.name || "Not found"} readOnly />
              </div>
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <div className="input-wrapper">
                <span className="input-icon">&#128222;</span>
                <input type="text" value={user.phoneNumber || "Not found"} readOnly />
              </div>
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">&#9993;</span>
                <input type="text" value={user.email || "Not found"} readOnly />
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
                  onChange={handleStudentIdChange}
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
                  value={studentInfo != null ? studentInfo.name : ""}
                  placeholder="Student Name"
                  readOnly
                />
              </div>
            </div>
            <div className="input-group">
              <label>Amount Due</label>
              <div className="input-wrapper">
                <span className="input-icon">&#128176;</span>
                <input type="text" value={(studentInfo != null ? formatCurrency(studentInfo.tuition) : 0.00) + " VNĐ"} readOnly />
              </div>
            </div>
          </div>

          {/* Payment Details Section */}
          <div className="form-section">
            <h3 className="section-title">Payment Details</h3>
            <div className="details-row">
              <div className="detail-item">
                <span>Available Balance</span>
                <strong>{formatCurrency(user.balance)} VNĐ</strong>
              </div>
              <div className="detail-item">
                <span>Tuition Amount to Pay</span>
                <strong>{studentInfo != null ? formatCurrency(studentInfo.tuition):"0.00"} VNĐ</strong>
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
