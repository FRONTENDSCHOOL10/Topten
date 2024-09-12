import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useLikeStore = create(
  persist(
    (set) => ({
      likeOrigin: [], // 초기값을 빈 배열로 설정
      likeLocal: [],

      // likeOrigin 초기화
      initLikeOrigin: (originList) =>
        set({
          likeOrigin: Array.isArray(originList) ? [...new Set(originList)] : [],
        }), // 중복 제거 후 초기화

      // likeLocal 초기화 (likeOrigin을 복사하여 초기화)
      initLikeLocal: () =>
        set((state) => ({
          likeLocal: [...new Set(state.likeOrigin)], // 중복을 제거한 상태로 초기화
        })),

      // 좋아요 토글 (likeLocal을 관리)
      toggleLikeLocal: (id) =>
        set((state) => ({
          likeLocal: state.likeLocal.includes(id)
            ? state.likeLocal.filter((likeId) => likeId !== id) // 이미 있으면 삭제
            : [...state.likeLocal, id], // 없으면 추가 (중복 없이)
        })),

      // likeOrigin을 업데이트할 때 중복 없이 관리
      updateLikeOrigin: (newOrigin) =>
        set({
          likeOrigin: [...new Set(newOrigin)], // 중복 제거 후 업데이트
        }),

      // likeOrigin과 likeLocal을 모두 초기화
      resetLikeLists: () => set({ likeLocal: [], likeOrigin: [] }),
    }),
    {
      name: 'like-storage', // localStorage에 저장할 키 이름
      storage: createJSONStorage(() => localStorage), // 상태를 localStorage에 저장
    }
  )
);

export default useLikeStore;
