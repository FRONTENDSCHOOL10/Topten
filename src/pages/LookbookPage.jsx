import { useState, useEffect, useRef } from 'react';
import Button from './../components/Button/Button';
import styles from './../styles/pages/Lookbookpage.module.scss';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import pb from './../api/pocketbase';
import getPbImageURL from './../api/getPbImageURL';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, A11y, Keyboard } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { IoRefreshSharp } from 'react-icons/io5';

function LookbookPage(props) {
  const [lookBookItems, setLookBookItems] = useState([]);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLookBookItems = async () => {
      try {
        // 착용샷 가져오기 --------------------------
        const items = await pb.collection('lookBook').getFullList();

        const weather = '가을';

        // 계절용 룩북 (2개)
        const seasonItems = items
          .filter((item) => item.lookBookSeason.includes(weather))
          .slice(0, 2);

        // 범용(사계절) 룩북 (3개)
        const allSeasonItems = items.filter((item) =>
          ['봄', '여름', '가을', '겨울'].every((season) => item.lookBookSeason.includes(season))
        );

        const combinedItems = [...seasonItems, ...allSeasonItems];

        setLookBookItems(combinedItems);
      } catch (error) {
        console.error('착용샷 데이터를 가져오는 중 에러 발생:', error);
      }
    };

    fetchLookBookItems();
  }, []);

  // 스와이퍼 네비게이션 버튼 -----------------------
  const goNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const goPrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  // 착용샷 클릭 시 로컬에 저장 & 상세 페이지 이동 ------
  const handleImageClick = (item) => {
    localStorage.setItem('selectedItemId', item.id);

    navigate('/lookbookdetailpage');
  };

  // 새로고침 기능 -----------------------------
  const handleRefresh = {
    // 새로고침
  };

  return (
    <>
      <Helmet>
        <title>OOTD 룩북 | StyleCast - 나만의 스타일 캐스트</title>
        <meta name="description" content="Stylecast의 OOTD 룩북 페이지" />
        <meta property="og:title" content="StyleCast - OOTD 룩북" />
        <meta property="twitter:title" content="StyleCast - OOTD 룩북" />
        <meta property="og:type" content="site" />
        <meta property="og:url" content="" />
        <meta property="og:description" content="StyleCast의 OOTD 룩북 페이지" />
        <meta property="og:image" content="" />
        <meta property="og:site:author" content="TopTen" />
      </Helmet>

      <div className={styles.wrapComponent}>
        <div className={styles.topWrapper}>

        <h2 className={styles.title}>Look Book : OOTD</h2>

        <div className={styles.refreshBtn}>
          <Button
            icon={<IoRefreshSharp />}
            active={true}
            onClick={handleRefresh}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              width: '31px',
              height: '31px',
              marginLeft: '-8px',
            }}
            />
        </div>
            </div>

        <div className={styles.weatherIcon}>날씨</div>

        <div className={styles.subTitle}>
          <p className={styles.description}>
            오늘 날씨엔 <br />
            이런 스타일 어때요?
          </p>

          <div className={styles.swiperBtn}>
            <button className={styles.goPrev} type="button" onClick={goPrev}>
              <GoChevronLeft />
            </button>
            <button className={styles.goNext} type="button" onClick={goNext}>
              <GoChevronRight />
            </button>
          </div>
        </div>

        <div className={styles.outfitSwiper}>
          <Swiper
            className={styles.swiper}
            modules={[Pagination, Scrollbar, A11y, Keyboard]}
            spaceBetween={20}
            slidesPerView={1.2}
            loop={lookBookItems.length > 1}
            keyboard={{ enabled: true }}
            pagination={{ clickable: true }}
            a11y={{
              prevSlideMessage: '이전 슬라이드',
              nextSlideMessage: '다음 슬라이드',
              paginationBulletMessage: '페이지 {{index}}',
            }}
            ref={swiperRef}
          >
            {lookBookItems.length > 0 ? (
              lookBookItems.map((item) => (
                <SwiperSlide key={item.id}>
                  <img
                    src={getPbImageURL(item, 'outfitImage')}
                    alt={item.lookBookTitle}
                    className={styles.outfitImage}
                    onClick={() => handleImageClick(item)}
                  />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>계절에 맞는 착용샷이 없습니다.</SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default LookbookPage;
