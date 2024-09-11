import { useEffect } from 'react';
import Button from './../components/Button/Button';
import styles from './../styles/pages/LookbookPage.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

function LookbookPage(props) {
  return (
    <div className={styles.wrapComponent}>
      <h2 className={styles.title}>Look Book : OOTD</h2>

      <div className={styles.weatherIcon}>날씨</div>

      <p className={styles.description}>
        오늘 날씨엔 <br />
        이런 스타일 어때요?
      </p>

      <div className={styles.outfitSwiper}>

        <div className={styles.outfit}>착용샷</div>
      </div>
    </div>
  );
}

export default LookbookPage;
