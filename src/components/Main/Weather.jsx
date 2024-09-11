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
    return condition.replace(/\(낮\)|\(밤\)/g, '');
  };

  const getBaseTime = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 2 && hour < 5) return '0200';
    else if (hour >= 5 && hour < 8) return '0500';
    else if (hour >= 8 && hour < 11) return '0800';
    else if (hour >= 11 && hour < 14) return '1100';
    else if (hour >= 14 && hour < 17) return '1400';
    else if (hour >= 17 && hour < 20) return '1700';
    else if (hour >= 20 && hour < 23) return '2000';
    else return '2300';
  };


  // 시간을 오전/오후 12시간제로 변환하는 함수
  const formatTime = (time) => {
    const hour = parseInt(time.slice(0, 2), 10);
    const period = hour < 12 ? '오전' : '오후';
    const formattedHour = hour % 12 || 12; // 0시일 때 12시로 표기
    return `${period}<br/>${formattedHour}시`;
  };

  const getYesterdayBaseTime = () => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const hour = now.getHours();
    return {
      baseDate: `${yesterday.getFullYear()}${String(yesterday.getMonth() + 1).padStart(2, '0')}${String(yesterday.getDate()).padStart(2, '0')}`,
      baseTime: getBaseTime(),
    };
  };

  const getWeatherCondition = (skyValue, ptyValue, isDayTime) => {
    let weatherCondition = '';
    if (ptyValue === 1) weatherCondition = '비';
    else if (ptyValue === 2) weatherCondition = '비 또는 눈';
    else if (ptyValue === 3) weatherCondition = '눈';
    else if (ptyValue === 4) weatherCondition = '소나기';
    else if (skyValue === 1) weatherCondition = isDayTime ? '맑음(낮)' : '맑음(밤)';
    else if (skyValue === 3) weatherCondition = isDayTime ? '구름조금(낮)' : '구름조금(밤)';
    else if (skyValue === 4) weatherCondition = isDayTime ? '구름많음(낮)' : '구름많음(밤)';
    else if (skyValue === 5) weatherCondition = '흐림';
    return weatherCondition;
  };

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
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setLocation({ lat, lon });
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

    getLocation();
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      const fetchWeatherData = async () => {
        try {
          const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
          const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
  
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const day = String(today.getDate()).padStart(2, '0');
          const baseDate = `${year}${month}${day}`;
          const baseTime = getBaseTime();
          const { nx, ny } = convertToGrid(location.lat, location.lon);
  
          console.log('Fetching weather data for:', { nx, ny });
  
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
  
          const response = await axios.get(url, { params });
  
          if (response.data.response?.body?.items?.item) {
            const data = response.data.response.body.items.item;
  
            console.log('API Response Data:', data);
  
            const hourlyWeatherData = [];
            data.forEach((item) => {
              const time = item.fcstTime;
              const category = item.category;
              const value = item.fcstValue;
              
              // 시간별로 온도 및 날씨 상태를 확인
              if (category === 'TMP') {
                hourlyWeatherData.push({
                  time,
                  temperature: value,
                  weatherCondition: skyCondition,
                });
              }


            });
            setWeatherData(hourlyWeatherData);
  
            const temperatureData = data.find((item) => item.category === 'TMP');
            const highTempData = data.find((item) => item.category === 'TMX');
            const lowTempData = data.find((item) => item.category === 'TMN');
            const windSpeedData = data.find((item) => item.category === 'WSD'); // 풍속 데이터
            const skyData = data.find((item) => item.category === 'SKY');
            const ptyData = data.find((item) => item.category === 'PTY');
            const lgtData = data.find((item) => item.category === 'LGT');
  
            if (temperatureData) {
              setTemperature(temperatureData.fcstValue);
              console.log('Temperature:', temperatureData.fcstValue);
            }
  
            if (highTempData) {
              setHighTemp(highTempData.fcstValue);
              console.log('High Temp:', highTempData.fcstValue);
            }
  
            if (lowTempData) {
              setLowTemp(lowTempData.fcstValue);
              console.log('Low Temp:', lowTempData.fcstValue);
            }
  
            if (windSpeedData) {
              setWindSpeed(windSpeedData.fcstValue);
              console.log('Wind Speed:', windSpeedData.fcstValue);
            }
  
            if (skyData && ptyData) {
              const weatherCondition = getWeatherCondition(
                Number(skyData.fcstValue),
                Number(ptyData.fcstValue),
                today.getHours() >= 6 && today.getHours() < 18
              );
              setSkyCondition(weatherCondition);
              console.log('Sky Condition:', weatherCondition);
            }
  
            if (temperatureData && windSpeedData) {
              const feelsLike = calculateFeelsLikeTemp(
                parseFloat(temperatureData.fcstValue),
                parseFloat(windSpeedData.fcstValue)
              );
              setFeelsLikeTemp(feelsLike);
              console.log('Feels Like Temperature:', feelsLike);
            }

            // 어제의 날씨 데이터를 가져오는 API 호출
            const { baseDate: yesterdayBaseDate, baseTime: yesterdayBaseTime } = getYesterdayBaseTime();
            const yesterdayParams = {
              serviceKey: API_KEY,
              numOfRows: 1000,
              pageNo: 1,
              dataType: 'JSON',
              base_date: yesterdayBaseDate,
              base_time: yesterdayBaseTime,
              nx,
              ny,
            };
            const yesterdayResponse = await axios.get(url, { params: yesterdayParams });
            const yesterdayData = yesterdayResponse.data.response.body.items.item;
            const yesterdayTempData = yesterdayData.find((item) => item.category === 'TMP');
            if (yesterdayTempData) {
              setYesterdayTemperature(yesterdayTempData.fcstValue);
              console.log('Yesterday Temperature:', yesterdayTempData.fcstValue);
            }
          } else {
            setError('날씨 데이터를 불러오는 데 실패했습니다.');
          }
        } catch (error) {
          console.error('API 요청 실패:', error);
          setError('API 요청 실패');
        }
      };
  
      fetchWeatherData();
    }
  }, [location]);

  const getWeatherIcon = (condition) => {
    if (!condition) {
      return { src: '/icon/icon-lg-default.png', alt: '날씨 정보 없음' };
    }

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
      case '천둥번개':
        return { src: '/icon/icon-lg-thunder.png', alt: '천둥번개' };
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
    return <p><img src="/icon/loading2.png" alt="기온 정보를 불러오는 중..." className={styles.iconLoading}/></p>;
  };

  return (
    <div className={`${styles.weatherWrap} ${styles.sectionArea}`}>
      <h2 className={styles.a11yHidden}>현재 날씨</h2>

      {/* 현재 위치에 따른 날씨 영역 */}
      <div className={styles.currentWeather}>
        <div className={styles.weatherInfo}>
          <div className={styles.weatherLocation}>
            <img src="/icon/icon-location.png" alt="현재 위치" className={styles.icon} />
            <span>{address || <img src="/icon/loading2.png" alt="위치를 불러오는 중..." className={styles.iconLoading}/>}</span>
          </div>

          <div className={styles.weatherDetail}>
            <div>
              <p className={styles.nowTMP}>{temperature ? `${temperature}°` : <img src="/icon/loading2.png" alt="기온 정보를 불러오는 중..." className={styles.iconLoading}/>}</p>
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
        <p className={styles.nowWeather}>{getPlainSkyCondition(skyCondition) || <img src="/icon/loading2.png" alt="날씨 정보를 불러오는 중..." className={styles.iconLoading}/>}</p>
        <p className={styles.nowWeather}>
          <span>{highTemp !== null ? `${highTemp}°` : <img src="/icon/loading2.png" alt="정보를 불러오는 중..." className={styles.iconLoading}/>}</span> / <span>{lowTemp !== null ? `${lowTemp}°` : <img src="/icon/loading2.png" alt="정보를 불러오는 중..." className={styles.iconLoading}/>}</span>
          <span className={styles.nowWeatherSpan}>체감온도</span> <span>{feelsLikeTemp !== null ? `${feelsLikeTemp}°` : <img src="/icon/loading2.png" alt="정보를 불러오는 중..." className={styles.iconLoading}/>}</span>
        </p>
      </div>

      {/* 시간대별 날씨 정보 */}
      <div className={styles.hourlyWeather}>
        <ul>
          {weatherData && weatherData.map((item, index) => (
            <li key={index} className={styles.hourlyWeatherLi}>
              <p dangerouslySetInnerHTML={{ __html: formatTime(item.time) }}></p> {/* 시간 변환 */}
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
