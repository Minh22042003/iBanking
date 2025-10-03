import { useEffect, useState } from "react";
import { getTuitionDebtInfo } from "../services/tuitionDebtService";

export function useTuitionDebt(token, studentId) {
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token || !studentId) {
      setTuition(null);
      return;
    }

    const fetchTuitionDebt = async () => {
      setLoading(true);
      setError(null);
      setTuition(null); // reset dữ liệu cũ để tránh hiển thị sai
      try {
        const data = await getTuitionDebtInfo(token, studentId);
        setTuition(data);
      } catch (err) {
        console.error("Fetch tuition debt failed", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTuitionDebt();
  }, [token, studentId]);

  return { tuition, loading, error };
}
