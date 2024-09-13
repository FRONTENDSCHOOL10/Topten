import React, { useEffect } from 'react';

import styles from './Weather.module.scss';
import { useWeatherStore } from '../../stores/weatherStore';

function Weather() {
  const {
    location,
    address,
    temperature,
    yesterdayTemperature,
    skyCondition,
    highTemp,
    lowTemp,
    feelsLikeTemp,
    hourlyWeatherData,
    setLocation,
    fetchWeatherData,
    fetchYesterdayWeatherData,
    fetchHourlyWeatherData,
    getAddress,
    setError,
  } = useWeatherStore();

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setLocation({ lat, lon });
            getAddress(lat, lon);
            fetchWeatherData(lat, lon);
            fetchYesterdayWeatherData(lat, lon);
            fetchHourlyWeatherData(lat, lon);
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
  }, [setLocation, getAddress, fetchWeatherData, fetchYesterdayWeatherData, fetchHourlyWeatherData, setError]);

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

  const getWeatherIconSm = (condition) => {
    switch (condition) {
      case '맑음(낮)':
        return { src: '/icon/icon-sm-clear-day.png', alt: '맑음(낮)' };
      case '맑음(밤)':
        return { src: '/icon/icon-sm-clear-night.png', alt: '맑음(밤)' };
      case '구름조금(낮)':
        return { src: '/icon/icon-sm-cloud-little-day.png', alt: '구름조금(낮)' };
      case '구름조금(밤)':
        return { src: '/icon/icon-sm-cloud-little-night.png', alt: '구름조금(밤)' };
      case '구름많음(낮)':
        return { src: '/icon/icon-sm-cloud-lot-day.png', alt: '구름많음(낮)' };
      case '구름많음(밤)':
        return { src: '/icon/icon-sm-cloud-lot-night.png', alt: '구름많음(밤)' };
      case '흐림':
        return { src: '/icon/icon-sm-cloudy.png', alt: '흐림' };
      case '비':
        return { src: '/icon/icon-sm-rainy.png', alt: '비' };
      case '비 또는 눈':
        return { src: '/icon/icon-sm-rain_or_snow.png', alt: '비 또는 눈' };
      case '눈':
        return { src: '/icon/icon-sm-snow.png', alt: '눈' };
      case '소나기':
        return { src: '/icon/icon-sm-shower.png', alt: '소나기' };
      default:
        return { src: '/icon/icon-sm-default.png', alt: '날씨 정보 없음' };
    }
  };

  const formatTime = (time) => {
    const hour = parseInt(time.slice(0, 2), 10);
    const period = hour < 12 ? '오전' : '오후';
    const formattedHour = hour % 12 || 12;
    return `${period}<br/>${formattedHour}시`;
  };

  const getPlainSkyCondition = (condition) => {
    return condition.replace(/\(낮\)|\(밤\)/g, '');
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
    return <p><img src="/icon/loading2.png" alt="기온 정보를 불러오는 중..." className={styles.iconLoading} /></p>;
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
                src={getWeatherIconSm(item.weatherCondition).src}
                alt={getWeatherIconSm(item.weatherCondition).alt}
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
