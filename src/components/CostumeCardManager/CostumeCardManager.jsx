import { useMemo } from 'react';
import CostumeCard from '@/components/CostumeCard/CostumeCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import useLikeStore from '@/stores/likeStore';
import S from './CostumeCardManager.module.scss';
import getPbImageURL from '@/api/getPbImageURL';

const CostumeCardManager = ({ viewType, costumeCards }) => {
  const { likeList, toggleLike } = useLikeStore();

  // 좋아요 상태와 카드 데이터를 메모이제이션
  const memoizedCards = useMemo(() => {
    return costumeCards.map((record) => {
      const imageUrl = getPbImageURL(record, 'costumeImage');
      return (
        <SwiperSlide key={record.id}>
          <CostumeCard
            record={record}
            imageUrl={imageUrl}
            isLiked={likeList.includes(record.id)} // 좋아요 상태 전달
            onLikeToggle={() => toggleLike(record.id)} // 좋아요 토글 함수 전달
          />
        </SwiperSlide>
      );
    });
  }, [costumeCards, likeList]); // costumeCards와 likeList가 변할 때만 재계산

  // if (!costumeCards.length) {
  //   return <div>Loading...</div>;
  // }

  if (viewType === '리스트') {
    return (
      <div className="wrapComponent">
        <Swiper spaceBetween={10} slidesPerView={2}>
          {memoizedCards}
        </Swiper>
      </div>
    );
  }

  if (viewType === '앨범') {
    return <div className={S.grid}>{memoizedCards}</div>;
  }

  return null;
};

export default CostumeCardManager;
