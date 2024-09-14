// 좌표를 그리드로 변환하는 함수 (기상청 API에 필요한 형식)
export const convertToGrid = (lat, lon) => {
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
export const calculateFeelsLikeTemp = (T, V) => {
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
export const getPlainSkyCondition = (condition) => {
  // undefined나 null인 경우 빈 문자열을 반환하여 오류 방지
  if (!condition) {
    return '';
  }
  // "(낮)", "(밤)" 부분을 제거하고 단순 날씨 상태만 반환
  return condition.replace(/\(낮\)|\(밤\)/g, '');
};

// 날씨 상태를 결정하는 함수
export const getWeatherCondition = (skyValue, ptyValue, isDayTime) => {
  if (ptyValue === '1') return '비';
  if (ptyValue === '2') return '비 또는 눈';
  if (ptyValue === '3') return '눈';
  if (ptyValue === '4') return '소나기';

  if (skyValue === '1') return isDayTime ? '맑음(낮)' : '맑음(밤)';
  if (skyValue === '3') return isDayTime ? '구름조금(낮)' : '구름조금(밤)';
  if (skyValue === '4') return isDayTime ? '구름많음(낮)' : '구름많음(밤)';

  return '흐림';
};

