import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const [originData, setOriginData] = useState(); //targetData를 저장할 state, 수정할 target
  const navigate = useNavigate();
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);
  // 다이어리 스테이트 컨텍스트가 제공하는, 다이어리 리스트의 원본 데이터를 불러옴

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 = ${id}번 수정`; //페이지 타이틀 제목 각각 바꿔주기
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) == parseInt(id)
      );
      console.log(targetDiary);

      if (targetDiary) {
        setOriginData(targetDiary); // targetDiary가 있을때, origin데이터로 초기화해줌
      } else {
        navigate("/", { replace: true }); // 검색 주소가, 지정 범위 외이면, 뒤로가기 못하게하고, 홈으로 보낸다
      }
    }
  }, [id, diaryList]); // 수정하려는 일기가 마운트 될때만(id나 리스트가 변할때만) 동작하게 하기위해서, 사용함
  // 위의 useParams를 이용해서, 기존데이터의 id와 일치하는걸 찾아서, 수정할 데이터를 특정해서 불러옴

  //DiaryEditor로 isEdit과 originData를 보내줘서, 새로 만들기 페이지가 아닌, 수정페이지가 뜨게 만듬
  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
  // origin데이터가 있는게 확인되면, 다이어리 에디터(수정) 페이지를 출력하게함
};

export default Edit;
