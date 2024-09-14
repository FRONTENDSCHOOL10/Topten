import { useMemo } from 'react';
import { object, string, arrayOf } from 'prop-types';
import CostumeCard from '@/components/CostumeCard/CostumeCard';
import useLikeStore from '@/stores/likeStore'; // Zustand store
import S from './CostumeCardManager.module.scss';
import getPbImageURL from '@/api/getPbImageURL'; // PocketBase 이미지 URL 생성 함수

const CostumeCardManager = ({ user, viewType, costumeCards }) => {
  const { likeLocal, toggleLikeLocal } = useLikeStore();

  // 좋아요 상태와 카드 데이터를 메모이제이션
  const memoizedCards = useMemo(() => {
    return costumeCards.map((record) => {
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
    });
  }, [costumeCards, likeLocal]);

  if (!costumeCards.length) {
    return <div>저장된 제품이 없는것 같아요...</div>;
  }

  if (viewType === '리스트') {
    return (
      <div className="wrapComponent">
        <div className={S.gridList}>{memoizedCards}</div>
      </div>
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
