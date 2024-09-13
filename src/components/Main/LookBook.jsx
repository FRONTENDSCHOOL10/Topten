import { useState, useEffect } from 'react';
import styles from './LookBook.module.scss';
import pb from './../../api/pocketbase';
import getPbImageURL from './../../api/getPbImageURL';
import CostumeCardManager from '@/components/CostumeCardManager/CostumeCardManager';
import Button from './../Button/Button';

function LookBook({ item }) {
  // CostumeCard 컴포넌트의 좋아요 기능 --------------------
  const [likeList, setLikeList] = useState([]);

  const toggleLike = (id) => {
    if (likeList.includes(id)) {
      setLikeList(likeList.filter((likeId) => likeId !== id)); // 좋아요 해제
    } else {
      setLikeList([...likeList, id]); // 좋아요 추가
    }
  };

  // 착용샷
  const [lookBookItem, setLookBookItems] = useState(null);

  // 관련 상품
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    // 룩북 상세 페이지에서 룩북
    if (item) {
      // 저장된(클릭한) 착용샷을 착용샷 state로 저장
      setLookBookItems(item);

      const fetchRelatedItems = async () => {
        try {
          const allCostumeCards = await pb.collection('costumeCard').getFullList();

          // 저장된(클릭한) 착용샷 관련 상품 저장
          const costumeCardIds = item.items || [];

          const filteredItems = allCostumeCards.filter((card) => costumeCardIds.includes(card.id));

          setRelatedItems(filteredItems);
        } catch (error) {
          console.error('관련 상품 데이터를 가져오는 중 에러 발생:', error);
        }
      };

      fetchRelatedItems();
      
    } else {
      // 메인 페이지 룩북
      const fetchLookBookItems = async () => {
        try {
          const items = await pb.collection('lookBook').getFullList();

          // 임시!!! ----------------------------------
          const weather = '가을';

          // 계절에 맞는 아이템 필터링
          const seasonItems = items.filter((item) => item.lookBookSeason.includes(weather));

          console.log(seasonItems);

          // 해당 계절 중 랜덤으로 하나 선택
          if (seasonItems.length > 0) {
            const randomItem = seasonItems[Math.floor(Math.random() * seasonItems.length)];

            setLookBookItems(randomItem);

            console.log('선택된 착용샷:', randomItem);

            // 착장샷의 items 배열을 관련 상품으로 설정
            if (randomItem.items && randomItem.items.length > 0) {
              const allCostumeCards = await pb.collection('costumeCard').getFullList();

              const costumeCardIds = randomItem.items;

              const filteredItems = allCostumeCards.filter((card) =>
                costumeCardIds.includes(card.id)
              );

              setRelatedItems(filteredItems);
            } else {
              // 관련 상품이 없을 때
              setRelatedItems([]);
            }
          }
        } catch (error) {
          console.error('LookBook 데이터를 가져오는 중 에러 발생:', error);
        }
      };

      fetchLookBookItems();
    }
  }, [item]);

  return (
    <div className={styles.container}>
      {!item && (
        <>
          <h2 className={styles.title}>Look Book : OOTD</h2>
        </>
      )}

      <div className={styles.outfitContainer}>
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

      <div className={styles.productContainer}>
        <section id="page">
          <h3 className={styles.productTitle}>관련 상품</h3>
          <div className={styles.productSwiper}>
            <CostumeCardManager viewType="리스트" costumeCards={relatedItems} />
          </div>
        </section>
      </div>

      {!item && (
        <>
          <div className={styles.btnContainer}>
            <Button text="더 많은 룩북 보기" type="button" linkTo="/lookbook" />
          </div>
        </>
      )}
    </div>
  );
}

export default LookBook;
