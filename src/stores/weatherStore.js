import { create } from 'zustand';
import axios from 'axios';
import { fetchWeatherDataFromAPI, fetchYesterdayWeatherDataFromAPI, fetchHourlyWeatherDataFromAPI } from '../utils/weatherAPI';
import { calculateFeelsLikeTemp, getWeatherCondition, getPlainSkyCondition } from '../utils/weatherUtils';


// 현재 시간을 ISO 포맷으로 반환하는 함수 (외부 파일 없이 내부에 정의)
const getCurrentFormattedTime = () => {
  const now = new Date();
  return now.toISOString(); // YYYY-MM-DDTHH:MM:SSZ 형식으로 반환
};

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
    const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
    storedData.location = location;
    localStorage.setItem('weatherData', JSON.stringify(storedData));  // 위치 정보를 로컬 스토리지에 저장
  },

  // 주소 설정 함수: 상태에 주소를 저장하고 로컬 스토리지에도 저장
  setAddress: (address) => {
    set({ address });
    const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
    storedData.address = address;
    localStorage.setItem('weatherData', JSON.stringify(storedData));  // 주소 정보를 로컬 스토리지에 저장
  },

  // 기온 설정 함수: 상태에 기온을 저장하고 로컬 스토리지에도 저장
  setTemperature: (temperature) => {
    set({ temperature });
    const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
    storedData.temperature = temperature;
    localStorage.setItem('weatherData', JSON.stringify(storedData));  // 기온 정보를 로컬 스토리지에 저장
  },

  // 체감 온도 설정 함수: 상태에 체감 온도를 저장하고 로컬 스토리지에도 저장
  setFeelsLikeTemp: (feelsLikeTemp) => {
    set({ feelsLikeTemp });
    const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
    storedData.feelsLikeTemp = feelsLikeTemp;
    localStorage.setItem('weatherData', JSON.stringify(storedData));  // 체감 온도 정보를 로컬 스토리지에 저장
  },

  // 날씨 상태 설정 함수: 상태에 날씨 상태를 저장하고 로컬 스토리지에도 저장
  setSkyCondition: (skyCondition) => {
    set({ skyCondition });
    const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
    storedData.skyCondition = skyCondition;
    localStorage.setItem('weatherData', JSON.stringify(storedData));  // 날씨 상태 정보를 로컬 스토리지에 저장
  },

  // 시간별 날씨 설정 함수: 상태에 시간별 날씨를 저장하고 로컬 스토리지에도 저장
  setHourlyWeatherData: (hourlyWeatherData) => {
    set({ hourlyWeatherData });
    const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
    storedData.hourlyWeatherData = hourlyWeatherData;
    localStorage.setItem('weatherData', JSON.stringify(storedData));  // 시간별 날씨 정보를 로컬 스토리지에 저장
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
      localStorage.setItem('weatherData', JSON.stringify(storedData));  // 로컬스토리지에 저장
    } catch (error) {
      console.error('주소 정보를 불러오는 데 실패했습니다:', error);
      set({ error: '주소 정보를 불러오는 데 실패했습니다.' });
    }
  },

  // 날씨 데이터를 API로부터 받아오는 함수
  // weatherStore.js에서 기온 데이터를 처리하는 부분
  fetchWeatherData: async (lat, lon) => {
    try {
      const data = await fetchWeatherDataFromAPI(lat, lon);

    // 현재 시간을 기준으로 데이터를 필터링하여 최신 기온 값을 얻기
    const currentHour = new Date().getHours(); // 현재 시간
      const temperatureData = data.find((item) => item.category === 'TMP' && parseInt(item.fcstTime.slice(0, 2), 10) === currentHour);

      const windSpeedData = data.find((item) => item.category === 'WSD');
      const skyData = data.find((item) => item.category === 'SKY');
      const ptyData = data.find((item) => item.category === 'PTY');
      const highTempData = data.find((item) => item.category === 'TMX');
      const lowTempData = data.find((item) => item.category === 'TMN');

      const feelsLikeTemp = calculateFeelsLikeTemp(temperatureData?.fcstValue, windSpeedData?.fcstValue);
      const isDayTime = currentHour >= 6 && currentHour < 18;
      const weatherConditionIcon = getWeatherCondition(skyData?.fcstValue, ptyData?.fcstValue, isDayTime);
      const weatherConditionText = getPlainSkyCondition(weatherConditionIcon);

      // 현재 시간 기록
      const currentTime = getCurrentFormattedTime();

      set({
        temperature: temperatureData?.fcstValue,  // 현재 시간에 맞는 기온 데이터 설정
        windSpeed: windSpeedData?.fcstValue,
        feelsLikeTemp,
        skyCondition: weatherConditionIcon,
        highTemp: highTempData?.fcstValue,
        lowTemp: lowTempData?.fcstValue,
      });
  
      // 모든 데이터를 객체로 묶어서 로컬 스토리지에 저장
      const weatherData = {
        temperature: temperatureData?.fcstValue,
        feelsLikeTemp,
        skyCondition: weatherConditionIcon,
        weatherText: weatherConditionText,
        highTemp: highTempData?.fcstValue,
        lowTemp: lowTempData?.fcstValue,
        windSpeed: windSpeedData?.fcstValue,
        location: { lat, lon },
        address: (JSON.parse(localStorage.getItem('weatherData')) || {}).address || "",
        lastAccessTime: currentTime,  // 마지막 접근 시간 저장
      };

      localStorage.setItem('weatherData', JSON.stringify(weatherData));

      console.log(`날씨 정보 및 접근 시간 저장: ${currentTime}`);
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
      
      const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
      storedData.yesterdayTemperature = temperatureData?.fcstValue;
      localStorage.setItem('weatherData', JSON.stringify(storedData));  // 어제의 날씨 데이터를 객체로 저장
    } catch (error) {
      set({ error: '어제의 날씨 데이터를 불러오는 데 실패했습니다.' });
    }
  },

// weatherStore.js에서 시간별 날씨 데이터를 처리하는 부분
  fetchHourlyWeatherData: async (lat, lon) => {
    try {
      const todayData = await fetchHourlyWeatherDataFromAPI(lat, lon);
      const hourlyData = [];

      const currentHour = new Date().getHours(); // 현재 시간을 기준으로 데이터를 필터링
      const currentDay = new Date().getDate();   // 오늘 날짜

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
          if ((forecastDay === currentDay && forecastHour >= currentHour) || forecastDay > currentDay) {
            hourlyData.push({
              time: tempData.fcstTime,
              temperature: tempData.fcstValue,
              weatherCondition: getWeatherCondition(skyData?.fcstValue, ptyData?.fcstValue, isDayTime),
            });
          }
        }
      }

      set({ hourlyWeatherData: hourlyData });

      const storedData = JSON.parse(localStorage.getItem('weatherData')) || {};
      storedData.hourlyWeatherData = hourlyData;
      localStorage.setItem('weatherData', JSON.stringify(storedData));  // 시간별 날씨 데이터를 객체로 저장
    } catch (error) {
      set({ error: '시간별 날씨 데이터를 불러오는 데 실패했습니다.' });
    }
  },
}));
