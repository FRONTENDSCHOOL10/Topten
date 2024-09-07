import { string, bool, func, shape } from 'prop-types';
import S from './CostumeCard.module.scss';

const CostumeCard = ({ record, imageUrl, isLiked, onLikeToggle }) => {
  const { costumeTitle, costumeBrand, costumeLink } = record;

  return (
    <div className={S.card}>
      {/* 좋아요 버튼 */}
      <button className={S.likeButton} onClick={onLikeToggle}>
        {isLiked ? '❤️' : '🤍'}
      </button>

      {/* 상단의 제품 이미지 */}
      <div className={S.imageWrapper}>
        <img src={imageUrl} alt={costumeTitle} className={S.image} />
      </div>

      {/* 제품 정보 */}
      <div className={S.infoWrapper}>
        <h3 className={S.title}>{costumeBrand}</h3>
        <p className={S.description}>{costumeTitle}</p>

        {/* 구매 링크 */}
        <a href={costumeLink.url} className={S.link} target="_blank" rel="noopener noreferrer">
          구매하러 가기
        </a>
      </div>
    </div>
  );
};

CostumeCard.propTypes = {
  record: shape({
    costumeTitle: string.isRequired,
    costumeBrand: string.isRequired,
    costumeLink: shape({
      url: string.isRequired,
    }).isRequired,
  }).isRequired,
  imageUrl: string.isRequired, // 이미지 URL도 props로 받음
  isLiked: bool.isRequired, // 좋아요 상태
  onLikeToggle: func.isRequired, // 좋아요 상태 변경 함수
};

export default CostumeCard;
