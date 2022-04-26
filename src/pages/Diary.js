import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useContext } from "react";
import DiaryList from "../components/DiaryList";
import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion";
import MyHeader from "../components/MyHeader.js";
import MyButton from "../components/MyButton";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext); // 리스트에서 어떤 일기의 상세페이지를 가져올것인지 특정하는 과정
  const navigate = useNavigate(); // 이동 관련 로직 제작용
  const [data, setData] = useState(); // 검색한 일기가 존재할 때

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 = ${id}번 일기`; //페이지 타이틀 제목 각각 바꿔주기
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        // 일기가 존재할 때
        setData(targetDiary);
      } else {
        // 일기가 없을 때
        alert("없는 일기입니다");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    console.log(curEmotionData);

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper", // 해당 감정 점수와 사진을 한묶음으로 묶어줌
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <h4>오늘의 일기</h4>
          <div className="diary_content_wrapper">
            <p>{data.content}</p>
          </div>
        </article>
      </div>
    );
  }
};

export default Diary;
