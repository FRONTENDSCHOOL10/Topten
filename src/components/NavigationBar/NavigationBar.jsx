import { NavLink, useLocation } from 'react-router-dom';
import S from './NavigationBar.module.scss';

const NavigationBar = () => {
  const location = useLocation(); // 현재 경로를 가져옴

  return (
    <nav className={S.navBar}>
      <NavLink to="/calendar" className={S.navItem}>
        <img
          src={
            location.pathname === '/calendar'
              ? '/image/dock-icon-calendar-active.png' // 노란색 아이콘
              : '/image/dock-icon-calendar.png' // 기본 아이콘
          }
          alt="Calendar"
          className={S.icon}
        />
        <span>캘린더</span>
      </NavLink>

      <NavLink to="/lookbook" className={S.navItem}>
        <img
          src={
            location.pathname === '/lookbook'
              ? '/image/dock-icon-lookbook-active.png' // 노란색 아이콘
              : '/image/dock-icon-lookbook.png' // 기본 아이콘
          }
          alt="Lookbook"
          className={S.icon}
        />
        <span>룩북</span>
      </NavLink>

      <NavLink to="/main" className={S.navItem}>
        <img
          src={
            location.pathname === '/main'
              ? '/image/dock-icon-home-active.png' // 노란색 아이콘
              : '/image/dock-icon-home.png' // 기본 아이콘
          }
          alt="Home"
          className={S.icon}
        />
        <span>홈</span>
      </NavLink>

      <NavLink to="/liked" className={S.navItem}>
        <img
          src={
            location.pathname === '/liked'
              ? '/image/dock-icon-like-active.png' // 노란색 아이콘
              : '/image/dock-icon-like.png' // 기본 아이콘
          }
          alt="Liked"
          className={S.icon}
        />
        <span>좋아요</span>
      </NavLink>

      <NavLink to="/myinfo" className={S.navItem}>
        <img
          src={
            location.pathname === '/myinfo'
              ? '/image/dock-icon-mypage-active.png' // 노란색 아이콘
              : '/image/dock-icon-mypage.png' // 기본 아이콘
          }
          alt="My Info"
          className={S.icon}
        />
        <span>마이</span>
      </NavLink>
    </nav>
  );
};

export default NavigationBar;
