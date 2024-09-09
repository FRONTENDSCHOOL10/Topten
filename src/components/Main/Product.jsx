import { useState } from 'react';
import styles from './Product.module.scss';
import initialCards from '@/data/test.js';
import CostumeCard from '@/components/CostumeCard/CostumeCard';
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
  const [likeList, setLikeList] = useState([]);

  const toggleLike = (id) => {
    if (likeList.includes(id)) {
      setLikeList(likeList.filter((likeId) => likeId !== id)); // 좋아요 해제
    } else {
      setLikeList([...likeList, id]); // 좋아요 추가
    }
  };

  const [temperature, setTemperature] = useState(() => ({
    current: '5°~8°',
  }));
  const [productItems, setProductItems] = useState(initialCards);

  const handleClick = (e) => {
    const { name } = e.target;
    setTemperature({ current: name });
  };

  //기온 조건 추가 아직
  const filteredUpper = productItems
    .filter(
      ({ costumeTemperature: t, upperCategory }) =>
        upperCategory === '상의' && t.includes(temperature.current)
    )
    .slice(0, 2);
  const filteredLower = productItems
    .filter(
      ({ costumeTemperature: t, upperCategory }) =>
        upperCategory === '하의' && t.includes(temperature.current)
    )
    .slice(0, 2);

  console.log('filteredUpper', filteredUpper);
  console.log('filteredLower', filteredLower);
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
        {filteredUpper.map((card) => (
          <CostumeCard
            key={card.id}
            record={card}
            imageUrl={card.costumeImage}
            isLiked={likeList.includes(card.id)} // 좋아요 상태 전달
            onLikeToggle={() => toggleLike(card.id)} // 좋아요 토글 함수 전달
          />
        ))}
      </div>
      <div className={styles.lower__section}>
        {filteredLower.map((card) => (
          <CostumeCard
            key={card.id}
            record={card}
            imageUrl={card.costumeImage}
            isLiked={likeList.includes(card.id)} // 좋아요 상태 전달
            onLikeToggle={() => toggleLike(card.id)} // 좋아요 토글 함수 전달
          />
        ))}
      </div>
    </div>
  );
}

export default Product;

// function Card({ imgPath, title, brand }) {
//   return (
//     <div>
//       <div>
//         <img className={styles.card} src={imgPath} alt="" />
//         <p>{title}</p>
//         <p>{brand}</p>
//       </div>
//     </div>
//   );
// }

function Button({ value, onClick }) {
  return (
    <button name={value} onClick={onClick}>
      {value}
    </button>
  );
}

// {filteredUpper.map((item) => (
//   <Card
//     key={item.id}
//     imgPath={item.costumeImage}
//     title={item.costumeTitle}
//     brand={item.costumeBrand}
//   />
// ))}
// {filteredLower.map((item) => (
//   <Card
//     key={item.id}
//     imgPath={item.costumeImage}
//     title={item.costumeTitle}
//     brand={item.costumeBrand}
//   />
// ))}

// import initialCards from '@/data/test.js';
