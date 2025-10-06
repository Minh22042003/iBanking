import { http, HttpResponse } from "msw";

export const handlers = [

  http.post("/api/auth/login", async ({ request }) => {
    const { email, password } = await request.json();

    if (email === "admin" && password === "123456") {
      return HttpResponse.json(
        {
          token: "fake-jwt-token",
          user: { id: 1, fullName: "Admin User", phone: "07662543782", email: "admin@gmail.com", balance: 6500000 },
        },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { message: "Sai email hoặc password" },
      { status: 401 }
    );
  }),

  http.get("/api/v2/student/:id", ({ request, params }) => {
    const auth = request.headers.get("Authorization");
    const { id } = params;
    if (auth === "Bearer fake-jwt-token") {
      if (id === "S005") {
        return HttpResponse.json(
          {
            id: 0,
            studentId: "S005",
            studentName: "Hoàng Văn E",
            amount: 2500000,
            paid: false
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

  http.post("/api/payment/start", async ({ request }) => {
    const auth = request.headers.get("Authorization");
    const { userId, studentId } = await request.json();

    if (auth === "Bearer fake-jwt-token") {
      if (userId == 1 && studentId == "S005") {
        return HttpResponse.json(
          {
            message: "OTP sent to email",
          },
          { status: 200 }
        );
      } else {
        return HttpResponse.json({ message: "Sai thong tin" }, { status: 404 });
      }
    }else{
      return HttpResponse.json({ message: "Không xác thực" }, { status: 401 });
    }
  }),

  http.post("/api/payment/confirm", async ({ request }) => {
    const auth = request.headers.get("Authorization");
    const { userId, studentId, otp } = await request.json();

    if (auth === "Bearer fake-jwt-token") {
      if (userId == 1 && studentId == "S005" && otp==413241) {
        return HttpResponse.json(
          {
            message: "Payment Success",
          },
          { status: 200 }
        );
      } else {
        return HttpResponse.json({ message: "Sai thong tin" }, { status: 404 });
      }
    }else{
      return HttpResponse.json({ message: "Không xác thực" }, { status: 401 });
    }
  })


];
