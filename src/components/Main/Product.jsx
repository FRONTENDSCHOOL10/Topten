import { useState } from 'react';
import styles from './Product.module.scss';
const temperatureList = [
  '4° ↓',
  '5°~8°',
  '9°~11°',
  '12°~16°',
  '17°~19°',
  '20°~22°',
  '23°~27°',
  '28° ↑',
];

//임시 카드 아이템
const cards = [
  {
    id: 'aa1235',
    costumeTitle: '키싱 시그널 오버핏 코튼',
    costumeBrand: '무신사',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4268814',
    },
    costumeImage: '/image/sc-favicon-512.png',
    costumeSeason: ['봄'],
    isRainsnow: true,
    costumeTemperature: ['5°~8°'],
    upperCategory: '상의',
    lowerCategory: null,
  },
  {
    id: 'aa12235',
    costumeTitle: '봄 위',
    costumeBrand: '무신사',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4268814',
    },
    costumeImage: '/image/sc-favicon-512.png',
    costumeSeason: ['봄'],
    isRainsnow: true,
    costumeTemperature: ['5°~8°'],
    upperCategory: '상의',
    lowerCategory: null,
  },
  {
    id: 'aa12335',
    costumeTitle: '겨울 바지',
    costumeBrand: '무신사',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4268814',
    },
    costumeImage: '/image/sc-favicon-512.png',
    costumeSeason: ['겨울'],
    isRainsnow: true,
    costumeTemperature: ['5°~8°'],
    upperCategory: 'null',
    lowerCategory: '하의',
  },
  {
    id: 'aa12365',
    costumeTitle: '여름 가을 바지',
    costumeBrand: '무신사',
    costumeLink: {
      무신사: 'https://www.musinsa.com/products/4268814',
    },
    costumeImage: '/image/sc-favicon-512.png',
    costumeSeason: ['여름, 가을'],
    isRainsnow: true,
    costumeTemperature: ['5°~8°'],
    upperCategory: 'null',
    lowerCategory: '하의',
  },
];

function Product() {
  const [currentTemperature, setCurrentTemperature] = useState({ current: null });
  const handleClick = (e) => {
    const { name } = e.target;
    setCurrentTemperature({ current: name });
  };

  //기온 조건 추가 아직
  const filteredUpper = cards.filter((item) => item.upperCategory === '상의');
  const filteredLower = cards.filter((item) => item.lowerCategory === '하의');

  return (
    <div>
      <h2>오늘 날씨엔?</h2>
      <div className={styles.buttons}>
        {temperatureList.map((temperature, index) => (
          <Button key={index} value={temperature} onClick={handleClick} />
        ))}
      </div>
      <img src="/image/notification.png" alt="notification" />
      <span className={styles.recommend}>반팔, 얇은 셔츠, 반바지, 면바지를 입으면 좋아요!</span>
      <div className={styles.upper__section}>
        {filteredUpper.map((item) => (
          <Card
            key={item.id}
            imgPath={item.costumeImage}
            title={item.costumeTitle}
            brand={item.costumeBrand}
          />
        ))}
      </div>
      <div className={styles.lower__section}>
        {filteredLower.map((item) => (
          <Card
            key={item.id}
            imgPath={item.costumeImage}
            title={item.costumeTitle}
            brand={item.costumeBrand}
          />
        ))}
      </div>
    </div>
  );
}

export default Product;

function Card({ imgPath, title, brand }) {
  return (
    <div>
      <div>
        <img className={styles.card} src={imgPath} alt="" />
        <p>{title}</p>
        <p>{brand}</p>
      </div>
    </div>
  );
}

function Button({ value, onClick }) {
  return (
    <button name={value} onClick={onClick}>
      {value}
    </button>
  );
}
