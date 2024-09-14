import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { IoRefreshSharp } from 'react-icons/io5';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { A11y, Keyboard, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/pagination';
import getPbImageURL from './../api/getPbImageURL';
import pb from './../api/pocketbase';
import Button from './../components/Button/Button';
import styles from './../styles/pages/Lookbookpage.module.scss';

function LookbookPage() {
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  // 전체 착용샷
  const [lookBookItems, setLookBookItems] = useState([]);

  // 현재 착용샷
  const [currentSeasonItems, setCurrentSeasonItems] = useState([]);

  // 현재 경로 저장(LookbookPage/LookbookDetailPage 구분을 위함)
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/lookbook/');

  useEffect(() => {
    const fetchLookBookItems = async () => {
      try {
        // 세션에서 상태 복원 ----------------------
        // - 상세 페이지에서 돌아올 시 착용샷 유지를 위함
        const savedLookBookItems = sessionStorage.getItem('lookBookItems');

        if (savedLookBookItems) {
          setLookBookItems(JSON.parse(savedLookBookItems));

          return;
        }

        // 착용샷 가져오기 --------------------------
        const items = await pb.collection('lookBook').getFullList();

        // 임시!!!!
        const weather = '가을';

        // 계절용 룩북 (2개)
        const seasonItems = items
          .filter((item) => item.lookBookSeason.includes(weather))
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);

        // 범용 룩북 (3개)
        const allSeasonItems = items
          .filter((item) => item.lookBookSeason.includes('범용'))
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);


        // 현재 착용샷 - 업데이트
        setCurrentSeasonItems({ seasonItems, allSeasonItems });

        // 전체 챡용샷 - 업데이트
        setLookBookItems([...seasonItems, ...allSeasonItems]);

      
        // 전체 착용샷 - 세션에 저장 --------------------------
        // - 상세 페이지에서 돌아올 시 착용샷 유지를 위함
        sessionStorage.setItem(
          'lookBookItems',
          JSON.stringify([...seasonItems, ...allSeasonItems])
        );

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


  // 착용샷 클릭 시 착용샷 상세 페이지로 이동 ------
  const handleImageClick = (item) => {
    navigate(`/lookbook/${item.id}`);
  };


  // 새로고침 기능 -----------------------------
  const handleRefresh = async () => {
    try {
      const items = await pb.collection('lookBook').getFullList();

      // 임시!!!
      const weather = '가을';

      // 현재 착용샷의 id 배열로 만듦(중복 방지)
      const currentSeasonItemIds = lookBookItems.map((item) => item.id);

      // 계절용 - 새로운 아이템(중복 X)
      const newSeasonItems = items
        .filter(
          (item) => item.lookBookSeason.includes(weather) && !currentSeasonItemIds.includes(item.id)
        )
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);

      // 범용 - 새로운 아이템(중복 X)
      const newAllSeasonItems = items
        .filter(
          (item) => item.lookBookSeason.includes('범용') && !currentSeasonItemIds.includes(item.id)
        )
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);


      // 새로운 착용샷(계절용 + 범용) 업데이트
      const newLookBookItems = [...newSeasonItems, ...newAllSeasonItems];

      setLookBookItems(newLookBookItems);


      // 새로운 착용샷 세션에 저장
      // - 상세 페이지에서 돌아올 시 착용샷 유지를 위함
      sessionStorage.setItem('lookBookItems', JSON.stringify(newLookBookItems));


      // 첫 번째 슬라이드로 돌아오기
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideTo(0);
      }
    } catch (error) {
      console.error('새로고침 중 에러 발생:', error);
    }
  };


  return isDetailPage ? (
    <Outlet />
  ) : (
    <>
      <Helmet>
        <title>룩북 페이지 | StyleCast - 나만의 스타일 캐스트</title>
        <meta property="og:title" content="룩북 페이지 | StyleCast - 나만의 스타일 캐스트" />
        <meta property="twitter:title" content="룩북 페이지 | StyleCast - 나만의 스타일 캐스트" />
        <meta name="description" content="날씨에 따른 옷차림을 추천해주는 StyleCast" />
        <meta property="og:description" content="날씨에 따른 옷차림을 추천해주는 StyleCast" />
        <meta
          name="keywords"
          content="날씨, 기온, 옷차림, 뭐입지, 입을옷, 의류, 기상정보, 룩북, 체형, 퍼스널컬러"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://stylecast.netlify.app/image/og-sc.png" />
        <meta property="og:url" content="https://stylecast.netlify.app/" />
        <meta property="og:site:author" content="TopTen" />
        <link rel="canonical" href="https://stylecast.netlify.app/" />
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
