import pb from '@/api/pocketbase';
import useLikeStore from '@/stores/likeStore';

export const useLikeSync = (userId) => {
  const { likeLocal, initLikeOrigin, resetLikeLists } = useLikeStore();

  // 로그인 시 서버에서 likeList를 가져옴
  const fetchLikeListFromServer = async () => {
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
  };

  // 로그아웃 시 like-local을 like-origin에 업데이트하고, 서버에 저장
  const syncLikeLocalToOriginAndServer = async () => {
    console.log('syncLikeLocalToOriginAndServer가 실행됨');
    if (!userId) return;
    try {
      // like-local을 like-origin에 덮어쓰기
      const updatedLikeList = [...new Set(likeLocal)]; // 중복 제거 후 처리

      // 서버에 업데이트
      const existingLikeList = await pb
        .collection('likeList')
        .getFirstListItem(`owner="${userId}"`);
      console.log('existingLikeList in syncLike어쩌구', existingLikeList);
      if (existingLikeList) {
        await pb.collection('likeList').update(existingLikeList.id, {
          owner: userId,
          costumeCard: updatedLikeList,
        });
        console.log('updatedLikeList in syncLike어쩌구', updatedLikeList);
      } else {
        await pb.collection('likeList').create({
          owner: userId,
          costumeCard: updatedLikeList,
        });
      }

      initLikeOrigin(updatedLikeList); // 업데이트된 likeLocal을 likeOrigin으로 저장
      resetLikeLists(); // 상태 초기화 (likeLocal, likeOrigin)
      console.log('likeList successfully synced and reset.');
    } catch (error) {
      console.error('Failed to sync likeList to server:', error);
    }
  };

  return { fetchLikeListFromServer, syncLikeLocalToOriginAndServer };
};
