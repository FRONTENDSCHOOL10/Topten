///테스트용 데이터
const initialCards = [
  {
    id: '1',
    costumeTitle: '오드퍼퓸 월넛크릭그린 EDP 50ml',
    costumeBrand: '비비앙',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4268814',
    },
    costumeTemperature: ['9°~11°'],
    upperCategory: '상의',
    lowerCategory: '긴팔',
    costumeImage: '/image/sample1.jpg',
  },
  {
    id: '2',
    costumeTitle: '키싱 시그널 오버핏 코튼 티셔츠 [블랙]',
    costumeBrand: '하츠크루',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4251234',
    },
    costumeTemperature: ['5°~8°', '9°~11°'],
    upperCategory: '상의',
    lowerCategory: '긴팔',
    costumeImage: '/image/sample2.jpg', // 예시 이미지
  },
  {
    id: '3',
    costumeTitle: '5°~8° 확인용 오드퍼퓸 월넛크릭그린 EDP 50ml',
    costumeBrand: '비비앙',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4268814',
    },
    costumeTemperature: ['5°~8°'],
    upperCategory: '상의',
    lowerCategory: '긴팔',
    costumeImage: '/image/sample1.jpg',
  },
  {
    id: '4',
    costumeTitle: '5°~8° 확인용 키싱 시그널 오버핏 코튼 티셔츠 [블랙]',
    costumeBrand: '하츠크루',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4251234',
    },
    costumeTemperature: ['5°~8°'],
    upperCategory: '하의',
    lowerCategory: '반바지',
    costumeImage: '/image/sample2.jpg', // 예시 이미지
  },
  {
    id: '5',
    costumeTitle: '5°~8° 확인용 오드퍼퓸 월넛크릭그린 EDP 50ml',
    costumeBrand: '비비앙',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4268814',
    },
    costumeTemperature: ['5°~8°'],
    upperCategory: '하의',
    lowerCategory: '반바지',
    costumeImage: '/image/sample1.jpg',
  },
  {
    id: '6',
    costumeTitle: '5°~8° 확인용 키싱 시그널 오버핏 코튼 티셔츠 [블랙]',
    costumeBrand: '하츠크루',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4251234',
    },
    costumeTemperature: ['5°~8°'],
    upperCategory: '하의',
    lowerCategory: '반바지',
    costumeImage: '/image/sample2.jpg', // 예시 이미지
  },
  {
    id: '7',
    costumeTitle: '4° ↓ 확인용 오드퍼퓸 월넛크릭그린 EDP 50ml',
    costumeBrand: '비비앙',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4268814',
    },
    costumeTemperature: ['4° ↓'],
    upperCategory: '상의',
    lowerCategory: '긴팔',
    costumeImage: '/image/sample1.jpg',
  },
  {
    id: '8',
    costumeTitle: '키싱 시그널 오버핏 코튼 티셔츠 [블랙]',
    costumeBrand: '하츠크루',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4251234',
    },
    costumeTemperature: ['4° ↓', '9°~11°'],
    upperCategory: '상의',
    lowerCategory: '긴팔',
    costumeImage: '/image/sample2.jpg', // 예시 이미지
  },
  {
    id: '9',
    costumeTitle: '4° ↓ 확인용 오드퍼퓸 월넛크릭그린 EDP 50ml',
    costumeBrand: '비비앙',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4268814',
    },
    costumeTemperature: ['4° ↓'],
    upperCategory: '하의',
    lowerCategory: '반바지',
    costumeImage: '/image/sample1.jpg',
  },
  {
    id: '10',
    costumeTitle: '4° ↓ 확인용 키싱 시그널 오버핏 코튼 티셔츠 [블랙]',
    costumeBrand: '하츠크루',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4251234',
    },
    costumeTemperature: ['4° ↓'],
    upperCategory: '하의',
    lowerCategory: '반바지',
    costumeImage: '/image/sample2.jpg', // 예시 이미지
  },
  {
    id: '11',
    costumeTitle: '오드퍼퓸 월넛크릭그린 EDP 50ml',
    costumeBrand: '비비앙',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4268814',
    },
    costumeTemperature: ['9°~11°'],
    upperCategory: '상의',
    lowerCategory: '긴발',
    costumeImage: '/image/sample1.jpg',
  },
  {
    id: '12',
    costumeTitle: '키싱 시그널 오버핏 코튼 티셔츠 [블랙]',
    costumeBrand: '하츠크루',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4251234',
    },
    costumeTemperature: ['9°~11°'],
    upperCategory: '상의',
    lowerCategory: '긴발',
    costumeImage: '/image/sample2.jpg', // 예시 이미지
  },
  {
    id: '13',
    costumeTitle: '오드퍼퓸 월넛크릭그린 EDP 50ml',
    costumeBrand: '비비앙',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4268814',
    },
    costumeTemperature: ['9°~11°'],
    upperCategory: '하의',
    lowerCategory: '반바지',
    costumeImage: '/image/sample1.jpg',
  },
  {
    id: '14',
    costumeTitle: '키싱 시그널 오버핏 코튼 티셔츠 [블랙]',
    costumeBrand: '하츠크루',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4251234',
    },
    costumeTemperature: ['9°~11°'],
    upperCategory: '하의',
    lowerCategory: '반바지',
    costumeImage: '/image/sample2.jpg', // 예시 이미지
  },
  {
    id: '15',
    costumeTitle: '오드퍼퓸 월넛크릭그린 EDP 50ml',
    costumeBrand: '비비앙',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4268814',
    },
    costumeTemperature: ['23°~27°'],
    upperCategory: '상의',
    lowerCategory: '긴발',
    costumeImage: '/image/sample1.jpg',
  },
  {
    id: '16',
    costumeTitle: '키싱 시그널 오버핏 코튼 티셔츠 [블랙]',
    costumeBrand: '하츠크루',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4251234',
    },
    costumeTemperature: ['23°~27°'],
    upperCategory: '상의',
    lowerCategory: '긴발',
    costumeImage: '/image/sample2.jpg', // 예시 이미지
  },
  {
    id: '17',
    costumeTitle: '오드퍼퓸 월넛크릭그린 EDP 50ml',
    costumeBrand: '비비앙',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4268814',
    },
    costumeTemperature: ['23°~27°'],
    upperCategory: '하의',
    lowerCategory: '반바지',
    costumeImage: '/image/sample1.jpg',
  },
  {
    id: '18',
    costumeTitle: '키싱 시그널 오버핏 코튼 티셔츠 [블랙]',
    costumeBrand: '하츠크루',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4251234',
    },
    costumeTemperature: ['23°~27°'],
    upperCategory: '하의',
    lowerCategory: '반바지',
    costumeImage: '/image/sample2.jpg', // 예시 이미지
  },
];

export default initialCards;
