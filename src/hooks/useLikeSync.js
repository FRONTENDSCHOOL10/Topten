import { useEffect } from 'react';
import pb from '@/api/pocketbase';

export const useLikeSync = (userId, likeList) => {
  const syncLikesToServer = async () => {
    if (!userId) {
      console.log('로그인하지 않은 상태로 서버 동기화는 진행하지 않습니다.');
      return;
    }

    try {
      const existingLikeList = await pb
        .collection('likeList')
        .getFirstListItem(`owner="${userId}"`);

      if (existingLikeList) {
        await pb.collection('likeList').update(existingLikeList.id, {
          owner: userId,
          costumeCard: likeList,
        });
        console.log('likeList가 성공적으로 업데이트되었습니다.');
      } else {
        await pb.collection('likeList').create({
          owner: userId,
          costumeCard: likeList,
        });
        console.log('새로운 likeList가 생성되었습니다.');
      }
    } catch (error) {
      console.error('likeList 동기화에 실패했습니다:', error);
    }
  };

  // 페이지 이동 시 동기화 실행
  useEffect(() => {
    if (!userId || userId === 'LOGOUT') return; // 로그아웃 시 동기화하지 않음

    syncLikesToServer(); // 즉시 동기화 실행
  }, [likeList, userId]);

  return { syncLikesToServer };
};
