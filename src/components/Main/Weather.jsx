import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './../../styles/components/Weather.module.scss';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setLocation({ lat, lon });
            console.log('현재 위치:', { lat, lon }); // 현재 위치를 콘솔에 출력
          },
          (err) => {
            console.error('위치 가져오기 오류:', err);
            setError('위치를 가져오는 데 실패했습니다.');
          }
        );
      } else {
        setError('Geolocation은 이 브라우저에서 지원되지 않습니다.');
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const hours = String(today.getHours()).padStart(2, '0');
      const minutes = String(today.getMinutes()).padStart(2, '0');
      const baseDate = `${year}${month}${day}`;
      const baseTime = `${hours}${minutes}`;

      // 좌표를 기상청 API에서 사용하는 좌표로 변환할 필요가 있음
      // const nx = Math.round(location.lon); // 이 예제는 좌표 변환 없이 사용
      // const ny = Math.round(location.lat); // 이 예제는 좌표 변환 없이 사용
      const nx = 55; // 이 예제는 좌표 변환 없이 사용
      const ny = 127; // 이 예제는 좌표 변환 없이 사용

      const params = {
        serviceKey: API_KEY,
        numOfRows: 10,
        pageNo: 1,
        dataType: 'JSON',
        base_date: baseDate,
        base_time: baseTime,
        nx,
        ny
      };

      axios
        .get(url, { params })
        .then((response) => {
          console.log('API Response:', response.data);
          if (response.data.response && response.data.response.body) {
            const data = response.data.response.body.items.item;
            setWeatherData(data);
          } else {
            throw new Error('응답 데이터가 없습니다.');
          }
        })
        .catch((error) => {
          setError('날씨 데이터를 불러오는 데 실패했습니다.');
          console.error('Error response:', error.response ? error.response.data : error.message);
        });
    }
  }, [location]);

  return (
    <div className={styles.weatherWrap}>
      <h2>메인페이지 날씨 컴포넌트</h2>
      {error && <p>{error}</p>}
      {weatherData ? (
        <ul>
          {weatherData.map((item, index) => (
            <li key={index}>
              <strong>{item.category}</strong>: {item.fcstValue}
            </li>
          ))}
        </ul>
      ) : (
        <p>날씨 정보를 불러오는 중...</p>
      )}
    </div>
  );
}

export default Weather;

// import styles from './../../styles/components/Weather.module.scss';

// function Weather() {

//   return (
//     <div className={styles.weatherWrap}>
//       <h2>메인페이지 날씨 컴포넌트</h2>

//       {/* 현재 위치 영역 */}
//       <div className={styles.weatherLocation}>
//         <img src="/icon/icon-location.png" alt="현재 위치" className={styles.icon} />
//         <span> 금천구 시흥동</span>
//       </div>

//       {/* 현재 위치에 따른 날씨 영역 */}
//       <div className={styles.currentWeather}>

//         {/* 현재 기온 및 날씨 텍스트 */}
//         <div className="weatherInfo">
//           <div className="">
//             <p>25.1°</p>
//             <p>어제보다 <span>0.2</span><span>°</span> <span>↓</span></p>
//             <p>구름 많음</p>
//             <p>32° / 25°  체감온도 26°</p>
//           </div>
//         </div>

//         {/* 날씨 아이콘 */}
//         <div className="weatherIcon">
//           <img src="/icon/icon-location.png" alt="현재 위치" className={styles.iconWeather} />
//         </div>
        
//       </div>

//       {/* 미세먼지, 자외선, 일출 정보 등 영역 */}
//       <div className={styles.etcWeather}>
//         미세먼지
//         초미세먼지
//         자외선
//         일출
//       </div>

//       {/* 시간별 날씨 영역 */}
//       <div className={styles.hourlyWeather}>
//         오후10시..
//       </div>

//     </div>
//   );
// }

// export default Weather;



