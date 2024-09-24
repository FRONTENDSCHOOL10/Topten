import getPbImageURL from '@/api/getPbImageURL'; // PocketBase 이미지 URL 생성 함수
import { CostumeCard } from '@/components';
import useLikeStore from '@/stores/likeStore'; // Zustand store
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { arrayOf, object, string } from 'prop-types';
import { useMemo } from 'react';
import 'swiper/css';
import 'swiper/css/grid';
import { Swiper, SwiperSlide } from 'swiper/react';
import S from './CostumeCardManager.module.scss';

const CostumeCardManager = ({ viewType, costumeCards, onLikeToggle }) => {
  // 수정된 부분: likeList를 likeLocal로 변경하고 toggleLike를 toggleLikeLocal로 변경
  const { likeLocal, toggleLikeLocal } = useLikeStore();

  const handleToggle = onLikeToggle || toggleLikeLocal;

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

  // 좋아요된 카드만 필터링
  const filteredCards = useMemo(() => {
    return costumeCards.filter((record) => likeLocal.includes(record.id));
  }, [costumeCards, likeLocal]);

  if (!costumeCards.length) {
    return <div>저장된 제품이 없는것 같아요...</div>;
  }

  if (viewType === '리스트') {
    return (
      <Swiper spaceBetween={1} slidesPerView={2.15}>
        {memoizedCards}
      </Swiper>
    );
  }

  if (viewType === '앨범') {
    return (
      <div className={S.flexAlbum}>
        <AnimatePresence>
          {filteredCards.map((record) => {
            const imageUrl = getPbImageURL(record, 'costumeImage');
            return (
              <motion.div
                key={record.id}
                layout // 레이아웃 애니메이션 활성화
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={S.cardWrapperAlbum}
              >
                <CostumeCard
                  record={record}
                  imageUrl={imageUrl}
                  isLiked={likeLocal.includes(record.id)}
                  onLikeToggle={() => handleToggle(record.id)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    );
  }

  if (viewType === 'OOTD') {
    // OOTD에서는 딱 4장의 카드만 사용
    const ootdCards = costumeCards.slice(0, 4);
    const ootdGridClass = clsx(S.gridOOTD, {
      [S.twoByOneGrid]: ootdCards.length <= 2, // 2개 이하일 때 적용할 클래스
      [S.twoByTwoGrid]: ootdCards.length > 2, // 3개 이상일 때 적용할 클래스
    });
    return (
      <div className={ootdGridClass}>
        {ootdCards.map((record) => {
          const imageUrl = getPbImageURL(record, 'costumeImage');
          return (
            <div key={record.id} className={S.cardWrapper}>
              <CostumeCard
                record={record}
                imageUrl={imageUrl}
                isLiked={likeLocal.includes(record.id)}
                onLikeToggle={() => handleToggle(record.id)}
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
  viewType: string.isRequired, // viewType은 필수 문자열
  costumeCards: arrayOf(object).isRequired, // costumeCards는 객체 배열 형식
};

export default CostumeCardManager;
