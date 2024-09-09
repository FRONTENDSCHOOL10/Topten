// 좋아요리스트 상태를 관리하고, 좋아요 토글 기능만을 담당하는 Zustand 상태
import create from 'zustand';
import { persist } from 'zustand/middleware';

const useLikeStore = create(
  persist(
    (set) => ({
      likeList: [],
      toggleLike: (id) =>
        set((state) => ({
          likeList: state.likeList.includes(id)
            ? state.likeList.filter((likeId) => likeId !== id) // 좋아요 해제
            : [...state.likeList, id], // 좋아요 추가
        })),
      setLikeList: (likeList) => set({ likeList }), // 서버에서 불러온 좋아요 리스트 설정
    }),
    {
      name: 'like-storage', // localStorage 키 이름
      getStorage: () => localStorage, // 상태를 localStorage에 저장
    }
  )
);

export default useLikeStore;
