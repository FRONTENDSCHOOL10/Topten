import Button from './../Button/Button';
import styles from './LookBook.module.scss';
import pb from './../../api/pocketbase';
import getPbImageURL from './../../api/getPbImageURL'
import initialCards from '@/data/test.js';
import { useState } from 'react';
import CostumeCard from '@/components/CostumeCard/CostumeCard';

function LookBook() {
  // CostumeCard 컴포넌트의 좋아요 기능 임시 코드 -----------------------
  const [likeList, setLikeList] = useState([]);

  const toggleLike = (id) => {
    if (likeList.includes(id)) {
      setLikeList(likeList.filter((likeId) => likeId !== id)); // 좋아요 해제
    } else {
      setLikeList([...likeList, id]); // 좋아요 추가
    }
  };


  // 착용샷 불러오기
  // const imageUrl = getPbImageURL(data, avatar);
//   const user = await pb.collection('lookBook').getFullList();

// console.log('사용자:', user);


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Look Book : OOTD</h2>

      <div>{/* 착용샷 */}</div>

      <div>
        <section id="page">
          <h3>관련 상품</h3>
          <div className="wrapComponent">
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

      <Button
        text="더 많은 룩북 보기"
        backgroundColor="var(--primary-color)"
        borderColor="var(--primary-color)"
        fontWeight={400}
        linkTo="/lookbook"
      />
    </div>
  );
}

export default LookBook;
