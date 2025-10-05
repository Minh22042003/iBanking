import { http, HttpResponse } from "msw";

// Giả lập "database" nhỏ trong bộ nhớ
let mockTransactions = [];

export const handlers = [
  // Đăng nhập
  http.post("/api/login", async ({ request }) => {
    const { username, password } = await request.json();

    if (username === "admin" && password === "123456") {
      return HttpResponse.json(
        {
          token: "fake-jwt-token",
          user: { id: 1, name: "Admin User", phoneNumber: "07662543782", email: "admin@gmail.com" },
        },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { message: "Sai username hoặc password" },
      { status: 401 }
    );
  }),

  // Thông tin người dùng
  http.get("/api/user", ({ request }) => {
    const auth = request.headers.get("Authorization");
    if (auth === "Bearer fake-jwt-token") {
      return HttpResponse.json(
        {
          UserID: 1,
          Username: "admin",
          FullName: "Dương Hải Minh",
          Phone: "07662543782",
          Email: "admin@gmail.com",
          avatar: "https://i.pinimg.com/1200x/14/05/2b/14052b697b0b6e715ac67f4d2ca71c7f.jpg",
        },
        { status: 200 }
      );
    } else {
      return HttpResponse.json({ message: "Không xác thực" }, { status: 401 });
    }
  }),

  // Thông tin sinh viên
  http.get("/api/student/:id", ({ request, params }) => {
    const auth = request.headers.get("Authorization");
    const { id } = params;
    if (auth === "Bearer fake-jwt-token") {
      if (id === "52100263") {
        return HttpResponse.json(
          {
            StudentID: "1",
            FullName: "Dương Hải Minh",
          },
          { status: 200 }
        );
      } else {
        return HttpResponse.json({ message: "Không tìm thấy sinh viên" }, { status: 404 });
      }
    } else {
      return HttpResponse.json({ message: "Không xác thực" }, { status: 401 });
    }
  }),

  // Thông tin tài khoản
  http.get("/api/account/:id", ({ request, params }) => {
    const auth = request.headers.get("Authorization");
    const { id } = params;
    if (auth === "Bearer fake-jwt-token") {
      if (id === "1") {
        return HttpResponse.json(
          {
            AccountID: 1,
            Balance: 15000000,
            Currency: "VND",
            LastUpdated: "2025-10-03T12:34:56.789Z",
          },
          { status: 200 }
        );
      } else {
        return HttpResponse.json({ message: "Không tìm thấy thông tin tài khoản" }, { status: 404 });
      }
    } else {
      return HttpResponse.json({ message: "Không xác thực" }, { status: 401 });
    }
  }),

  // Thông tin học phí
  http.get("/api/tuitionDebt/:StudentID", ({ request, params }) => {
    const auth = request.headers.get("Authorization");
    const { StudentID } = params;
    if (auth === "Bearer fake-jwt-token") {
      if (StudentID === "1") {
        return HttpResponse.json(
          {
            DebtID: 1,
            Term: "HKI-2025/2026",
            AmountDue: 13000000,
            AmountPaid: 0,
            Status: "Open",
          },
          { status: 200 }
        );
      } else {
        return HttpResponse.json({ message: "Không tìm thấy thông tin học phí" }, { status: 404 });
      }
    } else {
      return HttpResponse.json({ message: "Không xác thực" }, { status: 401 });
    }
  }),

  // Khởi tạo thanh toán
  http.post("/api/payment", async ({ request }) => {
    const { amount, studentId, payerId } = await request.json();

    if (amount > 0) {
      // Tạo transaction giả lập
      const transactionId = `TXN-${Date.now()}`;
      mockTransactions.push({
        transactionId,
        amount,
        studentId,
        payerId,
        verified: false,
      });

      console.log("Mock transaction created:", mockTransactions);

      return HttpResponse.json(
        {
          message: "Payment initiated successfully",
          transactionId,
        },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { message: "Invalid payment amount" },
      { status: 400 }
    );
  }),

  // Xác thực OTP
  http.post("/api/otp/verify", async ({ request }) => {
    console.log("Mock transactions:", mockTransactions);
    const { otp, transactionId } = await request.json();

    const txn = mockTransactions.find((t) => t.transactionId === transactionId);

    if (!txn) {
      return HttpResponse.json(
        { message: "Không tìm thấy giao dịch" },
        { status: 404 }
      );
    }

    if (otp === "123456") {
      txn.verified = true;
      return HttpResponse.json(
        { message: "Thanh toán thành công", transactionId },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { message: "Mã OTP không hợp lệ" },
      { status: 400 }
    );
  }),
];
