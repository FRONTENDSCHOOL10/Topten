import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import NavigationBar from '@/components/NavigationBar';

const RootLayout = () => {
  const location = useLocation();

  // IntroPage일 경우 헤더와 네비게이션 바를 숨기기
  const hideHeaderAndNav = location.pathname === '/';

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
