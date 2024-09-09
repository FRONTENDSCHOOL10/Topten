// src/hooks/useLikeSync.js
import { useEffect } from 'react';
import pb from '@/api/pocketbase'; // PocketBase 인스턴스

export const useLikeSync = (userId, likeList) => {
  const syncLikesToServer = async () => {
    if (!userId) {
      console.log('로그인하지 않은 상태로 서버 동기화는 진행하지 않습니다.');
      return; // userId가 없으면 동기화하지 않음
    }

    try {
      const existingLikeList = await pb
        .collection('likeList')
        .getFirstListItem(`owner="${userId}"`);

      if (existingLikeList) {
        // 기존 리스트가 있을 경우 업데이트
        await pb.collection('likeList').update(existingLikeList.id, {
          owner: userId,
          costumeCard: likeList,
        });
        console.log('likeList가 성공적으로 업데이트되었습니다.');
      } else {
        // 새로운 리스트 생성
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

  useEffect(() => {
    if (!userId) return; // userId가 없으면 동기화하지 않음

    const handleBeforeUnload = () => {
      syncLikesToServer();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [likeList, userId]);

  return { syncLikesToServer };
};
