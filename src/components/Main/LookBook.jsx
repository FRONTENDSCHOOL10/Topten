import Button from './../Button/Button';
import styles from './LookBook.module.scss';
import pb from './../../api/pocketbase';
import getPbImageURL from './../../api/getPbImageURL';

// CostumeCard 컴포넌트
// import initialCards from '@/data/test.js';
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

  // 착용샷
  const [lookBookItem, setLookBookItems] = useState(null);

  // 관련 상품
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
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

          // randomItem의 items 배열을 관련 상품으로 설정
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
          <h3>관련 상품</h3>
          <div className={styles.product}>
            {relatedItems.length > 0 ? (
              relatedItems.map((item, index) => (
                <CostumeCard
                  key={index}
                  record={{
                    costumeTitle: item.costumeTitle || '제목 없음',
                    costumeBrand: item.costumeBrand || '브랜드 없음',
                    costumeLink: { url: item.costumeLink?.url || '#' },
                    // 링크가 없을 경우 기본값
                  }}
                  imageUrl={getPbImageURL(item, 'costumeImage')}
                  isLiked={likeList.includes(item.id)} // 좋아요 상태 전달
                  onLikeToggle={() => toggleLike(item.id)} // 좋아요 토글 함수 전달
                />
              ))
            ) : (
              <p>관련 상품이 없습니다.</p>
            )}
          </div>
        </section>
      </div>

      <div className={styles.btnContainer}>
        <Button text="더 많은 룩북 보기" type="button" linkTo="/lookbook" />
      </div>
    </div>
  );
}

export default LookBook;
