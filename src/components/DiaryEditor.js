import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import "../App.css";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "./../App.js";
import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion";
import { Edit } from "../pages/Edit";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3); // 클릭시 이미지 상태 변환의 기준점이 되는 state
  const [date, setDate] = useState(getStringDate(new Date()));
  // 당일 날짜를 기본으로 해줌

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext); //submit 버튼 눌렀을 때
  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        //isEdit이 수정중이지 않을때는, submit 누르면 onCreate로 새로 만들기 출력
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
        //isEdit이 수정중일 때는, submit 누르면 onEdit으로 수정하기 출력
      }
    }
    navigate("/", { replace: true }); // 다시 이전 페이지로 못돌아가게함
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    //isEdit과 originData를 넘겨 받았을때(수정요청시), 타겟팅된 origin일자와 해당 데이터를 불러옴
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion); // 타겟팅된 오리진 감정상태 불러옴
      setContent(originData.content); // 타겟팅된 오리진 내용 불러옴
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
        rightChild={
          isEdit && ( //isEdit이 true일때만(수정상황)실행되게함
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion} //해당 그림이 선택 되었는지 여부를 인식하게함
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
