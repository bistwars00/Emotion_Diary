import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";
import "../App.css";

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 = 새 일기`; //페이지 타이틀 제목 각각 바꿔주기
  }, []);

  return (
    <div>
      <DiaryEditor />
    </div>
  );
};

export default New;
