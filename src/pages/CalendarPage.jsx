import { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import { Bookmark, CommonModal } from '@/components';
import pb from '@/api/pocketbase';
import S from '@/styles/pages/Calendar.module.scss';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import { FaBookmark } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import useUserStore from '@/stores/userStore';

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

// 날짜 포맷 변환 함수 (checkDate 사용)
const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-');
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

// 헬퍼 함수: Date 객체를 'YYYY-MM-DD' 형식의 문자열로 변환
const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 헬퍼 함수: 'YYYY-MM-DD' 문자열을 Date 객체로 변환 (로컬 시간)
const parseCheckDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [visible, setVisible] = useState(false);

  const [activeStartDate, setActiveStartDate] = useState(new Date());

  const [bookmarkList, setBookmarkList] = useState([]);
  const [currentBookmarkIndex, setCurrentBookmarkIndex] = useState(0);

  const [bookmarkMap, setBookmarkMap] = useState({});

  const [calendarCollapsed, setCalendarCollapsed] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const { isLoggedIn } = useUserStore();

  // PocketBase에서 북마크 데이터를 불러오는 함수
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const storedBookmarks = localStorage.getItem('bookMarks');
        let bookmarks;

        if (storedBookmarks) {
          // 로컬스토리지에 bookMarks가 존재하는 경우
          bookmarks = JSON.parse(storedBookmarks);
          // console.log('로컬스토리지에서 북마크를 불러왔습니다:', bookmarks);
        } else {
          // 로컬스토리지에 bookMarks가 없는 경우 PocketBase에서 데이터 가져오기
          const authData = localStorage.getItem('pb_auth');
          if (!authData) {
            throw new Error('인증 정보가 로컬스토리지에 없습니다.');
          }

          const userid = JSON.parse(authData).record.id;
          bookmarks = await pb.collection('bookmarkItem').getFullList({
            filter: `user = "${userid}"`,
            sort: 'saveTime',
          });

          // 가져온 데이터를 로컬스토리지에 저장
          localStorage.setItem('bookMarks', JSON.stringify(bookmarks));
          // console.log('PocketBase에서 북마크를 가져와 로컬스토리지에 저장했습니다:', bookmarks);
        }

        // 날짜별 북마크 객체 생성 (checkDate를 키로 사용)
        const bookmarkObj = {};
        bookmarks.forEach((b) => {
          const dateKey = b.checkDate; // 'YYYY-MM-DD' 형식 사용
          if (!bookmarkObj[dateKey]) {
            bookmarkObj[dateKey] = [];
          }
          bookmarkObj[dateKey].push(b); // 동일 날짜에 여러 북마크가 있을 경우 배열로 저장
          // console.log(`Adding bookmark to dateKey: ${dateKey}`);
        });

        // 상태 업데이트
        setBookmarkList(bookmarks); // 배열로 북마크 저장
        setBookmarkMap(bookmarkObj); // 객체로 날짜별 북마크 저장
        // console.log('bookmarkList 상태:', bookmarks);
        // console.log('bookmarkMap 상태:', bookmarkObj);
      } catch (error) {
        console.error('북마크를 불러오는 데 실패했습니다:', error);
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

    // Set date based on checkDate instead of saveTime
    const checkDate = bookmarkList[newIndex].checkDate; // 'YYYY-MM-DD'
    const newBookmarkDate = parseCheckDate(checkDate); // Convert to Date object using parseCheckDate

    setDate(newBookmarkDate); // 캘린더의 날짜도 업데이트

    // 현재 달력에 표시된 월이 새로운 북마크 날짜의 월과 다른 경우 activeStartDate 업데이트
    if (activeStartDate.getMonth() !== newBookmarkDate.getMonth()) {
      setActiveStartDate(newBookmarkDate); // 새로운 월로 변경
    }

    setVisible(true); // 북마크가 선택된 상태로 표시
    // console.log(`현재 북마크 인덱스: ${newIndex}, 날짜: ${newBookmarkDate}`);
  };

  // 날짜 클릭 시 북마크 확인 및 업데이트
  const handleDayClick = (value) => {
    const dateKey = formatDateKey(value); // 'YYYY-MM-DD' 형식으로 변환
    const bookmarksForDate = bookmarkMap[dateKey]; // 해당 날짜의 북마크 가져오기

    if (bookmarksForDate && bookmarksForDate.length > 0) {
      // console.log(`북마크가 선택되었습니다: ${bookmarksForDate[0].saveTime}`);
      setVisible(true);
      setCurrentBookmarkIndex(bookmarkList.findIndex((b) => b.id === bookmarksForDate[0].id));
      // console.log(
      //   `선택된 북마크 인덱스: ${bookmarkList.findIndex((b) => b.id === bookmarksForDate[0].id)}`
      // );
    } else {
      // console.log('해당 날짜에 북마크가 없습니다.');
      setVisible(false);
    }
  };

  // 타일에 북마크 아이콘 표시
  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateKey = formatDateKey(date); // 'YYYY-MM-DD' 형식으로 변환
      const bookmarksForDate = bookmarkMap[dateKey];

      if (bookmarksForDate && bookmarksForDate.length > 0) {
        return bookmarksForDate.map((bookmark, index) => (
          <FaBookmark
            key={bookmark.id}
            style={{
              marginLeft: '8px',
              marginTop: `${index * 15}px`, // 아이콘이 겹치지 않도록 조정
              color: 'orange',
            }}
          />
        ));
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
          <p>{formatDate(bookmarkList[currentBookmarkIndex]?.checkDate)}</p>
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
