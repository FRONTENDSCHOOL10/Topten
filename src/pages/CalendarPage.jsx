import { useState, useEffect } from 'react';
import { Bookmark } from '@/components';
import { Calendar } from 'react-calendar';
import S from './Calender.module.scss';
import pb from '@/api/pocketbase';
import { FaBookmark } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import 'react-calendar/dist/Calendar.css';
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

const CalendarPage = (props) => {
  const [date, setDate] = useState(new Date());
  const [currentBookmarkIndex, setCurrentBookmarkIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [bookmarkList, setBookmarkList] = useState([]);

  // PocketBase에서 북마크 데이터를 불러오는 함수
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const userid = JSON.parse(localStorage.getItem('pb_auth')).token.id;
        const bookmarks = await pb.collection('bookmarkItem').getFullList({
          filter: `user = "${userid}"`,
        });

        setBookmarkList(bookmarks);
        console.log('bookmarks:', bookmarks);
      } catch (error) {
        console.error('Failed to fetch bookmarks:', error);
      }
    };

    fetchBookmarks();
  }, []);

  // 이전/다음 북마크로 이동하는 함수
  const goToBookmark = (direction) => {
    let newIndex = currentBookmarkIndex;
    if (direction === 'prev' && currentBookmarkIndex > 0) {
      newIndex = currentBookmarkIndex - 1;
    } else if (direction === 'next' && currentBookmarkIndex < bookmarkList.length - 1) {
      newIndex = currentBookmarkIndex + 1;
    }

    setCurrentBookmarkIndex(newIndex);
    const newBookmarkDate = new Date(bookmarkList[newIndex].date);
    console.log('newbookmarkdate:', newBookmarkDate);
    setDate(newBookmarkDate);
  };

  // 날짜 클릭 시 북마크 확인 및 업데이트
  const handleDayClick = (value) => {
    const clickedDate = value.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const bookmark = bookmarkList.find((b) => {
      const bookmarkDate = new Date(b.created).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      return bookmarkDate === clickedDate;
    });

    if (bookmark) {
      console.log(`북마크가 선택되었습니다: ${bookmark.created}`);
      setVisible(true);
      setCurrentBookmarkIndex(bookmarkList.indexOf(bookmark)); // indexOf로 인덱스 설정
    } else {
      console.log('해당 날짜에 북마크가 없습니다.');
    }
  };

  // 타일에 북마크 아이콘 표시
  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const hasBookmark = bookmarkList.some(
        (b) =>
          new Date(b.created).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }) === dateString
      );

      if (hasBookmark) {
        return <FaBookmark style={{ color: 'orange' }} />;
      }
    }
    return null;
  };

  // 날짜 변경 시 상태 업데이트
  const onChange = (newDate) => {
    setDate(newDate);
  };

  console.log('bookmark:', bookmarkList[currentBookmarkIndex]);

  return (
    <>
      <div className="wrapComponent">
        <div className={S.title}>
          <p>원하시는 날짜를 선택하세요</p>
          <button>달력 접기</button>
        </div>

        <div className={S.calendar}>
          <StyledCalendar
            className={S.custom__calender}
            onChange={onChange}
            value={date}
            next2Label={null}
            prev2Label={null}
            showNeighboringMonth={false}
            formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
            tileContent={renderTileContent}
            tileClassName={S.calender__tile}
            onClickDay={handleDayClick}
          />
        </div>
        
        {visible && (
          <div className={S.statusBar}>
            <button type="button" className={S.arrow} onClick={() => goToBookmark('prev')}>
              <IoIosArrowBack />
            </button>
            <p>
              {/* 현재 북마크 날짜가 undefined가 아닌지 확인 */}
              {bookmarkList[currentBookmarkIndex]?.date.slice(0, 12)
                ? `${bookmarkList[currentBookmarkIndex].date.slice(0, 12)}`
                : '북마크가 없습니다.'}
            </p>
            <button type="button" className={S.arrow} onClick={() => goToBookmark('next')}>
              <IoIosArrowForward />
            </button>
          </div>
        )}

        <div className={S.BookmarkWrapper}>
          {visible && (
            <Bookmark
              bookmark={bookmarkList[currentBookmarkIndex]}
              bookmarkList={bookmarkList}
              setBookmarkList={setBookmarkList}
              currentBookmarkIndex={currentBookmarkIndex}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
