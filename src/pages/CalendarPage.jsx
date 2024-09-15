import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import CostumeCard from './../components/CostumeCard/CostumeCard';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import getPbImageURL from './../api/getPbImageURL';

import { Bookmark } from '@/components';
import S from '@/styles/pages/CalendarPage.module.scss';
import styled from 'styled-components';

const StyledCalendar = styled(Calendar)`
  border: none;

  .react-calendar {
    width: 450px;
    max-width: 100%;
    background: #ffffff;
    font-family: 'Arial', sans-serif;
    line-height: 1.5em;
  }

  /* 월 제목 */
  .react-calendar__navigation__label {
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 600;
    line-height: normal;
  }

  /* 날짜의 글자 스타일 */
  .react-calendar__month-view__days__day-names,
  .react-calendar__month-view__days__day {
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 300;
  }

  /* 전 달과 다음 달의 날짜 숨기기 */
  .react-calendar__tile--neighboringMonth {
    display: none;
  }

  /* 강조 표시된 날짜 스타일 */
  .react-calendar__tile.markedDate {
    background: #ffeb3b; /* 강조 표시 색상 */
    color: #000; /* 글자 색상 */
  }
`;


function CalendarPage(props) {
  const [value, onChange] = useState(new Date());

  //로컬에 저장한 북마크에서 입력한 데이터를 bookmarkData애 할당
  const bookmarkData = JSON.parse(localStorage.getItem('bookmarkItem'));
  //이거 구조분해 할당해서 사용
  // const { address, skyCondition, comment, rate, saveTime, upperItems, lowerItems } = bookmarkData;
  //밑에 임시로 사용 느낌? 작성할게요

  return (
    <>
      <div className="wrapComponent">
        <div className={S.myCalendar}>
          <StyledCalendar
            onChange={onChange}
            value={value}
            tileClassName={({ date, view }) => {
              // 북마크 날짜에 'markedDate' 클래스를 추가
              // if (MarkedDate(date)) {
              //   return 'react-calendar__tile--hasMark';
              // }
              // return null;
            }}
          />
        </div>

        <div className={S.bookmarkContainer}>
          <Bookmark />
        </div>
      </div>
    </>
  );
}

export default CalendarPage;
