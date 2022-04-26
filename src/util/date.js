export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
  //날짜를 인덱스 길이만큼 yyyy-mm-dd 형식으로 변경해줌
};
