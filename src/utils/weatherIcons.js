// /src/utils/weatherIcons.js

export const getWeatherIcon = (condition) => {
  switch (condition) {
    case '맑음(낮)':
      return { src: '/icon/icon-lg-clear-day.png', alt: '맑음(낮)' };
    case '맑음(밤)':
      return { src: '/icon/icon-lg-clear-night.png', alt: '맑음(밤)' };
    case '구름조금(낮)':
      return { src: '/icon/icon-lg-cloud-little-day.png', alt: '구름조금(낮)' };
    case '구름조금(밤)':
      return { src: '/icon/icon-lg-cloud-little-night.png', alt: '구름조금(밤)' };
    case '구름많음(낮)':
      return { src: '/icon/icon-lg-cloud-lot-day.png', alt: '구름많음(낮)' };
    case '구름많음(밤)':
      return { src: '/icon/icon-lg-cloud-lot-night.png', alt: '구름많음(밤)' };
    case '흐림':
      return { src: '/icon/icon-lg-cloudy.png', alt: '흐림' };
    case '비':
      return { src: '/icon/icon-lg-rainy.png', alt: '비' };
    case '비 또는 눈':
      return { src: '/icon/icon-lg-rain_or_snow.png', alt: '비 또는 눈' };
    case '눈':
      return { src: '/icon/icon-lg-snow.png', alt: '눈' };
    case '소나기':
      return { src: '/icon/icon-lg-shower.png', alt: '소나기' };
    default:
      return { src: '/icon/icon-lg-default.png', alt: '날씨 정보 없음' };
  }
};

export const getWeatherIconSm = (condition) => {
  switch (condition) {
    case '맑음(낮)':
      return { src: '/icon/icon-sm-clear-day.png', alt: '맑음(낮)' };
    case '맑음(밤)':
      return { src: '/icon/icon-sm-clear-night.png', alt: '맑음(밤)' };
    case '구름조금(낮)':
      return { src: '/icon/icon-sm-cloud-little-day.png', alt: '구름조금(낮)' };
    case '구름조금(밤)':
      return { src: '/icon/icon-sm-cloud-little-night.png', alt: '구름조금(밤)' };
    case '구름많음(낮)':
      return { src: '/icon/icon-sm-cloud-lot-day.png', alt: '구름많음(낮)' };
    case '구름많음(밤)':
      return { src: '/icon/icon-sm-cloud-lot-night.png', alt: '구름많음(밤)' };
    case '흐림':
      return { src: '/icon/icon-sm-cloudy.png', alt: '흐림' };
    case '비':
      return { src: '/icon/icon-sm-rainy.png', alt: '비' };
    case '비 또는 눈':
      return { src: '/icon/icon-sm-rain_or_snow.png', alt: '비 또는 눈' };
    case '눈':
      return { src: '/icon/icon-sm-snow.png', alt: '눈' };
    case '소나기':
      return { src: '/icon/icon-sm-shower.png', alt: '소나기' };
    default:
      return { src: '/icon/icon-sm-default.png', alt: '날씨 정보 없음' };
  }
};
