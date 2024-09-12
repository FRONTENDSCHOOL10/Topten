import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import LookBook from './../components/Main/LookBook';
import pb from './../api/pocketbase';
import styles from './../styles/pages/LookbookDetailPage.module.scss';
import { GoChevronLeft } from 'react-icons/go';

import { useNavigate } from 'react-router-dom';

function LookBookDetailPage() {
  const navigate = useNavigate();

  // 룩북 페이지에서 클릭된 착용샷
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      // 로컬에 저장되어 있는 클릭된 착용샷 id 가져옴
      const itemId = localStorage.getItem('selectedItemId');

      if (itemId) {
        try {
          // 룩북 레코드에서 클릭된 착용샷 id을 저장
          const item = await pb.collection('lookBook').getOne(itemId);

          setItem(item);
        } catch (error) {
          console.error('아이템 상세 데이터를 가져오는 중 에러 발생:', error);
        }
      }
    };

    fetchItemDetails();
  }, []);

  return (
    <>
      <Helmet>
        <title>OOTD 룩북 상세 페이지 | StyleCast - 나만의 스타일 캐스트</title>
        <meta name="description" content="Stylecast의 OOTD 룩북 상세 페이지" />
        <meta property="og:title" content="StyleCast - OOTD 룩북 상세 페이지" />
        <meta property="twitter:title" content="StyleCast - OOTD 룩북 상세 페이지" />
        <meta property="og:type" content="site" />
        <meta property="og:url" content="" />
        <meta property="og:description" content="StyleCast의 OOTD 룩북 상세 페이지" />
        <meta property="og:image" content="" />
        <meta property="og:site:author" content="TopTen" />
      </Helmet>

      <div className={styles.wrapComponent}>
        <div className={styles.topWrapper}>
          <button className={styles.goPrev} type="button" onClick={() => navigate(-1)}>
            <GoChevronLeft />
          </button>
          <h2 className={styles.title}>Outfit of the Day </h2>
        </div>

        <div className={styles.weatherIcon}>날씨</div>

        <div className={styles.subTitle}>
          <p className={styles.description}>
            저희가 추천하는 <br />
            오늘의 OOTD 입니다.
          </p>
        </div>

        <div className={styles.product}>
          {item ? <LookBook item={item} /> : <p>선택된 아이템이 없습니다.</p>}
        </div>
      </div>
    </>
  );
}

export default LookBookDetailPage;
