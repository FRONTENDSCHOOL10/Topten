import { Button, StarRate } from '@/components';
import { func, string } from 'prop-types';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import S from './/BookmarkModal.module.scss';

const BookmarkModal = ({ address, saveDate, weatherText, onClick, onChange, onEdit }) => {
  const [rating, setRating] = useState(0); // 별점 상태
  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
    setComment(e.target.value);
  };

  return (
    <div className={S.modalOverlay}>
      <div className={S.BookmarkModal}>
        <div className={S.date__button__container}>
          <h2>{saveDate}</h2>
          <button type="button" className={S.close} onClick={() => onClick?.()}>
            <IoMdClose />
          </button>
        </div>
        <p className={S.location}>{address}</p>
        <p className={S.weather}>{weatherText}</p>
        <div className={S.comment__rate__container}>
          <label htmlFor="comment">Comment</label>
          {/* StarRate에서 별점을 선택했을 때 상위 컴포넌트에 전달 */}
          <StarRate onRate={setRating} />
        </div>
        <textarea name="comment" id="comment" value={comment} onChange={handleCommentChange} />
        <Button text="OOTD 저장하기" onClick={() => onEdit?.(rating, comment)} />
      </div>
    </div>
  );
};

BookmarkModal.propTypes = {
  address: string,
  saveDate: string,
  weatherText: string,
  onClick: func,
  onChange: func,
  onEdit: func,
};

export default BookmarkModal;
