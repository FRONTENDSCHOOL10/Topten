import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './../../styles/components/Weather.module.scss';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [address, setAddress] = useState(''); // 주소 상태 추가
  const [temperature, setTemperature] = useState(null); // TMP 값을 저장할 상태 추가
  const [yesterdayTemperature, setYesterdayTemperature] = useState(null); // 어제 기온 상태 추가

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setLocation({ lat, lon });
            console.log('현재 위치:', { lat, lon }); // 현재 위치를 콘솔에 출력

            // 위치 좌표로 주소를 변환
            getAddress(lat, lon);
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

    const getAddress = async (lat, lon) => {
      const API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
      const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`;
      const headers = {
        Authorization: `KakaoAK ${API_KEY}`,
      };
    
      try {
        const response = await axios.get(url, { headers });
        if (response.data.documents && response.data.documents.length > 0) {
          const addressData = response.data.documents[0].address;
          const city = addressData.region_1depth_name;    // 시
          const district = addressData.region_2depth_name; // 구
          const neighborhood = addressData.region_3depth_name; // 동
    
          const formattedAddress = `${city} ${district} ${neighborhood}`;
          setAddress(formattedAddress); // 간략화된 주소 저장
          console.log('현재 주소:', formattedAddress);
        } else {
          setError('주소 정보를 불러오는 데 실패했습니다.');
        }
      } catch (err) {
        console.error('Reverse Geocoding 오류:', err);
        setError('주소 정보를 불러오는 데 실패했습니다.');
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
      // const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';

      const getBaseTime = () => {
        const now = new Date();
        const hour = now.getHours();
        let baseTime;
      
        // 기상청의 데이터는 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300에 업데이트됨
        if (hour >= 2 && hour < 5) {
          baseTime = '0200';
        } else if (hour >= 5 && hour < 8) {
          baseTime = '0500';
        } else if (hour >= 8 && hour < 11) {
          baseTime = '0800';
        } else if (hour >= 11 && hour < 14) {
          baseTime = '1100';
        } else if (hour >= 14 && hour < 17) {
          baseTime = '1400';
        } else if (hour >= 17 && hour < 20) {
          baseTime = '1700';
        } else if (hour >= 20 && hour < 23) {
          baseTime = '2000';
        } else {
          baseTime = '2300';
        }
      
        return baseTime;
      };
      


      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const baseDate = `${year}${month}${day}`;
      const baseTime = getBaseTime(); // 여기서 수정된 baseTime 값 사용

      

      // 좌표를 기상청 API에서 사용하는 좌표로 변환할 필요가 있음
      const nx = Math.round(location.lat); // 이 예제는 좌표 변환 없이 사용
      const ny = Math.round(location.lon); // 이 예제는 좌표 변환 없이 사용
      console.log(nx, ny);

      const params = {
        serviceKey: API_KEY,
        numOfRows: 10,
        pageNo: 1,
        dataType: 'JSON',
        base_date: baseDate,
        base_time: baseTime,
        nx,
        ny,
      };

      axios.get(url, { params })
        .then((response) => {
          console.log('API Response:', response.data);
          if (response.data.response && response.data.response.body) {
            const data = response.data.response.body.items.item;
            setWeatherData(data);

            // TMP 값을 오늘의 기온으로 설정
            const temperatureData = data.find((item) => item.category === 'TMP');
            if (temperatureData) {
              setTemperature(temperatureData.fcstValue);
            }

            // 임시로 어제의 기온을 1도 낮은 값으로 설정 (이 부분은 실제 어제 기온 데이터를 가져오는 로직으로 수정 필요)
            setYesterdayTemperature(temperatureData ? temperatureData.fcstValue - 1 : null);

          } else if (response.data.response.header.resultCode === '03') {
            setError('해당 시간대의 데이터가 없습니다.');
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

  useEffect(() => {
    const getYesterdayWeather = async () => {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
  
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1); // 어제 날짜 계산
  
      const year = yesterday.getFullYear();
      const month = String(yesterday.getMonth() + 1).padStart(2, '0');
      const day = String(yesterday.getDate()).padStart(2, '0');
      const baseDate = `${year}${month}${day}`;
      const baseTime = '0800'; // 어제 날짜에 적절한 시간으로 설정
  
      const nx = Math.round(location.lat); // 기상청 API 좌표
      const ny = Math.round(location.lon);
  
      const params = {
        serviceKey: API_KEY,
        numOfRows: 10,
        pageNo: 1,
        dataType: 'JSON',
        base_date: baseDate,
        base_time: baseTime,
        nx,
        ny,
      };
  
      try {
        const response = await axios.get(url, { params });
        if (response.data.response && response.data.response.body) {
          const data = response.data.response.body.items.item;
          const temperatureData = data.find((item) => item.category === 'TMP');
          if (temperatureData) {
            setYesterdayTemperature(temperatureData.fcstValue); // 어제 기온 설정
          }
        } else if (response.data.response.header.resultCode === '03') {
          setError('어제의 기온 데이터를 불러올 수 없습니다.');
        }
      } catch (error) {
        setError('어제의 기온 데이터를 불러오는 데 실패했습니다.');
      }
    };
  
    if (location.lat && location.lon) {
      getYesterdayWeather(); // 어제 기온 가져오기 실행
    }
  }, [location]);
  

  const getTemperatureComparison = () => {
    if (yesterdayTemperature !== null && temperature !== null) {
      const tempDifference = (temperature - yesterdayTemperature).toFixed(1);
  
      if (tempDifference > 0) {
        return (
          <p>
            어제보다 <span>{tempDifference}</span><span>°</span> <span>↑</span>
          </p>
        );
      } else if (tempDifference < 0) {
        return (
          <p>
            어제보다 <span>{Math.abs(tempDifference)}</span><span>°</span> <span>↓</span>
          </p>
        );
      } else {
        return <p>어제와 기온이 같아요</p>;
      }
    }
    return <p>기온 정보를 불러오는 중...</p>;
  };

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

      {/* 현재 위치 영역 */}
      <div className={styles.weatherLocation}>
        <img src="/icon/icon-location.png" alt="현재 위치" className={styles.icon} />
        <span>{address || '위치를 불러오는 중...'}</span> {/* 실제 주소 표시 */}
      </div>

      {/* 현재 위치에 따른 날씨 영역 */}
      <div className={styles.currentWeather}>
        <div className="weatherInfo">
          <div className="">
            {/* TMP 값이 있으면 표시하고, 없으면 대기 중 메시지 표시 */}
            <p>{temperature ? `${temperature}°` : '기온 정보를 불러오는 중...'}</p>
            {/* 어제와 비교한 기온 */}
            {getTemperatureComparison()}
            <p>구름 많음</p>
            <p>32° / 25°  체감온도 26°</p>
          </div>
        </div>

        <div className="weatherIcon">
          <img src="/icon/icon-location.png" alt="현재 위치" className={styles.iconWeather} />
        </div>
      </div>

      <div className={styles.etcWeather}>
        미세먼지
        초미세먼지
        자외선
        일출
      </div>

      <div className={styles.hourlyWeather}>
        오후10시..
      </div>
    </div>
  );
}

export default Weather;