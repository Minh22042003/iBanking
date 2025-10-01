import { useState, useEffect } from "react";
import "../styles/Payments.css";
import { useCookies } from "react-cookie";
import { formatCurrency } from "../utils/format";

export default function Payments() {
  const [cookie, , removeCookie] = useCookies(["token"])
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [username, setUsername] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [balance, setBalance] = useState("")
  const [studentTuition, setStudentTuition] = useState("")

  useEffect(() => {
    setIsFormValid(studentId !== "" && studentName !== "" && agreeTerms);
  }, [agreeTerms, studentId, studentName])

  useEffect(() => {
    const token = cookie.token
    if(!token) return;
    if(studentId != ""){
      const fetchStudent = async () => {
        try {
          const res = await fetch(`/api/student/${studentId}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
          })
          if (!res.ok) {
            setStudentName("")
            setStudentTuition("0.00")
            throw new Error("Failed to fetch student");
          }
          const data = await res.json();
          setStudentName(data.name)
          setStudentTuition(data.tuition)
        } catch (error) {
          console.error("Fetch student failed", error);
        }
      }
      fetchStudent();
    }
  }, [studentId])

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
        setPhoneNumber(data.phoneNumber)
        setEmail(data.email)
        setBalance(data.balance)
      } catch (err) {
        console.error("Fetch user failed", err);
        // có thể xóa cookie token nếu hết hạn / không hợp lệ
        removeCookie("token", { path: "/" });
      }
    }
    fetchUser();
  }, [cookie.token, removeCookie]);

  const handleConfirm = (e) => {
    e.preventDefault();
    if (studentName === "") {
      alert("Student not found. Please check the Student ID.");
      return;
    }
    if (parseFloat(studentTuition) >= parseFloat(balance)) {
      alert("Insufficient balance to complete the transaction.");
      return;
    }
    // Handle successful transaction
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
                <input type="text" value={username || "Not found"} readOnly />
              </div>
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <div className="input-wrapper">
                <span className="input-icon">&#128222;</span>
                <input type="text" value={phoneNumber || "Not found"} readOnly />
              </div>
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">&#9993;</span>
                <input type="text" value={email || "Not found"} readOnly />
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
                  placeholder="Student Name"
                  readOnly
                />
              </div>
            </div>
            <div className="input-group">
              <label>Amount Due</label>
              <div className="input-wrapper">
                <span className="input-icon">&#128176;</span>
                <input type="text" value={formatCurrency(studentTuition) + " VNĐ"} readOnly />
              </div>
            </div>
          </div>

          {/* Payment Details Section */}
          <div className="form-section">
            <h3 className="section-title">Payment Details</h3>
            <div className="details-row">
              <div className="detail-item">
                <span>Available Balance</span>
                <strong>{formatCurrency(balance)} VNĐ</strong>
              </div>
              <div className="detail-item">
                <span>Tuition Amount to Pay</span>
                <strong>{studentTuition != "" ? formatCurrency(studentTuition):"0.00"} VNĐ</strong>
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
