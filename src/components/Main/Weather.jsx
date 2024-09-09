import styles from './../../styles/components/Weather.module.scss';

function Weather() {

  return (
    <div className={styles.weatherWrap}>
      <h2>메인페이지 날씨 컴포넌트</h2>

      {/* 현재 위치 */}
      <div className={styles.weatherLocation}>
        <img src="/icon/icon-location.png" alt="현재 위치" className={styles.icon} />
        <span> 금천구 시흥동</span>
      </div>

      {/* 현재 위치에 따른 날씨 */}
      <div className={styles.currentWeather}>

        {/* 현재 기온 및 날씨 텍스트 */}
        <div className="weatherInfo">
          <div className="">
            <p>25.1°</p>
            <p>어제보다 <span>0.2</span><span>°</span> <span>↓</span></p>
            <p>구름 많음</p>
            <p>32° / 25°  체감온도 26°</p>
          </div>
        </div>

        {/* 날씨 아이콘 */}
        <div className="weatherIcon">
          <img src="/icon/icon-location.png" alt="현재 위치" className={styles.iconWeather} />
        </div>
        
      </div>
    </div>
  );
}

export default Weather;
