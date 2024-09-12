import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import { Header, NavigationBar, ToTopButton, Loader } from '@/components';
import useLikeStore from '@/stores/likeStore'; // Zustand로 상태 관리

const RootLayout = ({ user }) => {
  const location = useLocation();
  const { state } = useNavigation(); // '로딩중 표시'를 위한, 페이지 이동 상태 가져오기

  // 경로가 IntroPage일 경우를 확인하는 bool
  const hideHeaderAndNav = location.pathname === '/';

  return (
    <>
      {/* 헤더와 네비게이션바는 IntroPage에 있을 때 숨김 */}
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
