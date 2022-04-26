import React, { useEffect, useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  // 결국은 newState가 변할때, 위의 case 문이 실행되는거니까,
  // 마지막에 return되기 전에, 해당 배열을 문자화 시켜서 로컬스토리지에 저장함
  return newState;
};

export const DiaryStateContext = React.createContext(); //전역에 데이터를 전달하기 위해서 만듬
export const DiaryDispatchContext = React.createContext(); //전역에 생성,수정,제거와 같은 반응형을 전달하기 위해서 만듬

function App() {
  useEffect(() => {
    localStorage.setItem("key1", 10);
    localStorage.setItem("key2", "20");
    localStorage.setItem("key3", JSON.stringify({ value: 30 }));

    const item1 = parseInt(localStorage.getItem("key1"));
    const item2 = localStorage.getItem("key2");
    const item3 = JSON.parse(localStorage.getItem("key3"));

    console.log(item1, item2, item3);
  }, []);

  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || ""; //이미지 불러오기 오류날때 기입함

  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );

      if (diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1;

        dispatch({ type: "INIT", data: diaryList }); //로컬리스트에 저장된 데이터를 INIT함수를 통해서, 초기화(메인)시 불러오게함
      }
    }
  }, []);

  const [data, dispatch] = useReducer(reducer, []); //모든것의 시초가 되는, data 전달체

  const dataId = useRef(0);
  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
