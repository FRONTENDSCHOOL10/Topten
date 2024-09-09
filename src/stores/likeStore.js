import create from 'zustand';

// Zustand 스토어 생성
export const useLikeStore = create((set) => ({
  likeList: [], // 좋아요된 costumeCard의 ID 목록
  addLike: (id) => set((state) => ({ likeList: [...state.likeList, id] })), // 좋아요 추가
  removeLike: (id) =>
    set((state) => ({
      likeList: state.likeList.filter((likeId) => likeId !== id), // 좋아요 제거
    })),
  setLikeList: (likeList) => set({ likeList }), // 초기 좋아요 리스트 설정
}));
