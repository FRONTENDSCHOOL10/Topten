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
        <title>룩북 상세 페이지 | StyleCast - 나만의 스타일 캐스트</title>
        <meta property="og:title" content="룩북 상세 페이지 | StyleCast - 나만의 스타일 캐스트" />
        <meta property="twitter:title" content="룩북 상세 페이지 | StyleCast - 나만의 스타일 캐스트" />
        <meta name="description" content="날씨에 따른 옷차림을 추천해주는 StyleCast" />
        <meta property="og:description" content="날씨에 따른 옷차림을 추천해주는 StyleCast" />
        <meta name="keywords" content="날씨, 기온, 옷차림, 뭐입지, 입을옷, 의류, 기상정보, 룩북, 체형, 퍼스널컬러" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://stylecast.netlify.app/image/og-sc.png" />
        <meta property="og:url" content="https://stylecast.netlify.app/" />
        <meta property="og:site:author" content="TopTen" />
        <link rel="canonical" href="https://stylecast.netlify.app/" />
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
