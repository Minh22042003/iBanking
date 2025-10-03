import { useState, useRef } from "react";
import debounce from "lodash.debounce";
import { getStudentInfo } from "../services/studentService";

export function useStudentInfo(token) {
  const [studentInfo, setStudentInfo] = useState(null);
  const [studentInfoLoading, setStudentInfoLoading] = useState(false)

  const fetchStudentInfo = async (id) => {
    if (!id) {
      setStudentInfo(null);
      return;
    }
    setStudentInfoLoading(true);
    setStudentInfo(null);
    try {
      const data = await getStudentInfo(id, token);
      setStudentInfo(data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setStudentInfo({ error: "Không tìm thấy hoặc lỗi kết nối" });
    } finally {
      setStudentInfoLoading(false)
    }
  };

  const debouncedFetchRef = useRef(debounce(fetchStudentInfo, 500));

  return { studentInfo, studentInfoLoading, fetchStudentInfo, debouncedFetchRef };
}
