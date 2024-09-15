import { useState } from 'react';
import Calendar from 'react-calendar';
import S from '@/styles/pages/CalendarPage.module.scss';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import CostumeCard from './../components/CostumeCard/CostumeCard';
import { Bookmark } from '@/components';
import { FaRegBookmark } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import getPbImageURL from './../api/getPbImageURL';

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

  /* 날짜 */
  .react-calendar__month-view__days__day-names,
  .react-calendar__month-view__days__day {
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 300;
  }

  /* 강조 표시된 날짜 스타일 */
  .react-calendar__tile.markedDate {
    background: #ffeb3b; /* 강조 표시 색상 */
    color: #000; /* 글자 색상 */
  }

  // /* 북마크 표시 */
  // .savedTimeLabel {
  //   background-color: #ffbc17;
  //   color: white;
  //   font-size: 10px;
  //   border-radius: 4px;
  //   padding: 2px 4px;
  //   position: absolute;
  //   top: -10px;
  // }
`;

function CalendarPage(props) {
  //로컬에 저장한 북마크에서 입력한 데이터
  const bookmarkData = JSON.parse(localStorage.getItem('bookmarkItem'));

  //이거 구조분해 할당해서 사용
  // const { address, skyCondition, comment, rate, saveTime, upperItems, lowerItems } = bookmarkData;
  // ------------------------------------------

  const [value, setValue] = useState(new Date());
  const [selectedBookmark, setSelectedBookmark] = useState(null);

  // 북마크된 날짜
  // const savedTime = localStorage.getItem('lastAccessTime').slice(0, 10);

  // 임시!!!
  // 북마크 날짜 리스트 ('YYYY-MM-DD' 형식)
  const dayList = ['2024-09-06', '2024-09-12', '2024-09-13'];

  // 'YYYY-MM-DD' 형식으로 날짜 변환
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  // 북마크 날짜에 스타일 추가
  const tileClassName = ({ date, view }) => {
    if (view === 'month' && dayList.includes(formatDate(date))) {
      return 'markedDate';
    }
    return null;
  };

  // 북마크 날짜 위에 표시할 컨텐츠 추가
  const tileContent = ({ date, view }) => {
    if (view === 'month' && dayList.includes(formatDate(date))) {
      return (
        <div className="savedTimeLabel">
          <FaRegBookmark />
        </div>
      );
    }
    return null;
  };

  // 북마크 날짜 클릭 시 북마크 컴포넌트 표시
  const handleDateClick = (date) => {
    const formattedDate = formatDate(date);

    if (dayList.includes(formattedDate)) {
      setSelectedBookmark(formattedDate);
    } else {
      setSelectedBookmark(null);
      // 북마크된 날짜가 아니면 리셋
    }

    setValue(date);
  };

  return (
    <>
      <div className="wrapComponent">

      <div className={S.title}>
        <p>원하시는 날짜를 선택하세요</p>
        <button>달력 접기</button>
      </div>

        <div className={S.myCalendar}>
          <StyledCalendar
            value={value}
            onChange={handleDateClick}
            next2Label={null}
            prev2Label={null}
            showNeighboringMonth={false}
            formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
            tileClassName={tileClassName}
            tileContent={tileContent}
          />
        </div>

        {selectedBookmark && (
          <div className={S.bookmarkContainer}>
            <Bookmark date={selectedBookmark} />
          </div>
        )}
      </div>
    </>
  );
}

export default CalendarPage;
