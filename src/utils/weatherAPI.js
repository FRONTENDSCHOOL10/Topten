import axios from 'axios';
import { convertToGrid } from './weatherUtils';

// 날씨 데이터를 API로부터 받아오는 함수
export const fetchWeatherDataFromAPI = async (lat, lon) => {
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

  const response = await axios.get(url, { params });
  return response.data.response.body.items.item;  // 필요한 데이터 반환
};

// 어제의 날씨 데이터를 API로부터 받아오는 함수
export const fetchYesterdayWeatherDataFromAPI = async (lat, lon) => {
  const { nx, ny } = convertToGrid(lat, lon);  // 좌표를 그리드로 변환
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';

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

  const response = await axios.get(url, { params });
  return response.data.response.body.items.item;  // 어제의 날씨 데이터 반환
};

// 시간별 날씨 데이터를 API로부터 받아오는 함수
export const fetchHourlyWeatherDataFromAPI = async (lat, lon) => {
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

  const response = await axios.get(url, { params });
  return response.data.response.body.items.item;  // 시간별 데이터 반환
};
