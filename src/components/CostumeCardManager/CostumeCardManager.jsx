import { useEffect, useMemo } from 'react';
import CostumeCard from '@/components/CostumeCard/CostumeCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import useLikeStore from '@/stores/likeStore'; // Zustand store
import S from './CostumeCardManager.module.scss';
import getPbImageURL from '@/api/getPbImageURL'; // PocketBase 이미지 URL 생성 함수

const CostumeCardManager = ({ user, viewType, costumeCards }) => {
  const { likeList, toggleLike, setLikeList } = useLikeStore();

  // 좋아요 리스트를 서버에서 불러오는 작업을 useEffect로 처리
  useEffect(() => {
    if (user?.id) {
      const fetchLikes = async () => {
        const response = await pb.collection('likeList').getFullList({
          filter: `owner = "${user.id}"`,
        });
        const likedIds = response.map((item) => item.costumeCard);
        setLikeList(likedIds); // 서버에서 불러온 데이터를 Zustand에 설정
      };
      fetchLikes();
    }
  }, [user, setLikeList]);

  // 좋아요 상태와 카드 데이터를 메모이제이션
  const memoizedCards = useMemo(() => {
    return costumeCards.map((record) => {
      const imageUrl = getPbImageURL(record, 'costumeImage');
      console.log(`Record ID: ${record.id}, Image URL: ${imageUrl}`);

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

  if (!costumeCards.length) {
    return <div>Loading...</div>;
  }

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
