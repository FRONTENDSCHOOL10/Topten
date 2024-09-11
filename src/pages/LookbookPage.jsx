import { useState, useEffect } from 'react';
import Button from './../components/Button/Button';

import pb from './../api/pocketbase';
import getPbImageURL from './../api/getPbImageURL';

// 스와이퍼
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Keyboard } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import styles from './../styles/pages/LookbookPage.module.scss';

function LookbookPage(props) {
  // 착용샷
  const [lookBookItems, setLookBookItems] = useState([]);

  useEffect(() => {
    const fetchLookBookItems = async () => {
      try {
        const items = await pb.collection('lookBook').getFullList();

        // 임시
        const weather = '가을';

        // 계절에 맞는 아이템 필터링
        const seasonItems = items.filter((item) => item.lookBookSeason.includes(weather));

        // 필터링된 아이템들을 상태에 저장
        setLookBookItems(seasonItems);
      } catch (error) {
        console.error('착용샷 데이터를 가져오는 중 에러 발생:', error);
      }
    };

    fetchLookBookItems();
  }, []);

  return (
    <div className={styles.wrapComponent}>
      <h2 className={styles.title}>Look Book : OOTD</h2>

      <div className={styles.weatherIcon}>날씨</div>

      <p className={styles.description}>
        오늘 날씨엔 <br />
        이런 스타일 어때요?
      </p>

      <div className={styles.outfitSwiper}>
        <Swiper
          className={styles.swiper}
          modules={[Navigation, Pagination, Scrollbar, A11y, Keyboard]}
          spaceBetween={20}
          slidesPerView={1.2}
          keyboard={{ enabled: true }}
          navigation
          pagination={{ clickable: true }}
          a11y={{
            prevSlideMessage: '이전 슬라이드',
            nextSlideMessage: '다음 슬라이드',
            paginationBulletMessage: '페이지 {{index}}',
          }}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {lookBookItems.length > 0 ? (
            lookBookItems.map((item) => (
              <SwiperSlide key={item.id}>
                <img
                  src={getPbImageURL(item, 'outfitImage')}
                  alt={item.lookBookTitle}
                  className={styles.outfitImage}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>계절에 맞는 착용샷이 없습니다.</SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
}

export default LookbookPage;
