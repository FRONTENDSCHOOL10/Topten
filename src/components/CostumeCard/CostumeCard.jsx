import { string, bool, func, shape } from 'prop-types';
import { FaLink } from 'react-icons/fa6';
import S from './CostumeCard.module.scss';

const CostumeCard = ({ record, imageUrl, isLiked, onLikeToggle }) => {
  const { costumeTitle, costumeBrand, costumeLink } = record;

  // 링크의 키와 URL을 추출
  const linkKey = Object.keys(costumeLink)[0];
  const linkUrl = costumeLink[linkKey];

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
        <a href={linkUrl} className={S.link} target="_blank" rel="noopener noreferrer">
          <FaLink />
          {linkKey}
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
  imageUrl: string.isRequired,
  isLiked: bool.isRequired,
  onLikeToggle: func.isRequired,
};

export default CostumeCard;
