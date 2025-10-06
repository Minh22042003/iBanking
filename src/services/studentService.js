export async function getStudentInfo(studentId, token) {
  const res = await fetch(`/api/v2/student/${studentId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Student not found");
  return res.json();
}
