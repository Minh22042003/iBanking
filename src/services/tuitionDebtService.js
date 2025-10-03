export async function getTuitionDebtInfo(token, StudentID) {
  const res = await fetch(`/api/tuitionDebt/${StudentID}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Student not found");
  return res.json();
}