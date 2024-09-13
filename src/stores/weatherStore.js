import { create } from 'zustand';
import axios from 'axios';
import { fetchWeatherDataFromAPI, fetchYesterdayWeatherDataFromAPI, fetchHourlyWeatherDataFromAPI } from '../utils/weatherAPI';
import { calculateFeelsLikeTemp, getWeatherCondition, getPlainSkyCondition } from '../utils/weatherUtils';

// Zustand를 이용하여 상태 관리 스토어를 생성
export const useWeatherStore = create((set) => ({
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

  // 위치 설정 함수: 상태에 위치를 저장하고 로컬 스토리지에도 저장
  setLocation: (location) => {
    set({ location });
    localStorage.setItem('location', JSON.stringify(location));  // 위치 정보를 로컬 스토리지에 저장
  },

  // 주소 설정 함수: 상태에 주소를 저장하고 로컬 스토리지에도 저장
  setAddress: (address) => {
    set({ address });
    localStorage.setItem('address', address);  // 주소 정보를 로컬 스토리지에 저장
  },

  // 기온 설정 함수: 상태에 기온을 저장하고 로컬 스토리지에도 저장
  setTemperature: (temperature) => {
    set({ temperature });
    localStorage.setItem('temperature', temperature);  // 기온 정보를 로컬 스토리지에 저장
  },

  // 체감 온도 설정 함수: 상태에 체감 온도를 저장하고 로컬 스토리지에도 저장
  setFeelsLikeTemp: (feelsLikeTemp) => {
    set({ feelsLikeTemp });
    localStorage.setItem('feelsLikeTemp', feelsLikeTemp);  // 체감 온도 정보를 로컬 스토리지에 저장
  },

  // 날씨 상태 설정 함수: 상태에 날씨 상태를 저장하고 로컬 스토리지에도 저장
  setSkyCondition: (skyCondition) => {
    set({ skyCondition });
    localStorage.setItem('skyCondition', skyCondition);  // 날씨 상태 정보를 로컬 스토리지에 저장
  },

  // 시간별 날씨 설정 함수: 상태에 시간별 날씨를 저장하고 로컬 스토리지에도 저장
  setHourlyWeatherData: (hourlyWeatherData) => {
    set({ hourlyWeatherData });
    localStorage.setItem('hourlyWeatherData', JSON.stringify(hourlyWeatherData));  // 시간별 날씨 정보를 로컬 스토리지에 저장
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

      // 상태에 주소 저장
      set({ address: formattedAddress });
      localStorage.setItem('address', formattedAddress);  // 로컬스토리지에 저장
    } catch (error) {
      console.error('주소 정보를 불러오는 데 실패했습니다:', error);
      set({ error: '주소 정보를 불러오는 데 실패했습니다.' });
    }
  },

  // 날씨 데이터를 API로부터 받아오는 함수
  fetchWeatherData: async (lat, lon) => {
    try {
      const data = await fetchWeatherDataFromAPI(lat, lon);

      const temperatureData = data.find((item) => item.category === 'TMP');
      const windSpeedData = data.find((item) => item.category === 'WSD');
      const skyData = data.find((item) => item.category === 'SKY');
      const ptyData = data.find((item) => item.category === 'PTY');
      const highTempData = data.find((item) => item.category === 'TMX');
      const lowTempData = data.find((item) => item.category === 'TMN');

      const feelsLikeTemp = calculateFeelsLikeTemp(temperatureData?.fcstValue, windSpeedData?.fcstValue);
      const isDayTime = new Date().getHours() >= 6 && new Date().getHours() < 18;
      const weatherConditionIcon = getWeatherCondition(skyData?.fcstValue, ptyData?.fcstValue, isDayTime);
      const weatherConditionText = getPlainSkyCondition(weatherConditionIcon);

      set({
        temperature: temperatureData?.fcstValue,
        windSpeed: windSpeedData?.fcstValue,
        feelsLikeTemp,
        skyCondition: weatherConditionIcon,
        highTemp: highTempData?.fcstValue,
        lowTemp: lowTempData?.fcstValue,
      });

      localStorage.setItem('temperature', temperatureData?.fcstValue);
      localStorage.setItem('feelsLikeTemp', feelsLikeTemp);
      localStorage.setItem('skyCondition', weatherConditionIcon);
      localStorage.setItem('weatherText', weatherConditionText);
      localStorage.setItem('highTemp', highTempData?.fcstValue);
      localStorage.setItem('lowTemp', lowTempData?.fcstValue);

    } catch (error) {
      set({ error: '날씨 데이터를 불러오는 데 실패했습니다.' });
    }
  },

  // 어제의 날씨 데이터를 API로부터 받아오는 함수
  fetchYesterdayWeatherData: async (lat, lon) => {
    try {
      const data = await fetchYesterdayWeatherDataFromAPI(lat, lon);
      const temperatureData = data.find((item) => item.category === 'TMP');
      set({ yesterdayTemperature: temperatureData?.fcstValue });
      localStorage.setItem('yesterdayTemperature', temperatureData?.fcstValue);
    } catch (error) {
      set({ error: '어제의 날씨 데이터를 불러오는 데 실패했습니다.' });
    }
  },

  // 시간별 날씨 데이터를 API로부터 받아오는 함수
  fetchHourlyWeatherData: async (lat, lon) => {
    try {
      const data = await fetchHourlyWeatherDataFromAPI(lat, lon);
      const hourlyData = [];

      const currentTime = new Date();
      const currentHour = currentTime.getHours() * 100;

      const filteredData = data.filter(
        (item) =>
          (item.category === 'TMP' || item.category === 'SKY' || item.category === 'PTY') &&
          parseInt(item.fcstTime, 10) >= currentHour
      );

      for (let i = 0; i < filteredData.length && hourlyData.length < 24; i++) {
        const tempData = filteredData.find((item) => item.category === 'TMP' && item.fcstTime === filteredData[i].fcstTime);
        const skyData = filteredData.find((item) => item.category === 'SKY' && item.fcstTime === filteredData[i].fcstTime);
        const ptyData = filteredData.find((item) => item.category === 'PTY' && item.fcstTime === filteredData[i].fcstTime);

        const forecastHour = parseInt(tempData.fcstTime.slice(0, 2), 10);
        const isDayTime = forecastHour >= 6 && forecastHour < 18;

        hourlyData.push({
          time: tempData.fcstTime,
          temperature: tempData.fcstValue,
          weatherCondition: getWeatherCondition(skyData?.fcstValue, ptyData?.fcstValue, isDayTime),
        });
      }

      set({ hourlyWeatherData: hourlyData });
      localStorage.setItem('hourlyWeatherData', JSON.stringify(hourlyData));
    } catch (error) {
      set({ error: '시간별 날씨 데이터를 불러오는 데 실패했습니다.' });
    }
  },
}));
