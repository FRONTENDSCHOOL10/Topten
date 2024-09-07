import { useEffect, useState } from 'react';
import { string } from 'prop-types';
import pb from '@/api/pocketbase';
import CostumeCard from '@/components/CostumeCard/CostumeCard';
import S from './CostumeCardList.module.scss';

// Swiper 관련 라이브러리
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

const CostumeCardList = ({ viewType }) => {
  const [costumeCards, setCostumeCards] = useState([]);

  useEffect(() => {
    const fetchCostumeCards = async () => {
      try {
        // 전체 코스튬 카드 리스트를 불러옵니다.
        const records = await pb.collection('costumeCard').getFullList({
          sort: '-created', // 최신순 정렬
        });

        // 이미지 URL 생성 후 state에 저장
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
    // Swiper를 이용해 가로로 나열하는 방식
    return (
      <Swiper spaceBetween={10} slidesPerView={2}>
        {costumeCards.map((record) => (
          <SwiperSlide key={record.id}>
            <CostumeCard record={record} imageUrl={record.imageUrl} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  if (viewType === '앨범') {
    // 2x2 형태로 나열하는 방식 (그리드)
    return (
      <div className={S.grid}>
        {costumeCards.map((record) => (
          <CostumeCard key={record.id} record={record} imageUrl={record.imageUrl} />
        ))}
      </div>
    );
  }

  return null; // viewType이 '리스트' 또는 '앨범'이 아닐 때 null 반환
};

CostumeCardList.propTypes = {
  viewType: string.isRequired, // '리스트' 또는 '앨범' 값 필요
};

export default CostumeCardList;
