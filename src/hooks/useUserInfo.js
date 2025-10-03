import { useState, useEffect } from "react";
import { getUserInfo } from "../services/userService";

export function useUserInfo(token, removeCookie) {
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    balance: "",
  });

  useEffect(() => {
    if (!token) return;
    const fetchUser = async () => {
      try {
        const data = await getUserInfo(token);
        setUser({
          name: data.name,
          phoneNumber: data.phoneNumber,
          email: data.email,
          balance: data.balance,
        });
      } catch (err) {
        console.error("Fetch user failed", err);
        removeCookie("token", { path: "/" });
      }
    };
    fetchUser();
  }, [token, removeCookie]);

  return user;
}
