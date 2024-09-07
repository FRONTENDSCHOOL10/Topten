import { useEffect } from 'react';
import pb from '@/api/pocketbase';
import { useLikeStore } from '@/stores/likeStore'; // Zustand 스토어 가져오기

const LikeListManager = ({ user }) => {
  const setLikeList = useLikeStore((state) => state.setLikeList);
  const addLike = useLikeStore((state) => state.addLike);
  const removeLike = useLikeStore((state) => state.removeLike);

  useEffect(() => {
    const fetchLikeList = async () => {
      try {
        // 사용자의 likeList 데이터를 DB에서 가져옴
        const likeListRecords = await pb.collection('likeList').getFullList({
          filter: `owner="${user.id}"`,
          expand: 'costumeCard',
        });

        const likedCardIds = likeListRecords.map((record) => record.expand.costumeCard.id);
        setLikeList(likedCardIds); // Zustand 상태 업데이트
      } catch (error) {
        console.error('Error fetching like list:', error);
      }
    };

    fetchLikeList();
  }, [setLikeList, user]);

  const toggleLike = async (costumeCardId) => {
    const isLiked = useLikeStore.getState().likeList.includes(costumeCardId);

    if (isLiked) {
      removeLike(costumeCardId);
      const likeRecord = await pb
        .collection('likeList')
        .getFirstListItem(`owner="${user.id}" && costumeCard="${costumeCardId}"`);
      await pb.collection('likeList').delete(likeRecord.id);
    } else {
      addLike(costumeCardId);
      await pb.collection('likeList').create({
        owner: user.id,
        costumeCard: costumeCardId,
      });
    }
  };

  return (
    <div>
      {/* CostumeCardList를 사용할 때 toggleLike 함수를 전달 */}
      <CostumeCardList onLikeToggle={toggleLike} />
    </div>
  );
};

export default LikeListManager;
