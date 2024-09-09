import { useEffect, useState } from 'react';
import pb from '@/api/pocketbase';
import CostumeCard from '@/components/CostumeCard/CostumeCard';
import S from './CostumeCardManager.module.scss';

// Swiper 관련 라이브러리
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const CostumeCardManager = ({ user, viewType }) => {
  const [likeList, setLikeList] = useState([]); // 좋아요 리스트 상태
  const [costumeCards, setCostumeCards] = useState([]); // 코스튬 카드 상태

  // 초기 좋아요 리스트 불러오기
  useEffect(() => {
    const fetchLikeList = async () => {
      try {
        const likeListRecords = await pb
          .collection('likeList')
          .getFirstListItem(`owner="${user.id}"`, {
            expand: 'costumeCard',
          });

        const likedCardIds = likeListRecords.costumeCard || [];
        setLikeList(likedCardIds); // 좋아요 상태 업데이트
      } catch (error) {
        if (error.status === 404) {
          // LikeList가 존재하지 않으면 빈 리스트 유지
          setLikeList([]);
        } else {
          console.error('Error fetching like list:', error);
        }
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
      let likeListRecord;
      try {
        // 유저의 좋아요 리스트가 있는지 확인
        likeListRecord = await pb.collection('likeList').getFirstListItem(`owner="${user.id}"`);
      } catch (error) {
        if (error.status === 404) {
          // 좋아요 리스트가 없다면 생성
          likeListRecord = await pb.collection('likeList').create({
            owner: user.id,
            costumeCard: [costumeCardId], // 새로운 카드 추가
          });
          setLikeList([costumeCardId]); // 상태 업데이트
          return;
        } else {
          console.error('Error fetching like list:', error);
          return;
        }
      }

      const isLiked = likeList.includes(costumeCardId);

      if (isLiked) {
        // 좋아요 해제: 리스트에서 제거
        const updatedCostumeCardList = likeList.filter((id) => id !== costumeCardId);

        // DB 업데이트: 리스트에서 해당 카드 ID 제거
        await pb.collection('likeList').update(likeListRecord.id, {
          costumeCard: updatedCostumeCardList,
        });

        setLikeList(updatedCostumeCardList); // 상태 업데이트
      } else {
        // 좋아요 추가: 리스트에 추가
        const updatedCostumeCardList = [...likeList, costumeCardId];

        // DB 업데이트: 리스트에 카드 ID 추가
        await pb.collection('likeList').update(likeListRecord.id, {
          costumeCard: updatedCostumeCardList,
        });

        setLikeList(updatedCostumeCardList); // 상태 업데이트
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
