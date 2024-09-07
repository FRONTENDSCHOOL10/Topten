import { useEffect, useState } from 'react';
import { string } from 'prop-types';
import pb from '@/api/pocketbase';
import { useLikeStore } from '@/stores/likeStore'; // Zustand 스토어 가져오기
import CostumeCard from '@/components/CostumeCard/CostumeCard';
import S from './CostumeCardList.module.scss';

// Swiper 관련 라이브러리
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

const CostumeCardList = ({ viewType }) => {
  const [costumeCards, setCostumeCards] = useState([]);
  const likeList = useLikeStore((state) => state.likeList); // 좋아요 상태 가져오기

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

  if (viewType === '리스트') {
    return (
      <Swiper spaceBetween={10} slidesPerView={2}>
        {costumeCards.map((record) => (
          <SwiperSlide key={record.id}>
            <CostumeCard
              record={record}
              imageUrl={record.imageUrl}
              isLiked={likeList.includes(record.id)} // 좋아요 상태 전달
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
          />
        ))}
      </div>
    );
  }

  return null;
};

CostumeCardList.propTypes = {
  viewType: string.isRequired,
};

export default CostumeCardList;
