import Button from '../Button/Button';
import StarRate from '../StarRate/StarRate';
import S from './/BookmarkModal.module.scss';
const BookmarkModal = ({ address, weatherText, onClick, onChange, onEdit }) => {
  return (
    <div className={S.modalOverlay}>
      <div className={S.BookmarkModal}>
        <div className={S.date__button__container}>
          <h2>2024.08.28</h2>
          <button onClick={() => onClick?.()}>X</button>
        </div>
        <p className={S.location}>{address}</p>
        <p className={S.weather}>{weatherText}</p>
        <div className={S.comment__rate__container}>
          <label htmlFor="comment">Comment</label>
          <StarRate />
        </div>
        <textarea name="comment" id="comment" onChange={(e) => onChange?.(e)} />
        <Button text="OOTD 저장하기" onClick={onEdit} />
      </div>
    </div>
  );
};

export default BookmarkModal;
