export const SIZE = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];

export const COLORS = ['봄웜', '봄쿨', '여름웜', '여름쿨', '가을웜', '가을쿨', '겨울웜', '겨울쿨'];

export const POLICY = [
  '이용약관 동의 (필수)',
  '개인정보 수집 · 이용 동의 (필수)',
  '본인은 만 14세 이상입니다. (필수)',
];
export const GENDER = ['남자', '여자', '선택안함'];

export const WARNING = {
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
  { text: '나의 체형', path: '/changefit', onClick: null, altText: '나의 체형으로 가기' },
  {
    text: '나의 퍼스널 컬러',
    path: '/changecolor',
    onClick: null,
    altText: '나의 퍼스널 컬러로 가기',
  },
  { text: '회원정보 변경', path: '/changeinfo', onClick: null, altText: '회원정보 변경하러 가기' },
  {
    text: '비밀번호 변경',
    path: '/changepassword',
    onClick: null,
    altText: '비밀번호 변경하러 가기',
  },
  { text: '고객센터', path: '/cs', onClick: null, altText: '고객센터로 가기' },
  { text: '로그아웃', path: '/', onClick: 'handleLogout', altText: '로그아웃 하기' }, // 로그아웃 항목만 onClick 할당
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

export const loadingComments = [
  '옷차림 고민하는 중...',
  '패션 트렌드를 분석 중...',
  '당신의 스타일을 찾아드릴게요!',
  '날씨 정보 불러오는 중...',
  '추천 코디 준비 중...',
];
