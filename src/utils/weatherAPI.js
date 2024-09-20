import axios from 'axios';
import { convertToGrid } from './weatherUtils';

// 초단기예보조회 API의 Base Time 계산 함수
const getUltraSrtFcstBaseTime = () => {
  const now = new Date();
  const kstNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  let hour = kstNow.getHours();
  let minute = kstNow.getMinutes();

  // Base Time은 매 시간 30분이며, 45분 이후부터 데이터 제공
  if (minute < 45) {
    hour -= 1;
    if (hour < 0) {
      hour = 23;
      kstNow.setDate(kstNow.getDate() - 1);
    }
  }
  const baseDate = kstNow.toISOString().slice(0, 10).replace(/-/g, '');
  const baseTime = hour.toString().padStart(2, '0') + '30';

  return { baseDate, baseTime };
};

// 현재 기온을 가져오는 함수 (초단기예보조회)
export const fetchCurrentTemperatureFromAPI = async (lat, lon) => {
  const { nx, ny } = convertToGrid(lat, lon);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst';

  const { baseDate, baseTime } = getUltraSrtFcstBaseTime();

  const params = {
    serviceKey: API_KEY,
    numOfRows: 60,
    pageNo: 1,
    dataType: 'JSON',
    base_date: baseDate,
    base_time: baseTime,
    nx,
    ny,
  };

  try {
    const response = await axios.get(url, { params });
    return response.data.response.body.items.item;
  } catch (error) {
    console.error('현재 기온 데이터를 불러오는 데 실패했습니다:', error);
    throw error;
  }
};

// 현재 시간에 가장 가까운 BaseTime을 계산하는 함수
const getBaseTime = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  // 기상청 API에서 제공하는 BaseTime (발표 시각), 문자열로 변경
  const baseTimes = ['2300', '2000', '1700', '1400', '1100', '0800', '0500', '0200'];

  // 현재 시간에 가장 가까운 BaseTime 찾기
  for (let baseTime of baseTimes) {
    if (currentHour >= parseInt(baseTime.slice(0, 2))) {
      return baseTime; // 문자열 그대로 반환
    }
  }

  return '2300'; // 만약 시간이 새벽이면 전날의 2300 BaseTime 사용
};

// 날씨 데이터를 API로부터 받아오는 함수
export const fetchWeatherDataFromAPI = async (lat, lon) => {
  const { nx, ny } = convertToGrid(lat, lon); // 좌표를 그리드로 변환
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';

  // 현재 날짜 및 동적으로 계산된 BaseTime 설정
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const baseDate = `${year}${month}${day}`;
  const baseTime = getBaseTime(); // 동적으로 계산된 BaseTime

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
  return response.data.response.body.items.item; // 필요한 데이터 반환
};

// 어제의 날씨 데이터를 API로부터 받아오는 함수
export const fetchYesterdayWeatherDataFromAPI = async (lat, lon) => {
  const { nx, ny } = convertToGrid(lat, lon); // 좌표를 그리드로 변환
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, '0');
  const day = String(yesterday.getDate()).padStart(2, '0');
  const baseDate = `${year}${month}${day}`;
  const baseTime = getBaseTime(); // 동적으로 계산된 BaseTime

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
  return response.data.response.body.items.item; // 어제의 날씨 데이터 반환
};

// 시간별 날씨 데이터를 API로부터 받아오는 함수
export const fetchHourlyWeatherDataFromAPI = async (lat, lon, baseDate = null) => {
  const { nx, ny } = convertToGrid(lat, lon);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const url = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';

  const today = new Date();
  const year = baseDate ? baseDate.slice(0, 4) : today.getFullYear();
  const month = baseDate ? baseDate.slice(4, 6) : String(today.getMonth() + 1).padStart(2, '0');
  const day = baseDate ? baseDate.slice(6, 8) : String(today.getDate()).padStart(2, '0');
  const finalBaseDate = `${year}${month}${day}`;
  const baseTime = getBaseTime(); // 동적으로 계산된 BaseTime

  const params = {
    serviceKey: API_KEY,
    numOfRows: 1000,
    pageNo: 1,
    dataType: 'JSON',
    base_date: finalBaseDate,
    base_time: baseTime,
    nx,
    ny,
  };

  const response = await axios.get(url, { params });

  console.log('API 응답 데이터:', response.data.response.body.items.item); // 데이터를 로그로 확인
  return response.data.response.body.items.item;
};
