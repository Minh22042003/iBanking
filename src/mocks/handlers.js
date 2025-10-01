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
          id: 1,
          name: "admin",
          phoneNumber: "07662543782",
          email: "admin@gmail.com",
          avatar: "https://i.pinimg.com/1200x/14/05/2b/14052b697b0b6e715ac67f4d2ca71c7f.jpg",
          balance: 10000000
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
            id: 1,
            name: "Dương Hải Minh",
            tuition: 13005000
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
];
