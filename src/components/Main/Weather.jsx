// Weather.jsx
import styles from './Weather.module.scss';
import { useWeatherStore } from '@/stores';
import { getWeatherIcon, getWeatherIconSm } from '../../utils/weatherIcons';

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
    // loading,
  } = useWeatherStore();

  const formatTime = (time) => {
    const hourString = time.slice(0, 2);
    // const minuteString = time.slice(2, 4);

    let hour = parseInt(hourString, 10);
    // const minute = parseInt(minuteString, 10);

    // 24시간제를 12시간제로 변환
    const period = hour < 12 ? '오전' : '오후';
    const formattedHour = hour % 12 || 12;

    return { period, formattedHour };
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

      {/* Current weather section */}
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
                {temperature !== null ? (
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

      {/* Additional weather details */}
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

      {/* Hourly weather information */}
      <div className={styles.hourlyWeather}>
        <ul>
          {hourlyWeatherData &&
            hourlyWeatherData.map((item, index) => {
              const { period, formattedHour } = formatTime(item.time);

              return (
                <li key={index} className={styles.hourlyWeatherLi}>
                  <p>
                    {period}
                    <br />
                    {formattedHour}시
                  </p>
                  <img
                    src={getWeatherIconSm(item.weatherCondition).src}
                    alt={getWeatherIconSm(item.weatherCondition).alt}
                    className={styles.iconWeatherSm}
                  />
                  <p>
                    <b>{item.temperature ? `${item.temperature}°` : '정보 없음'}</b>
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default Weather;
