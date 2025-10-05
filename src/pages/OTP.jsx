import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/OTP.css";
import { formatCurrency } from "../utils/format";

export default function OTP() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const {
    amount,
    studentInfo,
    payerInfo,
    transactionId
  } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, transactionId }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setModalMessage("Thanh toán thành công!");
        setShowModal(true);

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
                <p><strong>Số tiền:</strong> {formatCurrency(amount)} VNĐ</p>
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
