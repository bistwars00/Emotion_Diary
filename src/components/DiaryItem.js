import React from "react";
import "../App.css";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate(); //페이지 이동시킬 변수
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const strDate = new Date(parseInt(date)).toLocaleDateString(); //date를 yyyy-mm-dd형식으로 바꿔줌

  const goDetail = () => {
    navigate(`/diary/${id}`); // 각 일기의 번호에 따라서, 상세 페이지로 이동시킴
  };

  const goEdit = () => {
    navigate(`/edit/${id}`); // 각 일기의 번호에 따라서, 수정 페이지로 이동시킴
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")} // 쉼표 없애려고 join 씀, 동적으로 클래스 네임 만들어줌
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
