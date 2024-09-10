import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Weather.module.scss';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [address, setAddress] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [yesterdayTemperature, setYesterdayTemperature] = useState(null);
  const [skyCondition, setSkyCondition] = useState('');
  const [highTemp, setHighTemp] = useState(null);
  const [lowTemp, setLowTemp] = useState(null);
  const [feelsLikeTemp, setFeelsLikeTemp] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);  // 풍속 상태 추가


  const getPlainSkyCondition = (condition) => {
    // "(낮)", "(밤)"을 제거하는 정규식
    return condition.replace(/\(낮\)|\(밤\)/g, '');
  };

  const getBaseTime = () => {
    const now = new Date();
    const hour = now.getHours();
    let baseTime;

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

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setLocation({ lat, lon });
            console.log('현재 위치:', { lat, lon });

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
          const city = addressData.region_1depth_name;
          const district = addressData.region_2depth_name;
          const neighborhood = addressData.region_3depth_name;
    
          const formattedAddress = `${city} ${district} ${neighborhood}`;
          setAddress(formattedAddress);
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

  const convertToGrid = (lat, lon) => {
    const RE = 6371.00877; // 지구 반경 (km)
    const GRID = 5.0; // 격자 간격 (km)
    const SLAT1 = 30.0; // 투영 위도 1 (degree)
    const SLAT2 = 60.0; // 투영 위도 2 (degree)
    const OLON = 126.0; // 기준점 경도 (degree)
    const OLAT = 38.0; // 기준점 위도 (degree)
    const XO = 43; // 기준점 X좌표 (GRID)
    const YO = 136; // 기준점 Y좌표 (GRID)
  
    const DEGRAD = Math.PI / 180.0;
    const RADDEG = 180.0 / Math.PI;
  
    const re = RE / GRID;
    const slat1 = SLAT1 * DEGRAD;
    const slat2 = SLAT2 * DEGRAD;
    const olon = OLON * DEGRAD;
    const olat = OLAT * DEGRAD;
  
    let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
    let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = (re * sf) / Math.pow(ro, sn);
    let ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
    ra = (re * sf) / Math.pow(ra, sn);
    let theta = lon * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;
  
    const x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    const y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
  
    return { nx: x, ny: y };
  };

  const getWeatherCondition = (skyValue, ptyValue, lgtValue, isDayTime) => {
    let weatherCondition = '';
  
    if (lgtValue === 1) {
      weatherCondition = '천둥번개';
    } else if (ptyValue === 1) {
      weatherCondition = '비';
    } else if (ptyValue === 2) {
      weatherCondition = '비 또는 눈';
    } else if (ptyValue === 3) {
      weatherCondition = '눈';
    } else if (ptyValue === 4) {
      weatherCondition = '소나기';
    } else if (skyValue === 1) {
      weatherCondition = isDayTime ? '맑음(낮)' : '맑음(밤)';
    } else if (skyValue === 3) {
      weatherCondition = isDayTime ? '구름조금(낮)' : '구름조금(밤)';
    } else if (skyValue === 4) {
      weatherCondition = isDayTime ? '구름많음(낮)' : '구름많음(밤)';
    } else if (skyValue === 5) {
      weatherCondition = '흐림';
    }
  
    return weatherCondition;
  };

  const calculateFeelsLikeTemp = (T, V) => {
    if (T !== null && V !== null) {
      const feelsLike = (
        13.12 +
        0.6215 * T -
        11.37 * Math.pow(V, 0.16) +
        0.3965 * T * Math.pow(V, 0.16)
      ).toFixed(1);
      return feelsLike;
    }
    return null;
  };

  useEffect(() => {
    if (location.lat && location.lon) {
      const fetchWeatherData = async () => {
        try {
          const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
          const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';

          const today = new Date();
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);

          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const day = String(today.getDate()).padStart(2, '0');
          const baseDate = `${year}${month}${day}`;

          const yYear = yesterday.getFullYear();
          const yMonth = String(yesterday.getMonth() + 1).padStart(2, '0');
          const yDay = String(yesterday.getDate()).padStart(2, '0');
          const yesterdayBaseDate = `${yYear}${yMonth}${yDay}`;

          const baseTime = getBaseTime();
          const currentHour = today.getHours();
          const isDayTime = currentHour >= 6 && currentHour < 18;
          const { nx, ny } = convertToGrid(location.lat, location.lon);

          const params = {
            serviceKey: API_KEY,
            numOfRows: 1000,
            pageNo: 1,
            dataType: 'JSON',
            base_date: baseDate,
            base_time: baseTime,
            nx,
            ny,
          };

          const yesterdayParams = {
            ...params,
            base_date: yesterdayBaseDate,
          };

          // 현재 날씨 데이터 가져오기
          const weatherResponse = await axios.get(url, { params });
          if (weatherResponse.data.response?.body?.items?.item) {
            const data = weatherResponse.data.response.body.items.item;
            const temperatureData = data.find((item) => item.category === 'TMP');
            const highTempData = data.find((item) => item.category === 'TMX');
            const lowTempData = data.find((item) => item.category === 'TMN');
            const windSpeedData = data.find((item) => item.category === 'WSD'); // 풍속 데이터
            const skyData = data.find((item) => item.category === 'SKY');
            const ptyData = data.find((item) => item.category === 'PTY');
            const lgtData = data.find((item) => item.category === 'LGT');

            if (temperatureData) setTemperature(temperatureData.fcstValue);
            if (highTempData) setHighTemp(highTempData.fcstValue);
            if (lowTempData) setLowTemp(lowTempData.fcstValue);
            if (windSpeedData) setWindSpeed(windSpeedData.fcstValue);

            // 날씨 상태 설정
            if (skyData && ptyData) {
              const weatherCondition = getWeatherCondition(
                Number(skyData.fcstValue),
                Number(ptyData.fcstValue),
                lgtData ? Number(lgtData.fcstValue) : 0,
                isDayTime
              );
              setSkyCondition(weatherCondition);
            }

            // 체감온도 계산
            if (temperatureData && windSpeedData) {
              const feelsLike = calculateFeelsLikeTemp(
                parseFloat(temperatureData.fcstValue),
                parseFloat(windSpeedData.fcstValue)
              );
              setFeelsLikeTemp(feelsLike);
            }
          }

          // 어제 기온 데이터 가져오기
          const yesterdayResponse = await axios.get(url, { params: yesterdayParams });
          if (yesterdayResponse.data.response?.body?.items?.item) {
            const yesterdayData = yesterdayResponse.data.response.body.items.item;
            const yesterdayTemperatureData = yesterdayData.find((item) => item.category === 'TMP');
            if (yesterdayTemperatureData) setYesterdayTemperature(yesterdayTemperatureData.fcstValue);
          }
        } catch (error) {
          setError('날씨 데이터를 불러오는 데 실패했습니다.');
          console.error(error);
        }
      };

      fetchWeatherData();
    }
  }, [location]);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case '맑음(낮)':
        return { src: '/icon/icon-lg-clear-day.png', alt: '맑음(낮)' };
      case '맑음(밤)':
        return { src: '/icon/icon-lg-clear-night.png', alt: '맑음(밤)' };
      case '구름조금(낮)':
        return { src: '/icon/icon-lg-few-clouds-day.png', alt: '구름조금(낮)' };
      case '구름조금(밤)':
        return { src: '/icon/icon-lg-few-clouds-night.png', alt: '구름조금(밤)' };
      case '구름많음(낮)':
        return { src: '/icon/icon-lg-mostly-cloudy-day.png', alt: '구름많음(낮)' };
      case '구름많음(밤)':
        return { src: '/icon/icon-lg-mostly-cloudy-night.png', alt: '구름많음(밤)' };
      case '흐림':
        return { src: '/icon/icon-lg-overcast.png', alt: '흐림' };
      case '비':
        return { src: '/icon/icon-lg-rain.png', alt: '비' };
      case '비 또는 눈':
        return { src: '/icon/icon-lg-rain-or-snow.png', alt: '비 또는 눈' };
      case '눈':
        return { src: '/icon/icon-lg-snow.png', alt: '눈' };
      case '소나기':
        return { src: '/icon/icon-lg-shower.png', alt: '소나기' };
      case '천둥번개':
        return { src: '/icon/icon-lg-thunderstorm.png', alt: '천둥번개' };
      default:
        return { src: '/icon/icon-lg-default.png', alt: '날씨 정보 없음' };
    }
  };

  const getTemperatureComparison = () => {
    if (yesterdayTemperature !== null && temperature !== null) {
      const tempDifference = (temperature - yesterdayTemperature).toFixed(1);
  
      if (tempDifference > 0) {
        return (
          <p>
            어제보다 <span>{tempDifference}</span><span>°</span> <span>높아요</span>
          </p>
        );
      } else if (tempDifference < 0) {
        return (
          <p>
            어제보다 <span>{Math.abs(tempDifference)}</span><span>°</span> <span>낮아요</span>
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
      <h2 className={styles.a11yHidden}>현재 날씨</h2>

      {/* 현재 위치에 따른 날씨 영역 */}
      <div className={styles.currentWeather}>
        <div className={styles.weatherInfo}>

          <div className={styles.weatherLocation}>
            <img src="/icon/icon-location.png" alt="현재 위치" className={styles.icon} />
            <span>{address || '위치를 불러오는 중...'}</span> {/* 실제 주소 표시 */}
          </div>

          <div className={styles.weatherDetail}>
            <div>
              {/* TMP 값이 있으면 표시하고, 없으면 대기 중 메시지 표시 */}
              <p className={styles.nowTMP}>{temperature ? `${temperature}°` : '기온 정보를 불러오는 중...'}</p>
              {/* 어제와 비교한 기온 */}
              {getTemperatureComparison()}
            </div>
          </div>
        </div>

        <div className="weatherIcon">
          <img 
            src={getWeatherIcon(skyCondition).src} 
            alt={getWeatherIcon(skyCondition).alt} 
            className={styles.iconWeatherLg} 
          />
        </div>
      </div>
      <div>
        {/* 낮/밤 구분 없는 날씨 상태 출력 */}
        <p className={styles.nowWeather}>{getPlainSkyCondition(skyCondition) || '날씨 정보를 불러오는 중...'}</p>
    
        <p className={styles.nowWeather}>
          <span>{highTemp !== null ? `${highTemp}°` : '정보 없음'}</span> / <span>{lowTemp !== null ? `${lowTemp}°` : '정보 없음'}</span>  <span className={styles.nowWeatherSpan}>체감온도</span> <span>{feelsLikeTemp !== null ? `${feelsLikeTemp}°` : '정보 없음'}</span>
        </p>
      </div>

      <div className={styles.hourlyWeather}>
        <ul>
          <li>
            <p>오후 5시</p>
            <img src="/icon/icon-sm-clear-day.png" alt="맑음(낮)" className={styles.iconWeatherSm}  />
            <p>30°</p>
          </li>
          <li>
            <p>오후 6시</p>
            <img src="/icon/icon-sm-clear-night.png" alt="맑음(밤)" className={styles.iconWeatherSm}  />
            <p>29°</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Weather;
