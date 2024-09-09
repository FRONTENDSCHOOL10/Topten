import Button from './../Button/Button';
import styles from './LookBook.module.scss';
import pb from './../../api/pocketbase';
import getPbImageURL from './../../api/getPbImageURL';

// CostumeCard 컴포넌트
import initialCards from '@/data/test.js';
import { useState, useEffect } from 'react';
import CostumeCard from '@/components/CostumeCard/CostumeCard';

function LookBook() {
  // CostumeCard 컴포넌트의 좋아요 기능 --------------------
  const [likeList, setLikeList] = useState([]);

  const toggleLike = (id) => {
    if (likeList.includes(id)) {
      setLikeList(likeList.filter((likeId) => likeId !== id)); // 좋아요 해제
    } else {
      setLikeList([...likeList, id]); // 좋아요 추가
    }
  };

  // 착용샷 불러오기 -----------------------
  const [lookBookItem, setLookBookItems] = useState(null);

  useEffect(() => {
    const fetchLookBookItems = async () => {
      try {
        const items = await pb.collection('lookBook').getFullList();

        // items.forEach((item) => {
        //   console.log(item.lookBookSeason);
        // });

        // setLookBookItems(items);

        // 임시!!!!! ----------------------------------
        const weather = '가을';

        // 계절에 맞는 아이템 필터링
        const seasonItems = items.filter((item) => item.lookBookSeason.includes(weather));

        console.log(seasonItems);

        
        // 해당 계절 중 랜덤으로 하나 선택
        if (seasonItems.length > 0) {
          const randomItem = seasonItems[Math.floor(Math.random() * seasonItems.length)];

          console.log('선택된 아이템:', randomItem);
          setLookBookItems(randomItem);

        } else {
          console.log('해당 계절에 맞는 아이템이 없습니다.');
        }

      } catch (error) {
        console.error('LookBook 데이터를 가져오는 중 에러 발생:', error);
      }
    };

    fetchLookBookItems();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Look Book : OOTD</h2>

      <div>
        {/* {lookBookItems.map((item) => (
            <li key={item.id}>
              <img
                src={getPbImageURL(item, 'outfitImage')}
                alt={item.lookBookTitle}
                className={styles.outfitImage}
              />
            </li> */}
        {lookBookItem ? (
          <img
            src={getPbImageURL(lookBookItem, 'outfitImage')}
            alt={lookBookItem.lookBookTitle}
            className={styles.outfitImage}
          />
        ) : (
          <p>해당 계절에 맞는 이미지를 찾을 수 없습니다.</p>
        )}
      </div>

      <div>
        <section id="page">
          <h3>관련 상품</h3>
          <div className={styles.product}>
            {initialCards.map((card) => (
              <CostumeCard
                key={card.id}
                record={card}
                imageUrl={card.costumeImage}
                isLiked={likeList.includes(card.id)} // 좋아요 상태 전달
                onLikeToggle={() => toggleLike(card.id)} // 좋아요 토글 함수 전달
              />
            ))}
          </div>
        </section>
      </div>

      <Button text="더 많은 룩북 보기" type="button" linkTo="/lookbook" />
    </div>
  );
}

export default LookBook;
