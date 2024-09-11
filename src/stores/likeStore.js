// likeStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
      resetLikeList: () => set({ likeList: [] }), // 좋아요 리스트 초기화 메서드
    }),
    {
      name: 'like-storage', // localStorage 키 이름
      storage: createJSONStorage(() => localStorage), // 상태를 localStorage에 저장
    }
  )
);

export default useLikeStore;
