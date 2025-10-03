import { useState, useRef } from "react";
import debounce from "lodash.debounce";
import { getStudentInfo } from "../services/studentService";

export function useStudentInfo(token) {
  const [studentInfo, setStudentInfo] = useState(null);

  const fetchStudentInfo = async (id) => {
    if (!id) {
      setStudentInfo(null);
      return;
    }
    try {
      const data = await getStudentInfo(id, token);
      setStudentInfo(data);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setStudentInfo({ error: "Không tìm thấy hoặc lỗi kết nối" });
    }
  };

  const debouncedFetchRef = useRef(debounce(fetchStudentInfo, 500));

  return { studentInfo, fetchStudentInfo, debouncedFetchRef };
}
