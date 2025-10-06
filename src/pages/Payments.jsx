import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Payments.css";
import { useCookies } from "react-cookie";
import { formatCurrency } from "../utils/format";
import { useStudentInfo } from "../hooks/useStudentInfo";

export default function Payments() {
  // eslint-disable-next-line no-unused-vars
  const [cookie, , removeCookie] = useCookies(["token", "user"]);
  const token = cookie.token;
  let user = cookie.user;
  if (typeof user === "string") {
    try {
      user = JSON.parse(user);
    } catch {
      user = null;
    }
  }
  const navigate = useNavigate();

  const { studentInfo, studentInfoLoading, debouncedFetchRef } = useStudentInfo(token);

  const [studentId, setStudentId] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // 🟡 Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
    debouncedFetchRef.current(e.target.value);
  };

  useEffect(() => {
    setIsFormValid(studentId !== "" && agreeTerms);
  }, [agreeTerms, studentId, studentInfo]);

  const handleConfirm = async (e) => {
    e.preventDefault();

    if (!studentInfo || studentInfo.studentName === "") {
      setModalMessage("Không tìm thấy sinh viên. Vui lòng kiểm tra lại Mã sinh viên.");
      setShowModal(true);
      return;
    }

    const tuitionAmount = parseFloat(studentInfo.amount || 0);
    const accountBalance = parseFloat(user?.balance || 0);

    if (tuitionAmount <= 0) {
      setModalMessage("Dữ liệu học phí không hợp lệ. Vui lòng thử lại.");
      setShowModal(true);
      return;
    }

    if (accountBalance < tuitionAmount) {
      setModalMessage(
        `Số dư tài khoản hiện tại của bạn là ${formatCurrency(accountBalance)} VNĐ, không đủ để thanh toán học phí ${formatCurrency(tuitionAmount)} VNĐ.`
      );
      setShowModal(true);
      return;
    }

    try {
      const response = await fetch("/api/payment/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          studentId: studentInfo.studentId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/otp", {
          state: {
            userId: user.id,
            studentId: studentInfo.studentId,
            studentInfo: {
              id: studentInfo.studentID,
              name: studentInfo.studentName,
            },
            payerInfo: {
              name: user?.fullName,
              phone: user?.phone,
              email: user?.email,
            },
            accountBalance
          },
        });
      } else {
        setModalMessage(data.message || "Thanh toán thất bại. Vui lòng thử lại.");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setModalMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
      setShowModal(true);
    }
  };

  return (
    <div className="payments-page">
      <div className="payments-container">
        <h2 className="payments-title">Tuition Payment</h2>

        <form className="payment-form" onSubmit={handleConfirm}>
          {/* Thông tin người thanh toán */}
          <div className="form-section">
            <h3 className="section-title">Payer's Information</h3>
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <span className="input-icon">&#128100;</span>
                <input type="text" value={user?.fullName || "Not found"} readOnly />
              </div>
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <div className="input-wrapper">
                <span className="input-icon">&#128222;</span>
                <input type="text" value={user?.phone || "Not found"} readOnly />
              </div>
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">&#9993;</span>
                <input type="text" value={user?.email || "Not found"} readOnly />
              </div>
            </div>
          </div>

          {/* Thông tin học phí */}
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
                  value={studentInfoLoading ? "Đang tải" : studentInfo?.studentName || ""}
                  placeholder="Student Name"
                  readOnly
                />
              </div>
            </div>
            <div className="input-group">
              <label>Amount Due</label>
              <div className="input-wrapper">
                <span className="input-icon">&#128176;</span>
                <input
                  type="text"
                  value={
                    formatCurrency(studentInfo?.amount || 0) + " VNĐ"
                  }
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Chi tiết thanh toán */}
          <div className="form-section">
            <h3 className="section-title">Payment Details</h3>
            <div className="details-row">
              <div className="detail-item">
                <span>Available Balance</span>
                <strong>{formatCurrency(user?.balance)} VNĐ</strong>
              </div>
              <div className="detail-item">
                <span>Tuition Amount to Pay</span>
                <strong>
                  {formatCurrency(studentInfo?.amount || 0) + " VNĐ"}
                </strong>
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

          <button type="submit" className="confirm-button" disabled={!isFormValid}>
            Confirm Transaction
          </button>
        </form>
      </div>

      {/* 🟡 Modal cảnh báo */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>⚠️ Warning</h3>
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
