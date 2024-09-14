export const SIZE = ['XS', 'S', 'L'];

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
