import { Outlet, useLocation } from 'react-router-dom';
// import Header from '@/components/Header/Header';
import NavigationBar from '@/components/NavigationBar/NavigationBar';

const RootLayout = () => {
  const location = useLocation();

  // 경로가 IntroPage일 경우를 확인하는 bool
  const hideHeaderAndNav = location.pathname === '/';

  return (
    <>
      {/* 헤더와 네비게이션바는 IntroPage에 있을 때 숨김 */}
      {/* {!hideHeaderAndNav && <Header />} */}
      <main style={{ paddingBottom: hideHeaderAndNav ? '0' : '60px' }}>
        <Outlet />
      </main>
      {/* {!hideHeaderAndNav && <NavigationBar />} */}
      {/* {hideHeaderAndNav && <NavigationBar />} */}
      <NavigationBar />
    </>
  );
};

export default RootLayout;
