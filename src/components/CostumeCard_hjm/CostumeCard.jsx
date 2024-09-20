import { useState, useEffect } from 'react';
import { string, bool, func, shape } from 'prop-types';
import { FaLink } from 'react-icons/fa6';
import { TbPhotoExclamation } from 'react-icons/tb'; // 대체 아이콘
import S from './CostumeCard.module.scss';
import LazyLoad from 'react-lazyload';
import { Loader } from '@/components';

const CostumeCard = ({ record, imageUrl, isLiked, onLikeToggle }) => {
  const { costumeTitle, costumeBrand, costumeLink } = record;
  const [imageError, setImageError] = useState(false); // 이미지 로딩 실패 여부
  const [isLoading, setIsLoading] = useState(true);
  const [fileStatus, setFileStatus] = useState(imageUrl ? 'loading' : 'no image to load');

  // 이미지가 없거나, 로딩에 실패한 경우 에러 아이콘 또는 기본 이미지 표시
  const validImageUrl = imageUrl && !imageError ? imageUrl : null;

  // 이미지 URL이 없거나 잘못된 경우도 로그 출력
  useEffect(() => {
    if (!imageUrl || imageUrl === 'undefined' || imageUrl === 'null') {
      console.log('Image URL is invalid:', imageUrl);
      setImageError(true); // 유효하지 않은 이미지 URL일 경우 바로 에러 처리
      setIsLoading(false);
    }
  }, [imageUrl, isLoading]);

  const handleImageLoad = () => {
    // console.log(`Image loaded successfully: ${validImageUrl}`);
    setIsLoading(false); // 로딩 종료
    setFileStatus('loaded');
  };

  const handleImageError = () => {
    console.log(`Image failed to load: ${validImageUrl}`);
    setImageError(true); // 에러 상태 설정
    setIsLoading(false); // 로딩 종료
    setFileStatus('failed to load');
  };

  const renderStatus = () => {
    switch (fileStatus) {
      case 'loading':
        return <Loader />;
      case 'failed to load':
        return null;
      default:
        return null;
    }
  };

  return (
    <div className={S.card}>
      {/* 좋아요 버튼 */}
      <button className={S.likeButton} onClick={onLikeToggle}>
        <img
          src={isLiked ? '/image/icon-like.png' : '/image/icon-like-blank.png'}
          alt={isLiked ? '좋아요 설정됨' : '좋아요 설정되지 않음'}
          className={S.likeIcon}
        />
      </button>
      {/* 상단의 제품 이미지 또는 에러 아이콘 */}
      <div className={S.imageWrapper}>
        {renderStatus()}
        <LazyLoad
          height={175} // 이미지 높이를 175px로 설정
          offset={50} // 스크롤 100px 전에 로딩 시작
          placeholder={<Loader />} // 로딩 중 보여줄 컴포넌트
        >
          {validImageUrl && !imageError ? (
            <img
              src={validImageUrl}
              alt={costumeTitle}
              className={S.image}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          ) : (
            <TbPhotoExclamation className={S.errorIcon} /> // 이미지 로딩 실패 또는 경로가 없는 경우 아이콘 표시
          )}
        </LazyLoad>
      </div>

      {/* 제품 정보 */}
      <div className={S.infoWrapper}>
        <h3 className={S.title}>{costumeBrand}</h3>
        <p className={S.description}>{costumeTitle}</p>

        {/* 구매 링크 */}
        <a href={costumeLink} className={S.link} target="_blank" rel="noopener noreferrer">
          <FaLink />
          {costumeBrand}
        </a>
      </div>
    </div>
  );
};

CostumeCard.propTypes = {
  record: shape({
    costumeTitle: string.isRequired,
    costumeBrand: string.isRequired,
    costumeLink: string.isRequired, // 이제 costumeLink는 문자열입니다
  }).isRequired,

  imageUrl: string, // 이미지 경로가 없을 수 있으므로 string으로 설정
  isLiked: bool.isRequired,
  onLikeToggle: func.isRequired,
};

export default CostumeCard;
