import { useState, useEffect } from 'react';
import { Bookmark } from '@/components';
import { Calendar } from 'react-calendar';
import S from './Calender.module.scss';
import pb from '@/api/pocketbase';
import { FaBookmark } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import 'react-calendar/dist/Calendar.css';

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
        <Calendar
          className={S.custom__calender}
          onChange={onChange}
          value={date}
          tileContent={renderTileContent}
          tileClassName={S.calender__tile}
          onClickDay={handleDayClick}
        />

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
