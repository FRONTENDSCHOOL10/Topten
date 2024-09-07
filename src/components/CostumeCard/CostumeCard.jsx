import { string, bool, shape } from 'prop-types';
import getPbImageURL from '@/api/getPbImageURL';
import S from './CostumeCard.module.scss';

const CostumeCard = ({ record }) => {
  const { costumeTitle, costumeBrand, costumeLink, costumeImage, isRainsnow } = record;

  const imageUrl = getPbImageURL(record, 'costumeImage');

  return (
    <div className={S.card}>
      {/* 상단의 제품 이미지 */}
      <div className={S.imageWrapper}>
        <img src={imageUrl} alt={costumeTitle} className={S.image} />
      </div>

      {/* 제품 정보 */}
      <div className={S.infoWrapper}>
        <h3 className={S.title}>{costumeBrand}</h3>
        <p className={S.description}>{costumeTitle}</p>

        {/* 비오는 날 여부에 따른 아이콘 */}
        {isRainsnow && <div className={S.rainsnow}>🌧️ 비/눈</div>}

        {/* 구매 링크 */}
        <a href={costumeLink} className={S.link} target="_blank" rel="noopener noreferrer">
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
    costumeLink: string.isRequired,
    costumeImage: string.isRequired,
    isRainsnow: bool.isRequired,
  }).isRequired,
};

export default CostumeCard;
