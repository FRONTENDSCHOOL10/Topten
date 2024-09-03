import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <>
      <nav>예시 nav</nav>
      <Outlet />
      <footer>푸터 예시</footer>
    </>
  );
}

export default RootLayout;
