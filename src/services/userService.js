export async function getUserInfo(token) {
  const res = await fetch("/api/user", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });
  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
}
