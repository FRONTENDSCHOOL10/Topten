import { useState } from 'react';
import CostumeCard from '@/components/CostumeCard/CostumeCard';

const CostumeCardList = ({ costumeCards, likeList }) => {
  const [likedItems, setLikedItems] = useState(likeList);

  const handleLikeToggle = (id) => {
    setLikedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      }
      return [...prev, id];
    });
  };

  return (
    <div className="costumeCardList">
      {costumeCards.map((record) => (
        <CostumeCard
          key={record.id}
          record={record}
          imageUrl={record.imageUrl}
          isLiked={likedItems.includes(record.id)} // 좋아요 상태 전달
          onLikeToggle={() => handleLikeToggle(record.id)} // 좋아요 상태 변경 함수 전달
        />
      ))}
    </div>
  );
};

export default CostumeCardList;
