import { useEffect, useContext, useState } from "react";
import { DiaryStateContext } from "../App";
import MyHeader from "../components/MyHeader.js";
import MyButton from "./../components/MyButton";
import DiaryList from "./../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext); //해당 월의 데이터를 출력

  const [data, setData] = useState([]); //해당 월, 이외의 데이터를 없애기 위해서
  const [curDate, setCurDate] = useState(new Date());
  console.log(curDate);

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장`; //페이지 타이틀 제목 각각 바꿔주기
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      // 리스트에 데이터가 하나 이상일때만 해당로직 렌더링함

      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1 // 해당 월의 1일(시작점)
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0, // 해닫 월의 마지막 일 // 마지막 날의 시분초까지 정해줘야 31일 나옴
        23,
        59,
        59
      ).getTime();

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);

  useEffect(() => {
    console.log(data); // 데이터가 바뀔때마다 콘솔에 출력
  }, [data]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
