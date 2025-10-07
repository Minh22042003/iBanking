import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/OTP.css";
import { formatCurrency } from "../utils/format";
import { useCookies } from "react-cookie";

export default function OTP() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie, removeCookie] = useCookies(["token", "user"]);
  const token = cookie.token;
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);

  const {
    userId,
    studentId,
    studentInfo,
    payerInfo,
    // eslint-disable-next-line no-unused-vars
    accountBalance
  } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/payment/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, studentId, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setModalMessage("Thanh toán thành công!");
        setShowModal(true);
        setCookie("user", JSON.stringify(data.user), {path: "/", maxAge:3600})
        setBalance(data.user.balance);
        // Sau 3 giây tự động về trang chính
        setTimeout(() => {
          navigate("/payments");
        }, 3000);
      } else {
        setModalMessage(data.message || "Mã OTP không hợp lệ. Vui lòng thử lại.");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setModalMessage("Lỗi kết nối. Vui lòng thử lại.");
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="otp-page">
      <div className="otp-container">
        <h2 className="otp-title">OTP Verification</h2>
        <p>Vui lòng nhập mã OTP được gửi đến số điện thoại của bạn để xác nhận thanh toán.</p>

        <form className="otp-form" onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Nhập mã OTP"
            className="otp-input"
          />
          <button
            type="submit"
            disabled={isLoading || otp.length < 6}
            className="otp-button"
          >
            {isLoading ? "Đang xác minh..." : "Xác nhận thanh toán"}
          </button>
        </form>
      </div>

      {/* 🟢 Modal kết quả OTP */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className={`modal-box ${isSuccess ? "success" : "error"}`} onClick={(e) => e.stopPropagation()}>
            <h3>{isSuccess ? "✅ Thanh toán thành công" : "⚠️ Thông báo"}</h3>
            <p>{modalMessage}</p>

            {isSuccess && (
              <div className="payment-summary">
                <p><strong>Sinh viên:</strong> {studentInfo?.name}</p>
                <p><strong>Người thanh toán:</strong> {payerInfo?.name}</p>
                <p><strong>Email:</strong> {payerInfo?.email}</p>
                <p><strong>Số tiền:</strong> {formatCurrency(balance)} VNĐ</p>
              </div>
            )}

            {!isSuccess && (
              <button onClick={() => setShowModal(false)}>Đóng</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
