import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useLikeSync } from '@/hooks/useLikeSync'; // useLikeSync 커스텀 훅 가져오기
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import Header from '@/components/Header/Header';
import useLikeStore from '@/stores/likeStore'; // Zustand로 상태 관리

const RootLayout = ({ user }) => {
  const location = useLocation();
  const { likeList } = useLikeStore(); // Zustand로부터 likeList 가져오기

  // 경로가 IntroPage일 경우를 확인하는 bool
  const hideHeaderAndNav = location.pathname === '/';

  // useLikeSync 훅 호출 (페이지 이동 시 동기화 트리거)
  const { syncLikesToServer } = useLikeSync(user?.id, likeList);

  // 페이지 이동 감지하여 동기화 실행
  useEffect(() => {
    if (user?.id) {
      syncLikesToServer();
    }
  }, [location, user, syncLikesToServer]); // 페이지 이동, 사용자 정보, 상태 변화 시 동기화

  return (
    <>
      {/* 헤더와 네비게이션바는 IntroPage에 있을 때 숨김 */}
      {!hideHeaderAndNav && <Header />}
      <main style={{ paddingBottom: hideHeaderAndNav ? '0' : '60px' }}>
        <Outlet />
      </main>
      {!hideHeaderAndNav && <NavigationBar />}
    </>
  );
};

export default RootLayout;
