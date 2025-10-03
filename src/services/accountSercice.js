export async function getAccountInfo(token, UserID) {
  const res = await fetch(`/api/account/${UserID}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Account not found");
  return res.json();
}