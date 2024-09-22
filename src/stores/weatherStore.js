import { create } from 'zustand';
import axios from 'axios';
import {
  fetchWeatherDataFromAPI,
  fetchYesterdayWeatherDataFromAPI,
  fetchHourlyWeatherDataFromAPI,
} from '../utils/weatherAPI';
import {
  calculateFeelsLikeTemp,
  getWeatherCondition,
  getPlainSkyCondition,
} from '../utils/weatherUtils';

// 로컬 스토리지에서 초기 데이터를 로드하는 함수
const loadStoredData = () => {
  try {
    return JSON.parse(localStorage.getItem('weatherData')) || {};
  } catch (error) {
    console.error('로컬 스토리지 데이터를 불러오는 데 실패했습니다:', error);
    return {};
  }
};

// 상태 업데이트와 로컬 스토리지 저장을 동시에 처리하는 헬퍼 함수
const setStateAndLocalStorage = (set, key, value) => {
  set({ [key]: value });
  const storedData = loadStoredData();
  storedData[key] = value;
  localStorage.setItem('weatherData', JSON.stringify(storedData));
};

// Zustand 스토어 생성
export const useWeatherStore = create((set, get) => ({
  // 초기 상태 설정
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
  loading: false,

  // 상태 업데이트 함수들
  setLocation: (location) => setStateAndLocalStorage(set, 'location', location),
  setAddress: (address) => setStateAndLocalStorage(set, 'address', address),
  setTemperature: (temperature) => setStateAndLocalStorage(set, 'temperature', temperature),
  setFeelsLikeTemp: (feelsLikeTemp) => setStateAndLocalStorage(set, 'feelsLikeTemp', feelsLikeTemp),
  setSkyCondition: (skyCondition) => setStateAndLocalStorage(set, 'skyCondition', skyCondition),
  setHourlyWeatherData: (hourlyWeatherData) =>
    setStateAndLocalStorage(set, 'hourlyWeatherData', hourlyWeatherData),
  setYesterdayTemperature: (yesterdayTemperature) =>
    setStateAndLocalStorage(set, 'yesterdayTemperature', yesterdayTemperature),

  // 주소 가져오기 함수
  getAddress: async (lat, lon) => {
    const API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
    const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`;
    const headers = { Authorization: `KakaoAK ${API_KEY}` };

    try {
      const response = await axios.get(url, { headers });
      const addressData = response.data.documents[0].address;
      const formattedAddress = `${addressData.region_1depth_name} ${addressData.region_2depth_name} ${addressData.region_3depth_name}`;

      get().setAddress(formattedAddress);
    } catch (error) {
      console.error('주소 정보를 불러오는 데 실패했습니다:', error);
      set({ error: '주소 정보를 불러오는 데 실패했습니다.' });
    }
  },

  // 날씨 데이터 가져오기 함수
  fetchWeatherData: async (lat, lon) => {
    try {
      const data = await fetchWeatherDataFromAPI(lat, lon);
      const currentHour = new Date().getHours();

      const temperatureData = data.find(
        (item) => item.category === 'TMP' && parseInt(item.fcstTime.slice(0, 2), 10) === currentHour
      );
      const windSpeedData = data.find((item) => item.category === 'WSD');
      const skyData = data.find((item) => item.category === 'SKY');
      const ptyData = data.find((item) => item.category === 'PTY');
      const highTempData = data.find((item) => item.category === 'TMX');
      const lowTempData = data.find((item) => item.category === 'TMN');

      const feelsLikeTemp = calculateFeelsLikeTemp(
        temperatureData?.fcstValue,
        windSpeedData?.fcstValue
      );
      const isDayTime = currentHour >= 6 && currentHour < 18;
      const weatherConditionIcon = getWeatherCondition(
        skyData?.fcstValue,
        ptyData?.fcstValue,
        isDayTime
      );
      const weatherConditionText = getPlainSkyCondition(weatherConditionIcon);

      set({
        temperature: temperatureData?.fcstValue,
        windSpeed: windSpeedData?.fcstValue,
        feelsLikeTemp,
        skyCondition: weatherConditionIcon,
        highTemp: highTempData?.fcstValue,
        lowTemp: lowTempData?.fcstValue,
      });

      const weatherData = {
        temperature: temperatureData?.fcstValue,
        feelsLikeTemp,
        skyCondition: weatherConditionIcon,
        weatherText: weatherConditionText,
        highTemp: highTempData?.fcstValue,
        lowTemp: lowTempData?.fcstValue,
        windSpeed: windSpeedData?.fcstValue,
        address: get().address || '',
      };

      localStorage.setItem('weatherData', JSON.stringify(weatherData));
    } catch (error) {
      console.error('날씨 데이터를 불러오는 데 실패했습니다:', error);
      set({ error: '날씨 데이터를 불러오는 데 실패했습니다.' });
    }
  },

  // 어제의 날씨 데이터 가져오기 함수
  fetchYesterdayWeatherData: async (lat, lon) => {
    try {
      const data = await fetchYesterdayWeatherDataFromAPI(lat, lon);
      const temperatureData = data.find((item) => item.category === 'TMP');

      set({ yesterdayTemperature: temperatureData?.fcstValue });

      const storedData = loadStoredData();
      storedData.yesterdayTemperature = temperatureData?.fcstValue;
      localStorage.setItem('weatherData', JSON.stringify(storedData));
    } catch (error) {
      console.error('어제의 날씨 데이터를 불러오는 데 실패했습니다:', error);
      set({ error: '어제의 날씨 데이터를 불러오는 데 실패했습니다.' });
    }
  },

  // 시간별 날씨 데이터 가져오기 함수
  fetchHourlyWeatherData: async (lat, lon) => {
    try {
      const todayData = await fetchHourlyWeatherDataFromAPI(lat, lon);
      const hourlyData = [];

      const currentHour = new Date().getHours();
      const currentDay = new Date().getDate();

      todayData.forEach((item) => {
        if (item.category === 'TMP') {
          const forecastHour = parseInt(item.fcstTime.slice(0, 2), 10);
          const forecastDay = parseInt(item.fcstDate.slice(-2), 10);
          const isDayTime = forecastHour >= 6 && forecastHour < 18;

          if (
            (forecastDay === currentDay && forecastHour >= currentHour) ||
            forecastDay > currentDay
          ) {
            const skyData = todayData.find(
              (skyItem) => skyItem.category === 'SKY' && skyItem.fcstTime === item.fcstTime
            );
            const ptyData = todayData.find(
              (ptyItem) => ptyItem.category === 'PTY' && ptyItem.fcstTime === item.fcstTime
            );

            if (skyData) {
              hourlyData.push({
                time: item.fcstTime,
                temperature: item.fcstValue,
                weatherCondition: getWeatherCondition(
                  skyData.fcstValue,
                  ptyData?.fcstValue,
                  isDayTime
                ),
              });
            }
          }
        }
      });

      set({ hourlyWeatherData: hourlyData });
      const storedData = loadStoredData();
      storedData.hourlyWeatherData = hourlyData;
      localStorage.setItem('weatherData', JSON.stringify(storedData));
    } catch (error) {
      console.error('시간별 날씨 데이터를 불러오는 데 실패했습니다:', error);
      set({ error: '시간별 날씨 데이터를 불러오는 데 실패했습니다.' });
    }
  },

  // 초기 데이터 fetching 함수
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

// 초기 상태 로드
const initialData = loadStoredData();
useWeatherStore.setState(initialData);
