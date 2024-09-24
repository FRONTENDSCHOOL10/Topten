import { useState, useEffect } from 'react';
import { CostumeCardManager, BookmarkModal, CommonModal } from '@/components';
import S from './Bookmark.module.scss';
import StarRate from '../StarRate/StarRate';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { getWeatherIcon } from '../../utils/weatherIcons';

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

const Bookmark = ({ bookmark, bookmarkList, setBookmarkList, currentBookmarkIndex }) => {
  const [costumeCards, setCostumeCards] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const weatherData = JSON.parse(localStorage.getItem('weatherData'));
  const savedAddress = bookmark?.address || '주소 없음';
  const savedTime = bookmark?.checkDate ? formatDate(bookmark.checkDate) : '날짜 없음';

  const skyCondition = weatherData.skyCondition;

  // upperItems 및 lowerItems에 해당하는 costumeCards를 필터링하여 가져오기
  useEffect(() => {
    const filterCostumeCards = () => {
      const cachedCostumeCards = JSON.parse(localStorage.getItem('costumeCards')) || [];
      const { upperItems, lowerItems } = bookmark || {};

      // upperItems와 lowerItems에 해당하는 카드 필터링
      const filteredCostumeCards = cachedCostumeCards.filter((card) =>
        (upperItems || []).concat(lowerItems || []).includes(card.id)
      );

      setCostumeCards(filteredCostumeCards);
    };

    if (bookmark) {
      filterCostumeCards();
    }
  }, [bookmark]);

  // 북마크 수정 (BookmarkModal에서 호출됨)
  const handleSave = (rating, comment) => {
    const updatedBookmarkList = [...bookmarkList];
    updatedBookmarkList[currentBookmarkIndex].rate = rating;
    updatedBookmarkList[currentBookmarkIndex].comment = comment;
    setBookmarkList(updatedBookmarkList);

    console.log('선택된 별점:', rating); // 선택된 별점 사용
    console.log('입력된 코멘트:', comment); // 선택된 별점 사용

    setIsEditModalOpen(false); // 모달 닫기
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false); // 수정 모달 닫기
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false); // 삭제 모달 닫기
  };

  const deleteAction = () => {
    console.log('북마크 삭제');
    setIsDeleteModalOpen(false); // 삭제 후 모달 닫기
  };

  const handleRate = (num) => {
    console.log(num);
  };

  return (
    <>
      <div className={S.centering}>
        <span className={S.title}>나의 북마크</span>
        <div className={S.upperPart}>
          <div className={S.DateLocation}>
            <p>{savedTime}</p>
            <p>{savedAddress}</p>
            <div className={S.weather}>
              <img
                src={getWeatherIcon(skyCondition).src}
                alt={getWeatherIcon(skyCondition).alt}
                className={S.weatherIcon}
              />
              {skyCondition}
            </div>
          </div>
          <div className={S.iconWrapper}>
            <button type="button" className={S.icon} onClick={openEditModal}>
              <FaRegEdit />
            </button>
            <button type="button" className={S.icon} onClick={handleDelete}>
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>

        <span className={S.OOTD}>추천 OOTD</span>
        <CostumeCardManager viewType="OOTD" costumeCards={costumeCards} />
        <div className={S.comment}>
          <div className={S.comment__Part}>
            <label htmlFor="comment">Comment</label>
            <StarRate initialRate={bookmark?.rate} onRate={handleRate} />
          </div>
          <p className={S.comment__Content}>{bookmark?.comment || '코멘트가 없습니다.'}</p>
          <p className={S.savedDate}>{savedTime}</p>
        </div>
      </div>

      {/* 수정 모달 */}
      {isEditModalOpen && (
        <BookmarkModal
          address={savedAddress}
          saveDate={savedTime}
          weatherText={skyCondition}
          onClick={closeEditModal}
          onChange={(e) => console.log(e.target.value)}
          onEdit={handleSave}
        />
      )}

      {/* 삭제 확인 모달 */}
      {isDeleteModalOpen && (
        <CommonModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          title={['북마크를', '삭제하시겠습니까?']}
          firstActionText="취소"
          secondActionText="삭제할래요"
          onFirstAction={closeDeleteModal} // 취소 버튼
          onSecondAction={deleteAction} // 삭제 버튼
        />
      )}
    </>
  );
};

export default Bookmark;
