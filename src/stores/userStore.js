import { create } from 'zustand';
import getPbImageURL from '@/api/getPbImageURL';
import userLoginImg from '/image/user-login.png';
import { getUserData } from '@/api/getData';
import pb from '@/api/pocketbase';

const useUserStore = create((set) => ({
  user: null,
  profileImageUrl: userLoginImg,
  isLoggedIn: false,

  initUser: async () => {
    const pb_auth = sessionStorage.getItem('pb_auth') || localStorage.getItem('pb_auth');
    if (pb_auth) {
      const parsedAuth = JSON.parse(pb_auth);
      const profileImageUrl = parsedAuth.record.userPhoto
        ? `${getPbImageURL(parsedAuth.record, 'userPhoto')}?v=${new Date().getTime()}` // 캐시 무효화를 위한 쿼리 파라미터 추가
        : userLoginImg;
      set({
        user: parsedAuth.record, // authData.record 사용
        isLoggedIn: true,
        profileImageUrl,
      });
    } else {
      set({
        user: null,
        isLoggedIn: false,
        profileImageUrl: userLoginImg,
      });
    }
  },

  setUserAuth: async (authData) => {
    console.log('setUserAuth called with:', authData); // 디버깅용 로그
    sessionStorage.setItem('pb_auth', JSON.stringify(authData));
    localStorage.setItem('pb_auth', JSON.stringify(authData));

    const profileImageUrl = authData.record.userPhoto
      ? `${getPbImageURL(authData.record, 'userPhoto')}?v=${new Date().getTime()}` // 캐시 무효화를 위한 쿼리 파라미터 추가
      : userLoginImg;

    set({
      user: authData.record, // authData.record 사용
      isLoggedIn: true,
      profileImageUrl,
    });

    // 비동기 작업은 여기서 분리하여 상태 업데이트가 즉시 이루어지도록 함
    await getUserData(authData.record.id).catch((error) => {
      console.error('getUserData 실패:', error);
    });
  },

  login: async (email, password) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);

      console.log('Login successful:', authData);
      localStorage.setItem('pb_auth', JSON.stringify(authData));
      sessionStorage.setItem('pb_auth', JSON.stringify(authData));
      console.log(pb.authStore.expiration);

      // Determine profile image URL
      const profileImageUrl = authData.record.userPhoto
        ? `${getPbImageURL(authData.record, 'userPhoto')}?v=${new Date().getTime()}` // Cache busting
        : userLoginImg;

      // Update the store's state
      set({
        user: authData.record,
        isLoggedIn: true,
        profileImageUrl,
      });

      // Fetch additional user data if necessary
      await getUserData(authData.record.id).catch((error) => {
        console.error('getUserData failed:', error);
      });

      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message || 'Authentication failed.' };
    }
  },

  logout: () => {
    sessionStorage.removeItem('pb_auth');
    localStorage.removeItem('pb_auth');
    localStorage.removeItem('bookMarks');
    localStorage.removeItem('bookmarkItem');

    set({
      user: null,
      isLoggedIn: false,
      profileImageUrl: userLoginImg,
    });
  },

  updateProfileImage: (newImageURL) => {
    set({
      profileImageUrl: newImageURL || userLoginImg,
    });
  },
}));

export default useUserStore;
