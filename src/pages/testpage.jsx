// 카드컴포넌트 사용예시를 위해 만든 임시 페이지입니다.

//테스트용 import
import initialCards from '@/data/test.js';
import { useState } from 'react';
import CostumeCard from '@/components/CostumeCard/CostumeCard';

const IntroPage = () => {
  ///테스트용으로 넣음
  const [likeList, setLikeList] = useState([]);

  const toggleLike = (id) => {
    if (likeList.includes(id)) {
      setLikeList(likeList.filter((likeId) => likeId !== id)); // 좋아요 해제
    } else {
      setLikeList([...likeList, id]); // 좋아요 추가
    }
  };
  ///

  return (
    <>
      <section id="page">
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
    </>
  );
};

export default IntroPage;
