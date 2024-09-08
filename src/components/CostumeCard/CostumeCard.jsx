
import { useState, useEffect } from 'react';
import { string, bool, func, shape } from 'prop-types';
import { FaLink } from 'react-icons/fa6';
import { TbPhotoExclamation } from 'react-icons/tb'; // 대체 아이콘
import S from './CostumeCard.module.scss';

const CostumeCard = ({ record, imageUrl, isLiked, onLikeToggle }) => {
  const { costumeTitle, costumeBrand, costumeLink } = record;
  const [imageError, setImageError] = useState(false); // 이미지 로딩 실패 여부

  // 링크의 키와 URL을 추출
  const linkKey = Object.keys(costumeLink)[0];
  const linkUrl = costumeLink[linkKey];


  // 이미지가 없거나, 로딩에 실패한 경우 에러 아이콘 또는 기본 이미지 표시
  const validImageUrl = imageUrl && !imageError ? imageUrl : null;

  // 이미지 URL이 없거나 잘못된 경우도 로그 출력
  useEffect(() => {
    if (!imageUrl || imageUrl === 'undefined' || imageUrl === 'null') {
      console.log('Image URL is invalid:', imageUrl);
      setImageError(true); // 유효하지 않은 이미지 URL일 경우 바로 에러 처리
    } else {
      console.log('Image URL is valid and attempting to load:', imageUrl);
    }
  }, [imageUrl]);


  return (
    <div className={S.card}>
      {/* 좋아요 버튼 */}
      <button className={S.likeButton} onClick={onLikeToggle}>

        {/* 좋아요 상태에 따라 다른 좋아요 표시 */}

        <img
          src={isLiked ? '/image/icon-like.png' : '/image/icon-like-blank.png'}
          alt={isLiked ? '좋아요 설정됨' : '좋아요 설정되지 않음'}
          className={S.likeIcon}
        />
      </button>

      {/* 상단의 제품 이미지 또는 에러 아이콘 */}
      <div className={S.imageWrapper}>

        {validImageUrl && !imageError ? (
          <img
            src={validImageUrl}
            alt={costumeTitle}
            className={S.image}
            onLoad={() => {
              console.log('Image loaded successfully:', validImageUrl);
            }}
            onError={() => {
              console.log(`Image failed to load: ${validImageUrl}`);
              setImageError(true); // 에러 상태 설정
            }} // 이미지 로딩 실패 시 에러 처리
          />
        ) : (
          <TbPhotoExclamation className={S.errorIcon} /> // 이미지 로딩 실패 또는 경로가 없는 경우 아이콘 표시

        )}
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

  imageUrl: string, // 이미지 경로가 없을 수 있으므로 string으로 설정

  isLiked: bool.isRequired,
  onLikeToggle: func.isRequired,
};

export default CostumeCard;
