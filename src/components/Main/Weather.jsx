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
  const [windSpeed, setWindSpeed] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState([]);

  // 현재 위치 정보와 날씨 데이터를 디버깅용으로 출력
  useEffect(() => {
    console.log('Location:', location);
    console.log('Temperature:', temperature);
    console.log('Sky Condition:', skyCondition);
    console.log('Feels Like Temperature:', feelsLikeTemp);
    console.log('Address:', address);
  }, [location, temperature, skyCondition, feelsLikeTemp, address]);

  // 좌표를 기상청 격자 좌표로 변환하는 함수
  const convertToGrid = (lat, lon) => {
    const RE = 6371.00877;
    const GRID = 5.0;
    const SLAT1 = 30.0;
    const SLAT2 = 60.0;
    const OLON = 126.0;
    const OLAT = 38.0;
    const XO = 43;
    const YO = 136;

    const DEGRAD = Math.PI / 180.0;
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

  // 위치 정보를 받아오는 함수
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setLocation({ lat, lon });
            getAddress(lat, lon); // 위치 정보를 이용하여 주소를 받아옴
            fetchWeatherData(lat, lon); // 오늘의 날씨 데이터를 받아옴
            fetchYesterdayWeatherData(lat, lon); // 어제의 날씨 데이터를 받아옴
            fetchHourlyWeatherData(lat, lon); // 24시간 날씨 데이터를 받아옴
          },
          (err) => {
            console.error('위치 가져오기 오류:', err);
            setError('위치를 가져오는 데 실패했습니다.');
            alert('위치 정보를 받아오는 데 실패했습니다. 위치 접근 권한을 확인해주세요.');
          }
        );
      } else {
        setError('Geolocation은 이 브라우저에서 지원되지 않습니다.');
        alert('Geolocation은 이 브라우저에서 지원되지 않습니다.');
      }
    };

    getLocation();
  }, []);

  // 위치를 이용해 주소 정보를 받아오는 함수
  const getAddress = async (lat, lon) => {
    const API_KEY = import.meta.env.VITE_KAKAO_API_KEY; // 카카오 API 키
    const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`;
    const headers = { Authorization: `KakaoAK ${API_KEY}` };

    try {
      const response = await axios.get(url, { headers });
      if (response.data.documents && response.data.documents.length > 0) {
        const addressData = response.data.documents[0].address;
        const formattedAddress = `${addressData.region_1depth_name} ${addressData.region_2depth_name} ${addressData.region_3depth_name}`;
        setAddress(formattedAddress);
      } else {
        setError('주소 정보를 불러오는 데 실패했습니다.');
      }
    } catch (err) {
      console.error('Reverse Geocoding 오류:', err);
      setError('주소 정보를 불러오는 데 실패했습니다.');
    }
  };

  // 오늘의 날씨 데이터를 받아오는 함수 (초단기예보 API)
  const fetchWeatherData = async (lat, lon) => {
    const { nx, ny } = convertToGrid(lat, lon); // 좌표 변환
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; // 기상청 초단기예보 API URL

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const baseDate = `${year}${month}${day}`;
    const baseTime = '0500'; // 기상청 초단기예보 기준 시간

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

    try {
      const response = await axios.get(url, { params });
      console.log('Weather API Response:', response.data); // 응답 데이터 확인
      if (response.data.response?.body?.items?.item) {
        const data = response.data.response.body.items.item;

        const temperatureData = data.find((item) => item.category === 'TMP');
        const windSpeedData = data.find((item) => item.category === 'WSD');
        const skyData = data.find((item) => item.category === 'SKY');
        const ptyData = data.find((item) => item.category === 'PTY');
        const highTempData = data.find((item) => item.category === 'TMX');
        const lowTempData = data.find((item) => item.category === 'TMN');

        if (temperatureData) setTemperature(temperatureData.fcstValue);
        if (windSpeedData) {
          setWindSpeed(windSpeedData.fcstValue);
          const feelsLike = calculateFeelsLikeTemp(temperatureData.fcstValue, windSpeedData.fcstValue);
          setFeelsLikeTemp(feelsLike);
        }
        if (skyData && ptyData) {
          setSkyCondition(getWeatherCondition(skyData.fcstValue, ptyData.fcstValue));
        }
        if (highTempData) setHighTemp(highTempData.fcstValue);
        if (lowTempData) setLowTemp(lowTempData.fcstValue);
      } else {
        setError('날씨 데이터를 불러오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('Weather API Error:', error);
      setError('날씨 데이터를 불러오는 데 실패했습니다.');
    }
  };

  // 어제의 날씨 데이터를 받아오는 함수 (단기예보 API)
  const fetchYesterdayWeatherData = async (lat, lon) => {
    const { nx, ny } = convertToGrid(lat, lon);
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; // 기상청 단기예보 API URL

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');
    const baseDate = `${year}${month}${day}`;
    const baseTime = '0500';

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

    try {
      const response = await axios.get(url, { params });
      console.log('Yesterday Weather API Response:', response.data);
      if (response.data.response?.body?.items?.item) {
        const data = response.data.response.body.items.item;
        const temperatureData = data.find((item) => item.category === 'TMP');

        if (temperatureData) setYesterdayTemperature(temperatureData.fcstValue);
      } else {
        setError('어제의 날씨 데이터를 불러오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('Yesterday Weather API Error:', error);
      setError('어제의 날씨 데이터를 불러오는 데 실패했습니다.');
    }
  };

  // 24시간 날씨 데이터를 받아오는 함수 (단기예보 API)
  const fetchHourlyWeatherData = async (lat, lon) => {
    const { nx, ny } = convertToGrid(lat, lon);
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
  
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const baseDate = `${year}${month}${day}`;
    const baseTime = '0500';
  
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
  
    try {
      const response = await axios.get(url, { params });
      if (response.data.response?.body?.items?.item) {
        const data = response.data.response.body.items.item;
        const hourlyData = [];
  
        const currentHour = new Date().getHours();
        const filteredData = data.filter(
          (item) =>
            (item.category === 'TMP' || item.category === 'SKY' || item.category === 'PTY') &&
            (parseInt(item.fcstTime, 10) > currentHour || item.fcstDate > baseDate)
        );
  
        // 시간대별 데이터 구성
        for (let i = 0; i < filteredData.length && hourlyData.length < 24; i += 3) {
          const tempData = filteredData.find((item) => item.category === 'TMP' && item.fcstTime === filteredData[i].fcstTime);
          const skyData = filteredData.find((item) => item.category === 'SKY' && item.fcstTime === filteredData[i].fcstTime);
          const ptyData = filteredData.find((item) => item.category === 'PTY' && item.fcstTime === filteredData[i].fcstTime);
          const isDayTime = parseInt(tempData.fcstTime, 10) >= 600 && parseInt(tempData.fcstTime, 10) < 1800;
  
          hourlyData.push({
            time: tempData.fcstTime,
            temperature: tempData.fcstValue,
            weatherCondition: getWeatherCondition(skyData?.fcstValue, ptyData?.fcstValue, isDayTime),
          });
        }
  
        setHourlyWeatherData(hourlyData);
      }
    } catch (error) {
      console.error('Hourly Weather API Error:', error);
      setError('시간별 날씨 데이터를 불러오는 데 실패했습니다.');
    }
  };

  // 체감온도를 계산하는 함수
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

  // 하늘 상태 텍스트를 반환하는 함수
  const getPlainSkyCondition = (condition) => {
    return condition.replace(/\(낮\)|\(밤\)/g, '');
  };

  // 시간 포맷을 변경하는 함수
  const formatTime = (time) => {
    const hour = parseInt(time.slice(0, 2), 10);
    const period = hour < 12 ? '오전' : '오후';
    const formattedHour = hour % 12 || 12; // 0시일 때 12시로 표기
    return `${period}<br/>${formattedHour}시`;
  };

  // 날씨 상태를 반환하는 함수
  const getWeatherCondition = (skyValue, ptyValue, isDayTime) => {
    if (ptyValue === '1') return '비';
    if (ptyValue === '2') return '비 또는 눈';
    if (ptyValue === '3') return '눈';
    if (ptyValue === '4') return '소나기';

    if (skyValue === '1') return isDayTime ? '맑음(낮)' : '맑음(밤)';
    if (skyValue === '3') return isDayTime ? '구름조금(낮)' : '구름조금(밤)';
    if (skyValue === '4') return isDayTime ? '구름많음(낮)' : '구름많음(밤)';

    return '흐림';
  };

  // 어제와 비교된 기온 출력 함수
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
    return <p><img src="/icon/loading2.png" alt="기온 정보를 불러오는 중..." className={styles.iconLoading} /></p>;
  };

  // 날씨 아이콘을 반환하는 함수
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case '맑음(낮)':
        return { src: '/icon/icon-lg-clear-day.png', alt: '맑음(낮)' };
      case '맑음(밤)':
        return { src: '/icon/icon-lg-clear-night.png', alt: '맑음(밤)' };
      case '구름조금(낮)':
        return { src: '/icon/icon-lg-cloud-little-day.png', alt: '구름조금(낮)' };
      case '구름조금(밤)':
        return { src: '/icon/icon-lg-cloud-little-night.png', alt: '구름조금(밤)' };
      case '구름많음(낮)':
        return { src: '/icon/icon-lg-cloud-lot-day.png', alt: '구름많음(낮)' };
      case '구름많음(밤)':
        return { src: '/icon/icon-lg-cloud-lot-night.png', alt: '구름많음(밤)' };
      case '흐림':
        return { src: '/icon/icon-lg-cloudy.png', alt: '흐림' };
      case '비':
        return { src: '/icon/icon-lg-rainy.png', alt: '비' };
      case '비 또는 눈':
        return { src: '/icon/icon-lg-rain_or_snow.png', alt: '비 또는 눈' };
      case '눈':
        return { src: '/icon/icon-lg-snow.png', alt: '눈' };
      case '소나기':
        return { src: '/icon/icon-lg-shower.png', alt: '소나기' };
      default:
        return { src: '/icon/icon-lg-default.png', alt: '날씨 정보 없음' };
    }
  };

  return (
    <div className={`${styles.weatherWrap} ${styles.sectionArea}`}>
      <h2 className={styles.a11yHidden}>현재 날씨</h2>

      {/* 현재 위치에 따른 날씨 영역 */}
      <div className={styles.currentWeather}>
        <div className={styles.weatherInfo}>
          <div className={styles.weatherLocation}>
            <img src="/icon/icon-location.png" alt="현재 위치" className={styles.icon} />
            <span>{address || <img src="/icon/loading2.png" alt="위치를 불러오는 중..." className={styles.iconLoading} />}</span>
          </div>

          <div className={styles.weatherDetail}>
            <div>
              <p className={styles.nowTMP}>{temperature ? `${temperature}°` : <img src="/icon/loading2.png" alt="기온 정보를 불러오는 중..." className={styles.iconLoading} />}</p>
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
        <p className={styles.nowWeather}>{getPlainSkyCondition(skyCondition) || <img src="/icon/loading2.png" alt="날씨 정보를 불러오는 중..." className={styles.iconLoading} />}</p>
        <p className={styles.nowWeather}>
          <span>{highTemp !== null ? `${highTemp}°` : <img src="/icon/loading2.png" alt="정보를 불러오는 중..." className={styles.iconLoading} />}</span> / <span>{lowTemp !== null ? `${lowTemp}°` : <img src="/icon/loading2.png" alt="정보를 불러오는 중..." className={styles.iconLoading} />}</span>
          <span className={styles.nowWeatherSpan}>체감온도</span> <span>{feelsLikeTemp !== null ? `${feelsLikeTemp}°` : <img src="/icon/loading2.png" alt="정보를 불러오는 중..." className={styles.iconLoading} />}</span>
        </p>
      </div>

      {/* 시간대별 날씨 정보 */}
      <div className={styles.hourlyWeather}>
        <ul>
          {hourlyWeatherData && hourlyWeatherData.map((item, index) => (
            <li key={index} className={styles.hourlyWeatherLi}>
              <p dangerouslySetInnerHTML={{ __html: formatTime(item.time) }}></p>
              <img
                src={getWeatherIcon(item.weatherCondition).src}
                alt={getWeatherIcon(item.weatherCondition).alt}
                className={styles.iconWeatherSm}
              />
              <p><b>{item.temperature ? `${item.temperature}°` : '정보 없음'}</b></p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Weather;
