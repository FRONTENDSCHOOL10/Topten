import { useEffect } from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import { useLikeSync } from '@/hooks/useLikeSync'; // useLikeSync 커스텀 훅 가져오기
import { Header, NavigationBar, ToTopButton, Loader } from '@/components';
import useLikeStore from '@/stores/likeStore'; // Zustand로 상태 관리

const RootLayout = ({ user }) => {
  const location = useLocation();
  const { likeList } = useLikeStore(); // Zustand로부터 likeList 가져오기
  const { state } = useNavigation(); // '로딩중 표시'를 위한, 페이지 이동 상태 가져오기

  // 경로가 IntroPage일 경우를 확인하는 bool
  const hideHeaderAndNav = location.pathname === '/';

  // useLikeSync 훅 호출 (페이지 이동 시 좋아요리스트 동기화 트리거)
  const { syncLikesToServer } = useLikeSync(user?.token?.id, likeList);

  // 페이지 이동 감지하여 동기화 실행 (여기서만 동기화)
  useEffect(() => {
    if (user?.token?.id) {
      syncLikesToServer(); // 유저 아이디와 좋아요 리스트 동기화
    }
  }, [location, user, syncLikesToServer]); // 페이지 이동, 사용자 정보 변화 시 동기화

  return (
    <>
      {!hideHeaderAndNav && <Header />}
      <main>
        {state === 'loading' ? (
          <div>
            <Loader />
            <p>페이지를 로딩 중입니다.</p>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <ToTopButton />
      {!hideHeaderAndNav && <NavigationBar />}
    </>
  );
};

export default RootLayout;
