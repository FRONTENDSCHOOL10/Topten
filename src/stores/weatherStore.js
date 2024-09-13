import { create } from 'zustand';
import axios from 'axios';

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

  // 날씨 데이터를 API로부터 받아오는 함수
  fetchWeatherData: async (lat, lon) => {
    const { nx, ny } = convertToGrid(lat, lon);  // 좌표를 그리드로 변환
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';

    // 현재 날짜 및 시간 설정
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
      // API 호출
      const response = await axios.get(url, { params });
      const data = response.data.response.body.items.item;

      // 필요한 데이터 추출
      const temperatureData = data.find((item) => item.category === 'TMP');
      const windSpeedData = data.find((item) => item.category === 'WSD');
      const skyData = data.find((item) => item.category === 'SKY');
      const ptyData = data.find((item) => item.category === 'PTY');
      const highTempData = data.find((item) => item.category === 'TMX');
      const lowTempData = data.find((item) => item.category === 'TMN');

      // 체감 온도 계산
      const feelsLikeTemp = calculateFeelsLikeTemp(temperatureData?.fcstValue, windSpeedData?.fcstValue);

      // 날씨 아이콘과 텍스트 분리
      const isDayTime = today.getHours() >= 6 && today.getHours() < 18;
      const weatherConditionIcon = getWeatherCondition(skyData?.fcstValue, ptyData?.fcstValue, isDayTime);  // 아이콘: 낮/밤 구분
      const weatherConditionText = getPlainSkyCondition(weatherConditionIcon);  // 텍스트: 낮/밤 구분 없이

      // 상태에 데이터 저장
      set({
        temperature: temperatureData?.fcstValue,
        windSpeed: windSpeedData?.fcstValue,
        feelsLikeTemp,
        skyCondition: weatherConditionIcon,
        highTemp: highTempData?.fcstValue,
        lowTemp: lowTempData?.fcstValue,
      });

      // 로컬 스토리지에 데이터 저장 (아이콘과 텍스트 모두 저장)
      localStorage.setItem('temperature', temperatureData?.fcstValue);
      localStorage.setItem('feelsLikeTemp', feelsLikeTemp);
      localStorage.setItem('skyCondition', weatherConditionIcon);  // 아이콘 저장
      localStorage.setItem('weatherText', weatherConditionText);  // 텍스트 저장
      localStorage.setItem('highTemp', highTempData?.fcstValue);
      localStorage.setItem('lowTemp', lowTempData?.fcstValue);

    } catch (error) {
      set({ error: '날씨 데이터를 불러오는 데 실패했습니다.' });
    }
  },

  // 어제의 날씨 데이터를 API로부터 받아오는 함수
  fetchYesterdayWeatherData: async (lat, lon) => {
    const { nx, ny } = convertToGrid(lat, lon);  // 좌표를 그리드로 변환
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';

    // 어제 날짜 설정
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
      // API 호출
      const response = await axios.get(url, { params });
      const data = response.data.response.body.items.item;
      const temperatureData = data.find((item) => item.category === 'TMP');

      // 상태에 어제의 기온 저장
      set({ yesterdayTemperature: temperatureData?.fcstValue });
      localStorage.setItem('yesterdayTemperature', temperatureData?.fcstValue);  // 어제 기온을 로컬 스토리지에 저장
    } catch (error) {
      set({ error: '어제의 날씨 데이터를 불러오는 데 실패했습니다.' });
    }
  },

  // 시간별 날씨 데이터를 API로부터 받아오는 함수
  fetchHourlyWeatherData: async (lat, lon) => {
    const { nx, ny } = convertToGrid(lat, lon);  // 좌표를 그리드로 변환
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';

    // 현재 날짜 및 시간 설정
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
      // API 호출
      const response = await axios.get(url, { params });
      const data = response.data.response.body.items.item;
      const hourlyData = [];

      // 현재 시간 가져오기
      const currentTime = new Date();
      const currentHour = currentTime.getHours() * 100;

      // 현재 시간 이후의 데이터 필터링
      const filteredData = data.filter(
        (item) =>
          (item.category === 'TMP' || item.category === 'SKY' || item.category === 'PTY') &&
          parseInt(item.fcstTime, 10) >= currentHour
      );

      // 시간별 날씨 데이터 추출
      for (let i = 0; i < filteredData.length && hourlyData.length < 24; i++) {
        const tempData = filteredData.find((item) => item.category === 'TMP' && item.fcstTime === filteredData[i].fcstTime);
        const skyData = filteredData.find((item) => item.category === 'SKY' && item.fcstTime === filteredData[i].fcstTime);
        const ptyData = filteredData.find((item) => item.category === 'PTY' && item.fcstTime === filteredData[i].fcstTime);

        // 시간대에 따른 날씨 상태 구분 (낮/밤)
        const forecastHour = parseInt(tempData.fcstTime.slice(0, 2), 10);
        const isDayTime = forecastHour >= 6 && forecastHour < 18;

        // 시간별 날씨 데이터 저장
        hourlyData.push({
          time: tempData.fcstTime,
          temperature: tempData.fcstValue,
          weatherCondition: getWeatherCondition(skyData?.fcstValue, ptyData?.fcstValue, isDayTime),  // 아이콘
        });
      }

      // 상태에 시간별 날씨 저장
      set({ hourlyWeatherData: hourlyData });
      localStorage.setItem('hourlyWeatherData', JSON.stringify(hourlyData));  // 시간별 날씨 데이터를 로컬 스토리지에 저장
    } catch (error) {
      set({ error: '시간별 날씨 데이터를 불러오는 데 실패했습니다.' });
    }
  },

  // 좌표를 기반으로 Kakao API를 통해 주소를 받아오는 함수
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
      localStorage.setItem('address', formattedAddress);  // 주소를 로컬 스토리지에 저장
    } catch (error) {
      set({ error: '주소 정보를 불러오는 데 실패했습니다.' });
    }
  },
}));

// 좌표를 그리드로 변환하는 함수 (기상청 API에 필요한 형식)
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

// 체감 온도 계산 함수
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

// 날씨 상태에서 "(낮)" 또는 "(밤)" 텍스트를 제거하는 함수
const getPlainSkyCondition = (condition) => {
  // undefined나 null인 경우 빈 문자열을 반환하여 오류 방지
  if (!condition) {
    return '';
  }
  // "(낮)", "(밤)" 부분을 제거하고 단순 날씨 상태만 반환
  return condition.replace(/\(낮\)|\(밤\)/g, '');
};

// 날씨 상태를 결정하는 함수
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
