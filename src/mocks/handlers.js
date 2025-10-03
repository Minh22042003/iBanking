import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const { username, password } = await request.json();

    if (username === "admin" && password === "123456") {
      return HttpResponse.json(
        {
          token: "fake-jwt-token",
          user: { id: 1, name: "Admin User", phoneNuber: "07662543782", email:"admin@gmail.com" },
        },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { message: "Sai username hoặc password" },
      { status: 401 }
    );
  }),

  http.get("/api/user", ({ request }) => {
    const auth = request.headers.get("Authorization");
    if (auth === "Bearer fake-jwt-token") {
      return HttpResponse.json(
        {
          UserID: 1,
          Username: "admin",
          FullName: "Duong Hai Minh",
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

  http.get("/api/student/:id", ({ request, params}) => {
    const auth = request.headers.get("Authorization");
    const { id } = params;
    if (auth === "Bearer fake-jwt-token") {
      if (id === "52100263") {
        return HttpResponse.json(
          {
            StudentID: 1,
            FullName: "Dương Hải Minh",
          },
          { status: 200 }
        );
      }else{
        return HttpResponse.json({ message: "Không tìm thấy sinh viên" }, { status: 500 });
      }
    } else {
      return HttpResponse.json({ message: "Không xác thực" }, { status: 401 });
    }
  }),

  http.get("/api/account/:id", ({ request, params}) => {
    const auth = request.headers.get("Authorization");
    const { id } = params;
    if (auth === "Bearer fake-jwt-token") {
      if (id === "1") {
        return HttpResponse.json(
          {
            AccountID: 1,
            Balance: 10000000,
            Currency: "VND",
            LastUpdated: "2025-10-03T12:34:56.789Z"
          },
          { status: 200 }
        );
      }else{
        return HttpResponse.json({ message: "Không tìm thấy thông tin tài khoản" }, { status: 500 });
      }
    } else {
      return HttpResponse.json({ message: "Không xác thực" }, { status: 401 });
    }
  }),

  http.get("/api/tuitionDebt/:StudentID", ({ request, params}) => {
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
            Status: "Open"
          },
          { status: 200 }
        );
      }else{
        return HttpResponse.json({ message: "Không tìm thấy thông tin học phí" }, { status: 500 });
      }
    } else {
      return HttpResponse.json({ message: "Không xác thực" }, { status: 401 });
    }
  }),
];
