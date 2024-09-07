import { useEffect, useState } from 'react';
import pb from '@/api/pocketbase';
import CostumeCard from '@/components/CostumeCard/CostumeCard';
import S from './CostumeCardList.module.scss'; // SCSS 스타일

// Swiper 관련 라이브러리
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

const CostumeCardManager = ({ user, viewType }) => {
  const [likeList, setLikeList] = useState([]); // 좋아요 리스트 상태
  const [costumeCards, setCostumeCards] = useState([]); // 코스튬 카드 상태

  // 초기 좋아요 리스트 불러오기
  useEffect(() => {
    const fetchLikeList = async () => {
      try {
        const likeListRecords = await pb.collection('likeList').getFullList({
          filter: `owner="${user.id}"`,
          expand: 'costumeCard',
        });

        const likedCardIds = likeListRecords.map((record) => record.expand.costumeCard.id);
        setLikeList(likedCardIds); // 좋아요 상태 업데이트
      } catch (error) {
        console.error('Error fetching like list:', error);
      }
    };

    fetchLikeList();
  }, [user]);

  // 코스튬 카드 목록 불러오기
  useEffect(() => {
    const fetchCostumeCards = async () => {
      try {
        const records = await pb.collection('costumeCard').getFullList({
          sort: '-created',
        });

        const cardsWithImages = records.map((record) => ({
          ...record,
          imageUrl: getPbImageURL(record, 'costumeImage'),
        }));

        setCostumeCards(cardsWithImages);
      } catch (error) {
        console.error('Error fetching costume cards:', error);
      }
    };

    fetchCostumeCards();
  }, []);

  // 좋아요 토글 함수
  const toggleLike = async (costumeCardId) => {
    try {
      const isLiked = likeList.includes(costumeCardId);

      if (isLiked) {
        setLikeList((prevList) => prevList.filter((id) => id !== costumeCardId)); // 좋아요 해제

        const likeRecord = await pb
          .collection('likeList')
          .getFirstListItem(`owner="${user.id}" && costumeCard="${costumeCardId}"`);
        await pb.collection('likeList').delete(likeRecord.id); // DB에서 삭제
      } else {
        setLikeList((prevList) => [...prevList, costumeCardId]); // 좋아요 추가

        await pb.collection('likeList').create({
          owner: user.id,
          costumeCard: costumeCardId,
        }); // DB에 저장
      }
    } catch (error) {
      console.error('Error toggling like status:', error);
    }
  };

  // viewType에 따른 렌더링 방식
  if (viewType === '리스트') {
    return (
      <Swiper spaceBetween={10} slidesPerView={2}>
        {costumeCards.map((record) => (
          <SwiperSlide key={record.id}>
            <CostumeCard
              record={record}
              imageUrl={record.imageUrl}
              isLiked={likeList.includes(record.id)} // 좋아요 상태 전달
              onLikeToggle={() => toggleLike(record.id)} // 좋아요 토글 함수 전달
            />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  if (viewType === '앨범') {
    return (
      <div className={S.grid}>
        {costumeCards.map((record) => (
          <CostumeCard
            key={record.id}
            record={record}
            imageUrl={record.imageUrl}
            isLiked={likeList.includes(record.id)} // 좋아요 상태 전달
            onLikeToggle={() => toggleLike(record.id)} // 좋아요 토글 함수 전달
          />
        ))}
      </div>
    );
  }

  return null; // viewType이 '리스트' 또는 '앨범'이 아닐 때
};

export default CostumeCardManager;
