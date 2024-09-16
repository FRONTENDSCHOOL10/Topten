import { useMemo } from 'react';
import { object, string, arrayOf } from 'prop-types';
import CostumeCard from '@/components/CostumeCard/CostumeCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper/modules';
import 'swiper/css/grid';
import 'swiper/css';
import useLikeStore from '@/stores/likeStore'; // Zustand store
import S from './CostumeCardManager.module.scss';
import getPbImageURL from '@/api/getPbImageURL'; // PocketBase 이미지 URL 생성 함수

const CostumeCardManager = ({ user, viewType, costumeCards }) => {
  // 수정된 부분: likeList를 likeLocal로 변경하고 toggleLike를 toggleLikeLocal로 변경
  const { likeLocal, toggleLikeLocal } = useLikeStore();

  // 좋아요 상태와 카드 데이터를 메모이제이션
  const memoizedCards = useMemo(() => {
    return costumeCards.map((record) => {
      const imageUrl = getPbImageURL(record, 'costumeImage');

      return (
        <SwiperSlide key={record.id}>
          <CostumeCard
            record={record}
            imageUrl={imageUrl}
            isLiked={likeLocal.includes(record.id)} // 수정된 부분: likeLocal로 좋아요 상태 전달
            onLikeToggle={() => toggleLikeLocal(record.id)} // 수정된 부분: toggleLikeLocal로 토글 함수 전달
          />
        </SwiperSlide>
      );
    });
  }, [costumeCards, likeLocal]); // 수정된 부분: likeLocal을 의존성 배열에 추가

  if (!costumeCards.length) {
    return <div>저장된 제품이 없는것 같아요...</div>;
  }

  if (viewType === '리스트') {
    return (
      <Swiper spaceBetween={1} slidesPerView={1.9}>
        {memoizedCards}
      </Swiper>
    );
  }

  if (viewType === '앨범') {
    return <div className={S.gridAlbum}>{memoizedCards}</div>;
  }

  if (viewType === 'OOTD') {
    // OOTD에서는 딱 4장의 카드만 사용
    const ootdCards = costumeCards.slice(0, 4);

    return (
      <div className={S.gridOOTD}>
        {ootdCards.map((record) => {
          const imageUrl = getPbImageURL(record, 'costumeImage');
          return (
            <div key={record.id} className={S.cardWrapper}>
              <CostumeCard
                record={record}
                imageUrl={imageUrl}
                isLiked={likeLocal.includes(record.id)}
                onLikeToggle={() => toggleLikeLocal(record.id)}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};

// PropTypes 유효성 검사
CostumeCardManager.propTypes = {
  user: object, // user는 객체 형식
  viewType: string.isRequired, // viewType은 필수 문자열
  costumeCards: arrayOf(object).isRequired, // costumeCards는 객체 배열 형식
};

export default CostumeCardManager;
