import { create } from 'zustand';
import getPbImageURL from '@/api/getPbImageURL';
import userLoginImg from '/image/user-login.png';

const useUserStore = create((set) => ({
  user: null, // 유저 정보를 저장할 상태
  profileImageUrl: userLoginImg,
  isLoggedIn: false,

  initUser: async () => {
    const pb_auth = sessionStorage.getItem('pb_auth') || localStorage.getItem('pb_auth');
    if (pb_auth) {
      const parsedAuth = JSON.parse(pb_auth);
      set({
        user: parsedAuth.token, // 모든 사용자 정보 저장
        isLoggedIn: true,
        profileImageUrl: parsedAuth.token.userPhoto
          ? getPbImageURL(parsedAuth.token, 'userPhoto')
          : userLoginImg,
      });
    } else {
      set({
        user: null,
        isLoggedIn: false,
        profileImageUrl: userLoginImg,
      });
    }
  },

  logout: () => {
    sessionStorage.removeItem('pb_auth');
    localStorage.removeItem('pb_auth');
    set({
      user: null,
      isLoggedIn: false,
      profileImageUrl: userLoginImg,
    });
  },

  updateProfileImage: async (newImageURL) => {
    set((state) => ({
      ...state,
      profileImageUrl: newImageURL || userLoginImg,
    }));
  },
}));

export default useUserStore;
