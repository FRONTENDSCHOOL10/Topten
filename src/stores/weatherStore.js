import { create } from 'zustand';
import axios from 'axios';
import {
  fetchWeatherDataFromAPI,
  fetchYesterdayWeatherDataFromAPI,
  fetchHourlyWeatherDataFromAPI,
  fetchCurrentTemperatureFromAPI,
} from '../utils/weatherAPI';
import {
  calculateFeelsLikeTemp,
  getWeatherCondition,
  getPlainSkyCondition,
} from '../utils/weatherUtils';

// 한국 표준시로 현재 시간을 ISO 형식으로 반환하는 함수
const getCurrentFormattedTime = () => {
  const now = new Date();

  const options = {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const formatter = new Intl.DateTimeFormat('ko-KR', options);
  const formattedParts = formatter.formatToParts(now);

  const year = formattedParts.find((part) => part.type === 'year').value;
  const month = formattedParts.find((part) => part.type === 'month').value;
  const day = formattedParts.find((part) => part.type === 'day').value;
  const hour = formattedParts.find((part) => part.type === 'hour').value;
  const minute = formattedParts.find((part) => part.type === 'minute').value;
  const second = formattedParts.find((part) => part.type === 'second').value;

  // ISO 형식으로 변환
  return `${year}-${month}-${day}T${hour}:${minute}:${second}+09:00`;
};

// 한국 표준시의 현재 시간을 가져오는 함수
const getCurrentKSTDate = () => {
  const now = new Date();

  const options = {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
  };

  const formatter = new Intl.DateTimeFormat('ko-KR', options);
  const formattedParts = formatter.formatToParts(now);

  const year = parseInt(formattedParts.find((part) => part.type === 'year').value, 10);
  const month = parseInt(formattedParts.find((part) => part.type === 'month').value, 10);
  const day = parseInt(formattedParts.find((part) => part.type === 'day').value, 10);
  const hour = parseInt(formattedParts.find((part) => part.type === 'hour').value, 10);

  return { year, month, day, hour };
};

// Zustand를 이용하여 상태 관리 스토어를 생성
export const useWeatherStore = create((set, get) => ({
  // 상태 변수 정의
  weatherData: null,
  location: { lat: null, lon: null },
  address: '',
  temperature: null,
  yesterdayTemperature: null,
  skyCondition: '',
  highTemp: null,
  lowTemp: null,
  feelsLikeTemp: null,
  windSpeed: null,
  hourlyWeatherData: [],
  error: null,
  // 로딩상태 추가
  loading: false,

  //로딩 상태 설정
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // 위치 설정 함수: 상태에 위치를 저장하고 로컬 스토리지에도 저장
  setLocation: (location) => {
    set({ location });
    const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
    storedData.location = location;
    localStorage.setItem('weatherData', JSON.stringify(storedData)); // 위치 정보를 로컬 스토리지에 저장
  },

  // 주소 설정 함수: 상태에 주소를 저장하고 로컬 스토리지에도 저장
  setAddress: (address) => {
    set({ address });
    const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
    storedData.address = address;
    localStorage.setItem('weatherData', JSON.stringify(storedData)); // 주소 정보를 로컬 스토리지에 저장
  },

  // 기온 설정 함수: 상태에 기온을 저장하고 로컬 스토리지에도 저장
  setTemperature: (temperature) => {
    set({ temperature });
    const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
    storedData.temperature = temperature;
    localStorage.setItem('weatherData', JSON.stringify(storedData)); // 기온 정보를 로컬 스토리지에 저장
  },

  // 체감 온도 설정 함수: 상태에 체감 온도를 저장하고 로컬 스토리지에도 저장
  setFeelsLikeTemp: (feelsLikeTemp) => {
    set({ feelsLikeTemp });
    const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
    storedData.feelsLikeTemp = feelsLikeTemp;
    localStorage.setItem('weatherData', JSON.stringify(storedData)); // 체감 온도 정보를 로컬 스토리지에 저장
  },

  // 날씨 상태 설정 함수: 상태에 날씨 상태를 저장하고 로컬 스토리지에도 저장
  setSkyCondition: (skyCondition) => {
    set({ skyCondition });
    const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
    storedData.skyCondition = skyCondition;
    localStorage.setItem('weatherData', JSON.stringify(storedData)); // 날씨 상태 정보를 로컬 스토리지에 저장
  },

  // 시간별 날씨 설정 함수: 상태에 시간별 날씨를 저장하고 로컬 스토리지에도 저장
  setHourlyWeatherData: (hourlyWeatherData) => {
    set({ hourlyWeatherData });
    const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
    storedData.hourlyWeatherData = hourlyWeatherData;
    localStorage.setItem('weatherData', JSON.stringify(storedData)); // 시간별 날씨 정보를 로컬 스토리지에 저장
  },

  // Kakao API를 이용하여 주소 가져오는 함수
  getAddress: async (lat, lon) => {
    const API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
    const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`;
    const headers = { Authorization: `KakaoAK ${API_KEY}` };

    try {
      const response = await axios.get(url, { headers });
      const addressData = response.data.documents[0].address;
      const formattedAddress = `${addressData.region_1depth_name} ${addressData.region_2depth_name} ${addressData.region_3depth_name}`;

      set({ address: formattedAddress });
      const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
      storedData.address = formattedAddress;
      localStorage.setItem('weatherData', JSON.stringify(storedData)); // 로컬스토리지에 저장
    } catch (error) {
      console.error('주소 정보를 불러오는 데 실패했습니다:', error);
      set({ error: '주소 정보를 불러오는 데 실패했습니다.' });
    }
  },

  // 날씨 데이터를 API로부터 받아오는 함수

  // 날씨 데이터를 API로부터 받아오는 함수
  fetchWeatherData: async (lat, lon) => {
    try {
      // 1. 현재 기온 데이터 가져오기 (초단기예보조회)
      const currentData = await fetchCurrentTemperatureFromAPI(lat, lon);

      // 현재 시각에 가장 가까운 예보 시간 추출
      const currentTime = currentData[0].fcstTime;

      // 현재 기온 데이터 추출
      const temperatureItem = currentData.find(
        (item) => item.category === 'T1H' && item.fcstTime === currentTime
      );
      const temperature = temperatureItem ? parseFloat(temperatureItem.fcstValue) : null;

      // 풍속 데이터 추출
      const windSpeedItem = currentData.find(
        (item) => item.category === 'WSD' && item.fcstTime === currentTime
      );
      const windSpeed = windSpeedItem ? parseFloat(windSpeedItem.fcstValue) : null;

      // 하늘 상태 및 강수 형태 데이터 추출
      const skyItem = currentData.find(
        (item) => item.category === 'SKY' && item.fcstTime === currentTime
      );
      const ptyItem = currentData.find(
        (item) => item.category === 'PTY' && item.fcstTime === currentTime
      );

      const skyValue = skyItem ? skyItem.fcstValue : null;
      const ptyValue = ptyItem ? ptyItem.fcstValue : null;

      // 낮/밤 여부 판단
      const now = new Date();
      const kstNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
      const hour = kstNow.getHours();
      const isDayTime = hour >= 6 && hour < 18;

      const weatherConditionIcon = getWeatherCondition(skyValue, ptyValue, isDayTime);

      // 체감 온도 계산
      const feelsLikeTemp = calculateFeelsLikeTemp(temperature, windSpeed);

      // 2. 단기예보 데이터 가져오기 (기존 함수 사용)
      const data = await fetchWeatherDataFromAPI(lat, lon);

      // 최고/최저 기온 데이터 추출
      const highTempData = data.find((item) => item.category === 'TMX');
      const lowTempData = data.find((item) => item.category === 'TMN');

      // 상태 업데이트
      set({
        temperature,
        windSpeed,
        feelsLikeTemp,
        skyCondition: weatherConditionIcon,
        highTemp: highTempData ? parseFloat(highTempData.fcstValue) : null,
        lowTemp: lowTempData ? parseFloat(lowTempData.fcstValue) : null,
      });

      // 로컬 스토리지 업데이트
      const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
      storedData.temperature = temperature;
      storedData.windSpeed = windSpeed;
      storedData.feelsLikeTemp = feelsLikeTemp;
      storedData.skyCondition = weatherConditionIcon;
      storedData.highTemp = highTempData ? parseFloat(highTempData.fcstValue) : null;
      storedData.lowTemp = lowTempData ? parseFloat(lowTempData.fcstValue) : null;
      storedData.location = { lat, lon };
      storedData.address = storedData.address || '';
      storedData.lastAccessTime = new Date().toISOString();

      localStorage.setItem('weatherData', JSON.stringify(storedData));
    } catch (error) {
      console.error('날씨 데이터를 불러오는 데 실패했습니다:', error);
      set({ error: '날씨 데이터를 불러오는 데 실패했습니다.' });
    }
  },

  // 어제의 날씨 데이터를 API로부터 받아오는 함수
  fetchYesterdayWeatherData: async (lat, lon) => {
    try {
      const data = await fetchYesterdayWeatherDataFromAPI(lat, lon);
      const temperatureData = data.find((item) => item.category === 'TMP');
      set({ yesterdayTemperature: temperatureData?.fcstValue });

      const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
      storedData.yesterdayTemperature = temperatureData?.fcstValue;
      localStorage.setItem('weatherData', JSON.stringify(storedData)); // 어제의 날씨 데이터를 객체로 저장
    } catch (error) {
      console.error('어제의 날씨 데이터를 불러오는 데 실패했습니다:', error);
      set({ error: '어제의 날씨 데이터를 불러오는 데 실패했습니다.' });
    }
  },

  // weatherStore.js에서 시간별 날씨 데이터를 처리하는 부분
  fetchHourlyWeatherData: async (lat, lon) => {
    try {
      const todayData = await fetchHourlyWeatherDataFromAPI(lat, lon);
      const hourlyData = [];

      const { hour: currentHour, day: currentDay } = getCurrentKSTDate(); // 현재 시간과 날짜

      for (let i = 0; i < todayData.length; i++) {
        const tempData = todayData.find(
          (item) => item.category === 'TMP' && item.fcstTime === todayData[i].fcstTime
        );
        const skyData = todayData.find(
          (item) => item.category === 'SKY' && item.fcstTime === todayData[i].fcstTime
        );
        const ptyData = todayData.find(
          (item) => item.category === 'PTY' && item.fcstTime === todayData[i].fcstTime
        );

        if (tempData && skyData && !hourlyData.some((entry) => entry.time === tempData.fcstTime)) {
          const forecastHour = parseInt(tempData.fcstTime.slice(0, 2), 10);
          const forecastDay = parseInt(todayData[i].fcstDate.slice(-2), 10); // 예보 날짜

          const isDayTime = forecastHour >= 6 && forecastHour < 18;

          // 오늘 현재 시간 이후 또는 내일 오전의 데이터만 추가
          if (
            (forecastDay === currentDay && forecastHour >= currentHour) ||
            forecastDay > currentDay
          ) {
            hourlyData.push({
              time: tempData.fcstTime,
              temperature: tempData.fcstValue,
              weatherCondition: getWeatherCondition(
                skyData?.fcstValue,
                ptyData?.fcstValue,
                isDayTime
              ),
            });
          }
        }
      }

      set({ hourlyWeatherData: hourlyData });

      const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
      storedData.hourlyWeatherData = hourlyData;
      localStorage.setItem('weatherData', JSON.stringify(storedData)); // 시간별 날씨 데이터를 객체로 저장
    } catch (error) {
      console.error('시간별 날씨 데이터를 불러오는 데 실패했습니다:', error);
      set({ error: '시간별 날씨 데이터를 불러오는 데 실패했습니다.' });
    }
  },

  // 위 fetching 함수들을 모아놓은 함수

  initFetching: async (lat, lon) => {
    set({ loading: true, error: null });
    try {
      const { getAddress, fetchWeatherData, fetchYesterdayWeatherData, fetchHourlyWeatherData } =
        get();

      await getAddress(lat, lon);
      await fetchWeatherData(lat, lon);
      await fetchYesterdayWeatherData(lat, lon);
      await fetchHourlyWeatherData(lat, lon);
      set({ loading: false });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      set({ error: '데이터를 불러오는 데 실패했습니다.', loading: false });
    }
  },
}));
