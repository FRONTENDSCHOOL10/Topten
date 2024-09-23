import { useCallback } from 'react';
import pb from '@/api/pocketbase';
import useLikeStore from '@/stores/likeStore';

export const useLikeSync = (userId) => {
  const { likeLocal, initLikeOrigin, resetLikeLists } = useLikeStore();

  // 로그인 시 서버에서 likeList를 가져옴
  const fetchLikeListFromServer = useCallback(async () => {
    if (!userId) return;
    try {
      const likeListResponse = await pb.collection('likeList').getFullList({
        filter: `owner = "${userId}"`,
      });
      console.log('likeListResponse in useLikeSync:', likeListResponse);
      const likedIds = likeListResponse.map((item) => item.costumeCard);
      initLikeOrigin(likedIds); // 서버에서 받아온 리스트를 like-origin에 저장
    } catch (error) {
      console.error('Failed to fetch likeList from server:', error);
    }
  }, [userId]);

  // 로그아웃 시 like-local을 like-origin에 업데이트하고, 서버에 저장
  const syncLikeLocalToOriginAndServer = useCallback(async () => {
    console.log('syncLikeLocalToOriginAndServer가 실행됨');
    if (!userId) return;
    console.log('try구문 진입');
    try {
      const updatedLikeList = [...new Set(likeLocal)]; // 중복 제거 후 처리

      initLikeOrigin(updatedLikeList); // 업데이트된 likeLocal을 likeOrigin으로 저장
      console.log('initLikeOrigin실행됨');

      // 서버에 업데이트
      const existingLikeList = await pb
        .collection('likeList')
        .getFullList({ filter: `owner="${userId}"` });
      console.log('existingLikeList in syncLikeLocalToOriginAndServer', existingLikeList);
      if (existingLikeList.length > 0) {
        await pb.collection('likeList').update(existingLikeList.id, {
          owner: userId,
          costumeCard: updatedLikeList,
        });
        console.log('updatedLikeList in syncLikeLocalToOriginAndServer', updatedLikeList);
      } else {
        await pb.collection('likeList').create({
          owner: userId,
          costumeCard: updatedLikeList,
        });
      }

      resetLikeLists(); // 상태 초기화 (likeLocal, likeOrigin)
      console.log('likeList successfully synced and reset.');
    } catch (error) {
      console.error('Failed to sync likeList to server:', error);
    }
  }, [userId, likeLocal]); // 의존성 배열에 필요한 값을 추가

  return { fetchLikeListFromServer, syncLikeLocalToOriginAndServer };
};
