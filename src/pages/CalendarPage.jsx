import pb from '@/api/pocketbase';
import { Bookmark, CommonModal } from '@/components';
import { useUserStore } from '@/stores';
import S from '@/styles/pages/Calendar.module.scss';
import { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaBookmark } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styled from 'styled-components';

// 캘린더 스타일 커스터마이징
const StyledCalendar = styled(Calendar)`
  border: none;
  .react-calendar {
    width: 450px;
    max-width: 100%;
    background: #ffffff;
    font-family: 'Arial', sans-serif;
    line-height: 1.5em;
  }
  .react-calendar__navigation__label {
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 600;
    line-height: normal;
  }
  .react-calendar__month-view__days__day-names,
  .react-calendar__month-view__days__day {
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 300;
    height: 39px;
  }
  .react-calendar__tile {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 5px;
    position: relative;
  }

  .react-calendar__tile--active {
    background-color: #ffc107 !important;
    color: white;
  }

  .react-calendar__tile:hover {
    background-color: #ffc107;
  }

  .react-calendar__tile--active:hover {
    background-color: #ffc107;
    color: white;
  }
`;

// 날짜 포맷 변환 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date)) {
    return '날짜 없음'; // 날짜가 올바르지 않으면 '날짜 없음' 표시
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 두 자릿수로 맞춤
  const day = date.getDate().toString().padStart(2, '0'); // 두 자릿수로 맞춤

  return `${year}.${month}.${day}`;
};

// 날짜 비교 함수
const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const CalendarPage = () => {
  const { isLoggedIn, initUser, user } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [date, setDate] = useState(new Date());
  const [visible, setVisible] = useState(false);

  const [activeStartDate, setActiveStartDate] = useState(new Date());

  const [bookmarkList, setBookmarkList] = useState([]);
  const [currentBookmarkIndex, setCurrentBookmarkIndex] = useState(0);

  const [bookmarkMap, setBookmarkMap] = useState({});

  const [calendarCollapsed, setCalendarCollapsed] = useState(false);

  useEffect(() => {
    initUser();
  }, [initUser]);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [isLoggedIn]);

  // PocketBase에서 북마크 데이터를 불러오는 함수
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        if (!user || !user.id) {
          console.warn('User is not authenticated.');
          return;
        }

        const userid = user.id;
        const bookmarks = await pb.collection('bookmarkItem').getFullList({
          filter: `user = "${userid}"`,
          sort: 'saveTime',
        });

        localStorage.setItem('bookMarks', JSON.stringify(bookmarks));

        // 날짜별 북마크 객체 생성
        const bookmarkObj = {};
        bookmarks.forEach((b) => {
          const bookmarkDate = new Date(b.saveTime);
          bookmarkObj[bookmarkDate.toDateString()] = b; // 날짜를 키로 저장
        });

        setBookmarkList(bookmarks); // 배열로 북마크 저장
        setBookmarkMap(bookmarkObj); // 객체로 날짜별 북마크 저장
      } catch (error) {
        console.error('Failed to fetch bookmarks:', error);
      }
    };

    if (isLoggedIn) {
      fetchBookmarks();
    } else {
      setBookmarkList([]); // Clear bookmark list if not logged in
      setBookmarkMap({});
    }
  }, [isLoggedIn, user]);

  // 이전/다음 북마크로 이동하는 함수
  const goToBookmark = (direction) => {
    let newIndex = currentBookmarkIndex;
    if (direction === 'prev' && currentBookmarkIndex > 0) {
      newIndex = currentBookmarkIndex - 1;
    } else if (direction === 'next' && currentBookmarkIndex < bookmarkList.length - 1) {
      newIndex = currentBookmarkIndex + 1;
    }

    setCurrentBookmarkIndex(newIndex);

    const newBookmarkDate = new Date(bookmarkList[newIndex].saveTime);

    setDate(newBookmarkDate); // 캘린더의 날짜도 업데이트

    // 현재 달력에 표시된 월이 새로운 북마크 날짜의 월과 다른 경우 activeStartDate 업데이트
    if (activeStartDate.getMonth() !== newBookmarkDate.getMonth()) {
      setActiveStartDate(newBookmarkDate); // 새로운 월로 변경
    }

    handleDayClick(newBookmarkDate);
  };

  // 날짜 클릭 시 북마크 확인 및 업데이트
  const handleDayClick = (value) => {
    const clickedDate = value.toDateString();
    const bookmark = bookmarkMap[clickedDate]; // 해당 날짜의 북마크 가져오기

    if (bookmark) {
      console.log(`북마크가 선택되었습니다: ${bookmark.saveTime}`);
      setVisible(true);
      const index = bookmarkList.findIndex((b) => b.id === bookmark.id);
      setCurrentBookmarkIndex(index); // 해당 북마크의 인덱스를 설정
    } else {
      console.log('해당 날짜에 북마크가 없습니다.');
      setVisible(false);
    }
  };

  // 타일에 북마크 아이콘 표시
  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const hasBookmark = bookmarkList.some((b) => {
        const bookmarkDate = new Date(b.saveTime);
        return isSameDay(bookmarkDate, date);
      });

      if (hasBookmark) {
        return (
          <FaBookmark
            style={{
              marginLeft: '8px',
              marginTop: '15px',
              color: 'orange',
            }}
          />
        );
      }
    }
    return null;
  };

  // 날짜 변경 시 상태 업데이트
  const onChange = (newDate) => {
    setDate(newDate);
  };

  // 달력 상태 토글
  const toggleCalendar = () => {
    setCalendarCollapsed((prev) => !prev);
  };

  return (
    <div className="wrapComponent">
      {!isLoggedIn && (
        <CommonModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={['로그인 후', '이용해보세요!']}
          firstActionText="로그인"
          firstActionLink="/login"
          secondActionText="회원가입"
          secondActionLink="/register"
        />
      )}
      <div className={S.titleWrapper}>
        <p className={S.title}>원하시는 날짜를 선택하세요</p>
        <button className={S.btn} onClick={toggleCalendar}>
          {calendarCollapsed ? '달력 열기' : '달력 접기'}
        </button>
      </div>

      <div className={`${S.calendarWrapper} ${calendarCollapsed ? S.collapsed : ''}`}>
        <StyledCalendar
          onChange={onChange}
          value={date}
          activeStartDate={activeStartDate}
          next2Label={null}
          prev2Label={null}
          showNeighboringMonth={false}
          formatDay={(_, date) => date.toLocaleString('en', { day: 'numeric' })}
          tileContent={renderTileContent}
          onClickDay={handleDayClick}
        />
      </div>

      {visible && (
        <div className={S.statusBar}>
          <button type="button" className={S.arrow} onClick={() => goToBookmark('prev')}>
            <IoIosArrowBack />
          </button>
          <p>{formatDate(bookmarkList[currentBookmarkIndex]?.saveTime)}</p>
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
  );
};

export default CalendarPage;
