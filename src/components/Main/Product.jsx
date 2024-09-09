import { useState } from 'react';
import styles from './Product.module.scss';
import initialCards from '@/data/test.js';
import CostumeCard from '@/components/CostumeCard/CostumeCard';
import Button from '../Button/Button';
import { IoRefreshSharp } from 'react-icons/io5';

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

const BUTTONSTYLE = {
  width: '66px',
  height: '22px',
  fontSize: '12px',
  fontWeight: 400,
};

function Product() {
  const [likeList, setLikeList] = useState([]);

  const toggleLike = (id) => {
    if (likeList.includes(id)) {
      setLikeList(likeList.filter((likeId) => likeId !== id)); // 좋아요 해제
    } else {
      setLikeList([...likeList, id]); // 좋아요 추가
    }
  };

  // 초기 현재 기온 상태
  const [temperature, setTemperature] = useState(() => ({
    current: '5°~8°',
  }));

  // 랜더링 시 전체 프로덕트 아이템을 받아옴
  const [productItems, setProductItems] = useState(initialCards);

  //다음 추천을 위한 index
  const [nextIndex, setNextIndex] = useState(0);

  // 버튼 클릭시 해당 기온으로 temperature를 업데이트
  const handleClick = (e) => {
    const { innerText } = e.target;
    setTemperature({ current: innerText });
  };

  // 파생된 상태, 기온에 맞게 상의 하의를 필터링
  const filteredUpper = productItems
    .filter(
      ({ costumeTemperature: t, upperCategory }) =>
        upperCategory === '상의' && t.includes(temperature.current)
    )
    .slice(0 + nextIndex, 2 + nextIndex);
  const filteredLower = productItems
    .filter(
      ({ costumeTemperature: t, upperCategory }) =>
        upperCategory === '하의' && t.includes(temperature.current)
    )
    .slice(0 + nextIndex, 2 + nextIndex);

  // 새로고침 버튼 클릭 시 index를 증가시켜 다음 아이템으로 새로고침
  const refreshProductItem = () => {
    nextIndex === productItems.length - 2
      ? setNextIndex((prev) => (prev = 0))
      : setNextIndex((prev) => prev + 2);
  };

  return (
    <div className={styles.product__component}>
      <h2 className={styles.title}>오늘 날씨엔?</h2>
      <div className={styles.buttons}>
        {temperatureList.map((text, index) => (
          <Button style={BUTTONSTYLE} key={index} text={text} onClick={handleClick} />
        ))}
      </div>
      <div className={styles.recommend__container}>
        <img className={styles.icon} src="/image/notification.png" alt="notification" />
        <span className={styles.recommend}>반팔, 얇은 셔츠, 반바지, 면바지를 입으면 좋아요!</span>
      </div>
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
      <Button
        style={{ marginTop: '30px' }}
        text="다른 스타일 추천해드릴까요?"
        onClick={refreshProductItem}
        active="ture"
        icon={<IoRefreshSharp />}
      />
    </div>
  );
}

export default Product;
