import { useState, useEffect } from 'react';
import styles from './Weather.module.scss';
import { useWeatherStore } from '../../stores/weatherStore';
import { getWeatherIcon, getWeatherIconSm } from '../../utils/weatherIcons'; // 아이콘 유틸리티 함수 import

function Weather() {
  const {
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
    setLoading, // 로딩상태 설정함수 추가
    // loading,
  } = useWeatherStore();

  useEffect(() => {
    // 다시 fetching 하는 것을 막기 위한 코드
    if (temperature !== null && hourlyWeatherData.length > 0 && yesterdayTemperature !== null) {
      setLoading(false);
      return;
    }
    const getLocation = () => {
      setLoading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setLocation({ lat, lon });

            try {
              await getAddress(lat, lon);
              await fetchWeatherData(lat, lon);
              await fetchYesterdayWeatherData(lat, lon);
              await fetchHourlyWeatherData(lat, lon);

              setLoading(false);
            } catch (error) {
              console.error('Error fetching weather data:', error);
              setError('데이터를 불러오는 데 실패했습니다.');
              setLoading(false);
            }
          },
          (err) => {
            console.error('위치 가져오기 오류:', err);
            setError('위치를 가져오는 데 실패했습니다.');
            setLoading(false);
            alert('위치 정보를 받아오는 데 실패했습니다. 위치 접근 권한을 확인해주세요.');
          }
        );
      } else {
        setError('Geolocation은 이 브라우저에서 지원되지 않습니다.');
        setLoading(false);
        alert('Geolocation은 이 브라우저에서 지원되지 않습니다.');
      }
    };

    getLocation();
  }, []);

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
            어제보다 <span>{tempDifference}</span>
            <span>°</span> <span>높아요</span>
          </p>
        );
      } else if (tempDifference < 0) {
        return (
          <p>
            어제보다 <span>{Math.abs(tempDifference)}</span>
            <span>°</span> <span>낮아요</span>
          </p>
        );
      } else {
        return <p>어제와 기온이 같아요</p>;
      }
    }
    return (
      <p>
        <img
          src="/icon/loading2.png"
          alt="기온 정보를 불러오는 중..."
          className={styles.iconLoading}
        />
      </p>
    );
  };

  return (
    <div className={`${styles.weatherWrap} ${styles.sectionArea}`}>
      <h2 className={styles.a11yHidden}>현재 날씨</h2>

      {/* 현재 위치에 따른 날씨 영역 */}
      <div className={styles.currentWeather}>
        <div className={styles.weatherInfo}>
          <div className={styles.weatherLocation}>
            <img src="/icon/icon-location.png" alt="현재 위치" className={styles.icon} />
            <span>
              {address || (
                <img
                  src="/icon/loading2.png"
                  alt="위치를 불러오는 중..."
                  className={styles.iconLoading}
                />
              )}
            </span>
          </div>

          <div className={styles.weatherDetail}>
            <div>
              <p className={styles.nowTMP}>
                {temperature ? (
                  `${temperature}°`
                ) : (
                  <img
                    src="/icon/loading2.png"
                    alt="기온 정보를 불러오는 중..."
                    className={styles.iconLoading}
                  />
                )}
              </p>
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
        <p className={styles.nowWeather}>
          {getPlainSkyCondition(skyCondition) || (
            <img
              src="/icon/loading2.png"
              alt="날씨 정보를 불러오는 중..."
              className={styles.iconLoading}
            />
          )}
        </p>
        <p className={styles.nowWeather}>
          <span>
            {highTemp !== null ? (
              `${highTemp}°`
            ) : (
              <img
                src="/icon/loading2.png"
                alt="정보를 불러오는 중..."
                className={styles.iconLoading}
              />
            )}
          </span>{' '}
          /{' '}
          <span>
            {lowTemp !== null ? (
              `${lowTemp}°`
            ) : (
              <img
                src="/icon/loading2.png"
                alt="정보를 불러오는 중..."
                className={styles.iconLoading}
              />
            )}
          </span>
          <span className={styles.nowWeatherSpan}>체감온도</span>{' '}
          <span>
            {feelsLikeTemp !== null ? (
              `${feelsLikeTemp}°`
            ) : (
              <img
                src="/icon/loading2.png"
                alt="정보를 불러오는 중..."
                className={styles.iconLoading}
              />
            )}
          </span>
        </p>
      </div>

      {/* 시간대별 날씨 정보 */}
      <div className={styles.hourlyWeather}>
        <ul>
          {hourlyWeatherData &&
            hourlyWeatherData.map((item, index) => (
              <li key={index} className={styles.hourlyWeatherLi}>
                <p dangerouslySetInnerHTML={{ __html: formatTime(item.time) }}></p>
                <img
                  src={getWeatherIconSm(item.weatherCondition).src}
                  alt={getWeatherIconSm(item.weatherCondition).alt}
                  className={styles.iconWeatherSm}
                />
                <p>
                  <b>{item.temperature ? `${item.temperature}°` : '정보 없음'}</b>
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Weather;
