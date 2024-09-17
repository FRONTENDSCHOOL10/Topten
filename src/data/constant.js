export const SIZE = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];

export const COLORS = ['봄웜', '봄쿨', '여름웜', '여름쿨', '가을웜', '가을쿨', '겨울웜', '겨울쿨'];

export const POLICY = [
  '이용약관 동의 (필수)',
  '개인정보 수집 · 이용 동의 (필수)',
  '본인은 만 14세 이상입니다. (필수)',
];
export const GENDER = ['남자', '여자', '선택안함'];

export const WRANING = {
  nameMsg: '한글로 입력해주세요.',
  emailMsg: '이메일 형식으로 입력해주세요.',
  passwordMsg: '영문자, 숫자, 특수문자를 포함하여 최소 8자 이상 입력해야 합니다.',
  passwordCheckMsg: '입력하신 비밀번호를 다시 확인해주세요.',
};

export const INITUSER = {
  name: '',
  email: '',
  password: '',
  checkPassword: '',
  nickName: '',
  gender: '',
  topSize: 'XS',
  bottomSize: 'XS',
  colors: '봄웜',
};

export const INITCHECKED = {
  0: false,
  1: false,
  2: false,
};

export const NAV = [
  { text: '나의 체형', path: '/changefit' },
  { text: '나의 퍼스널 컬러', path: '/changecolor' },
  { text: '회원정보 변경', path: '/changeinfo' },
  { text: '비밀번호 변경', path: '/changepassword' },
  { text: '고객센터', path: '/cs' },
  { text: '로그아웃', path: '/cs' },
];

export const temperatureList = [
  '4° ↓',
  '5°~8°',
  '9°~11°',
  '12°~16°',
  '17°~19°',
  '20°~22°',
  '23°~27°',
  '28° ↑',
];

export const bookmarkData = [
  [
    {
      collectionId: 'cfwfpoo8z5svoms',
      collectionName: 'costumeCard',
      costumeBrand: '폴로',
      costumeImage: 'pexels_frendsmans_1926769_deFTIQKSJG.jpg',
      costumeLink: { 무신사: 'https://www.musinsa.com/products/4268814' },
      costumeSeason: ['여름'],
      costumeTemperature: ['5°~8°'],
      costumeTitle: '향수',
      created: '2024-09-10 00:24:48.715Z',
      id: 'nnc25yevw4600cq',
      isRainsnow: false,
      lowerCategory: '반바지',
      updated: '2024-09-10 00:24:48.715Z',
      upperCategory: '하의',
    },
    {
      collectionId: 'cfwfpoo8z5svoms',
      collectionName: 'costumeCard',
      costumeBrand: '폴로',
      costumeImage: 'profile_4_desktop_wPdVZeGqXg.jpg',
      costumeLink: { 무신사: 'https://www.musinsa.com/products/4268814' },
      costumeSeason: ['여름'],
      costumeTemperature: ['5°~8°'],
      costumeTitle: '폴로 하의 예시',
      created: '2024-09-08 15:10:40.756Z',
      id: 'wymzn0k6ay9zx3u',
      isRainsnow: false,
      lowerCategory: '반바지',
      updated: '2024-09-08 15:10:40.756Z',
      upperCategory: '하의',
    },
    {
      collectionId: 'cfwfpoo8z5svoms',
      collectionName: 'costumeCard',
      costumeBrand: '아식스',
      costumeImage: 'profile_3_desktop_FLLurxe23y.png',
      costumeLink: { 무신사: 'https://www.musinsa.com/products/4268814' },
      costumeSeason: ['여름'],
      costumeTemperature: ['5°~8°'],
      costumeTitle: '아식스 하의 예시',
      created: '2024-09-08 15:09:18.133Z',
      id: 'd6b3w2v5zl8mner',
      isRainsnow: false,
      lowerCategory: '긴바지',
      updated: '2024-09-12 20:04:38.856Z',
      upperCategory: '하의',
    },
    {
      collectionId: 'cfwfpoo8z5svoms',
      collectionName: 'costumeCard',
      costumeBrand: '아디다스',
      costumeImage: 'profile_1_desktop_LSNGdCkG5k.png',
      costumeLink: { 무신사: 'https://www.musinsa.com/products/4268814' },
      costumeSeason: ['여름'],
      costumeTemperature: ['5°~8°'],
      costumeTitle: '아디다스 상의 예시',
      created: '2024-09-08 15:07:44.902Z',
      id: 'yp3x1gu86nq6ob5',
      isRainsnow: false,
      lowerCategory: '긴팔',
      updated: '2024-09-08 15:11:02.807Z',
      upperCategory: '상의',
    },
  ],
];

export const bookmarkList = [
  {
    date: '2024-09-13',
    OOTD: 'Casual Outfit',
    weather: 'Sunny',
    location: 'Seoul',
  },
  {
    date: '2024-09-15',
    OOTD: 'Casual Outfit',
    weather: 'Sunny',
    location: 'Seoul',
  },
  {
    date: '2024-09-17',
    OOTD: 'Formal',
    weather: 'Rainy',
    location: 'Busan',
  },
  {
    date: '2024-09-20',
    OOTD: 'Sports',
    weather: 'Cloudy',
    location: 'Incheon',
  },
  {
    date: '2024-09-22',
    OOTD: 'Sports',
    weather: 'Cloudy',
    location: 'Incheon',
  },
];

// export const categoryList = {
//   upperCategory: ['상의', '하의', '아우터', '원피스/스커트', '악세사리'],
//   lowerCategory: ['반바지', '바지', '반팔', '긴팔', '가디건', '패딩코트', '향수'],
// };

export const categoryList = {
  상의: ['반팔', '긴팔'],
  하의: ['반바지', '긴바지'],
  아우터: ['가디건', '패딩/코트'],
  '원피스/스커트': [],
  악세사리: [],
};

export const BUTTONSTYLE = {
  width: '66px',
  height: '22px',
  fontSize: '12px',
  fontWeight: 400,
};

export const SEASONS = {
  봄: {
    months: [3, 4, 5],
    tempRange: { min: 0, max: 25 },
  },
  여름: {
    months: [6, 7, 8],
    tempRange: { min: 17, max: 37 },
  },
  가을: {
    months: [9, 10, 11],
    tempRange: { min: 0, max: 29 },
  },
  겨울: {
    months: [12, 1, 2],
    tempRange: { min: -Infinity, max: 2 },
  },
};

export const getSeason = (month, temperature) => {
  for (const [season, { months, tempRange }] of Object.entries(SEASONS)) {
    if (months.includes(month) && temperature >= tempRange.min && temperature <= tempRange.max) {
      return season;
    }
  }
  return 'Unknown';
};
